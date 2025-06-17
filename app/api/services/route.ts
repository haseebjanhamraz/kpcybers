import pool from '@/lib/pg';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Helper interface for TypeScript
interface ServiceData {
    name: string;
    description: string;
    price: number;
    features?: Array<{
        name: string;
    }>;
    plans?: Array<{
        name: string;
        description: string;
        price: number;
        features?: number[]; // Array of feature indices
    }>;
}

// GET all services with their features and plans
export async function GET(request: Request) {
    try {
        const client = await pool.connect();

        const result = await client.query(`
            WITH service_features AS (
                SELECT 
                    service_id,
                    json_agg(json_build_object(
                        'id', id,
                        'name', feature_name,
                        'created_at', created_at,
                        'updated_at', updated_at
                    )) as features
                FROM features
                GROUP BY service_id
            ),
            service_plans AS (
                SELECT 
                    sp.service_id,
                    json_agg(json_build_object(
                        'id', sp.id,
                        'name', sp.plan_name,
                        'description', sp.plan_description,
                        'price', sp.plan_price,
                        'features', (
                            SELECT json_agg(f.feature_name)
                            FROM service_plan_features spf
                            JOIN features f ON f.id = spf.feature_id
                            WHERE spf.service_plan_id = sp.id
                            GROUP BY spf.service_plan_id
                        ),
                        'created_at', sp.created_at,
                        'updated_at', sp.updated_at
                    )) as plans
                FROM service_plans sp
                GROUP BY sp.service_id
            )
            SELECT 
                s.*,
                COALESCE(sf.features, '[]'::json) as features,
                COALESCE(sp.plans, '[]'::json) as plans
            FROM services s
            LEFT JOIN service_features sf ON sf.service_id = s.id
            LEFT JOIN service_plans sp ON sp.service_id = s.id
            ORDER BY s.created_at DESC
        `);

        client.release();

        return NextResponse.json(result.rows, { status: 200 });
    } catch (error) {
        console.error('Error fetching services:', error);
        return NextResponse.json(
            { error: 'Failed to fetch services' },
            { status: 500 }
        );
    }
}

// POST - Create a new service with features and plans
export async function POST(request: Request) {
    const { name, description, price, features = [], plans = [] }: ServiceData = await request.json();

    if (!name || !description || price === undefined) {
        return NextResponse.json(
            { error: 'Name, description, and price are required' },
            { status: 400 }
        );
    }

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // 1. Insert Service
        const serviceResult = await client.query(
            `INSERT INTO services (name, description, price)
             VALUES ($1, $2, $3)
             RETURNING id`,
            [name, description, price]
        );
        const serviceId = serviceResult.rows[0].id;

        // 2. Insert Features
        const featureIds: number[] = [];
        for (const feature of features) {
            // Check for duplicate feature names
            const exists = await client.query(
                `SELECT 1 FROM features 
                 WHERE service_id = $1 AND feature_name = $2`,
                [serviceId, feature.name]
            );

            if (exists.rows.length > 0) {
                await client.query('ROLLBACK');
                return NextResponse.json(
                    { error: `Feature '${feature.name}' already exists for this service` },
                    { status: 409 }
                );
            }

            const featureResult = await client.query(
                `INSERT INTO features (service_id, feature_name)
                 VALUES ($1, $2)
                 RETURNING id`,
                [serviceId, feature.name]
            );
            featureIds.push(featureResult.rows[0].id);
        }

        // 3. Insert Plans and their features
        const planIds: number[] = [];
        for (const plan of plans) {
            // Check for duplicate plan names
            const exists = await client.query(
                `SELECT 1 FROM service_plans 
                 WHERE service_id = $1 AND plan_name = $2`,
                [serviceId, plan.name]
            );

            if (exists.rows.length > 0) {
                await client.query('ROLLBACK');
                return NextResponse.json(
                    { error: `Plan '${plan.name}' already exists for this service` },
                    { status: 409 }
                );
            }

            const planResult = await client.query(
                `INSERT INTO service_plans (service_id, plan_name, plan_description, plan_price)
                 VALUES ($1, $2, $3, $4)
                 RETURNING id`,
                [serviceId, plan.name, plan.description, plan.price]
            );
            const planId = planResult.rows[0].id;
            planIds.push(planId);

            // Associate features with this plan
            if (plan.features && plan.features.length > 0) {
                for (const featureIndex of plan.features) {
                    if (featureIndex >= 0 && featureIndex < featureIds.length) {
                        await client.query(
                            `INSERT INTO service_plan_features (service_plan_id, feature_id)
                             VALUES ($1, $2)`,
                            [planId, featureIds[featureIndex]]
                        );
                    }
                }
            }
        }

        await client.query('COMMIT');

        // Return the complete service data
        const newService = await client.query(
            `SELECT * FROM services WHERE id = $1`,
            [serviceId]
        );

        return NextResponse.json(
            {
                message: 'Service created successfully',
                service: newService.rows[0],
                featureIds,
                planIds
            },
            { status: 201 }
        );
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error creating service:', error);
        return NextResponse.json(
            { error: 'Failed to create service' },
            { status: 500 }
        );
    } finally {
        client.release();
    }
}

// PUT - Update a service and its relationships
export async function PUT(request: Request) {
    const { id, name, description, price, features = [], plans = [] }: ServiceData & { id: number } = await request.json();

    if (!id || !name || !description || price === undefined) {
        return NextResponse.json(
            { error: 'ID, name, description, and price are required' },
            { status: 400 }
        );
    }

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // 1. Verify service exists
        const serviceExists = await client.query(
            `SELECT 1 FROM services WHERE id = $1`,
            [id]
        );
        if (serviceExists.rows.length === 0) {
            await client.query('ROLLBACK');
            return NextResponse.json(
                { error: 'Service not found' },
                { status: 404 }
            );
        }

        // 2. Update Service
        await client.query(
            `UPDATE services 
             SET name = $1, description = $2, price = $3
             WHERE id = $4`,
            [name, description, price, id]
        );

        // 3. Handle Features
        const currentFeatures = await client.query(
            `SELECT id, feature_name FROM features WHERE service_id = $1`,
            [id]
        );

        // Process feature updates (simplified - in production you might want more sophisticated diffing)
        const featureUpdates = [];
        for (const feature of features) {
            if ('id' in feature) {
                // Update existing feature
                await client.query(
                    `UPDATE features 
                     SET feature_name = $1
                     WHERE id = $2 AND service_id = $3`,
                    [feature.name, feature.id, id]
                );
            } else {
                // Add new feature
                const newFeature = await client.query(
                    `INSERT INTO features (service_id, feature_name)
                     VALUES ($1, $2)
                     RETURNING id`,
                    [id, feature.name]
                );
                featureUpdates.push(newFeature.rows[0].id);
            }
        }

        // 4. Handle Plans (similar approach as features)
        // ... implementation would follow similar pattern ...

        await client.query('COMMIT');
        return NextResponse.json(
            { message: 'Service updated successfully' },
            { status: 200 }
        );
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error updating service:', error);
        return NextResponse.json(
            { error: 'Failed to update service' },
            { status: 500 }
        );
    } finally {
        client.release();
    }
}

// DELETE - Remove a service and its dependencies
export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json(
            { error: 'ID parameter is required' },
            { status: 400 }
        );
    }

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // 1. Verify service exists
        const serviceExists = await client.query(
            `SELECT 1 FROM services WHERE id = $1`,
            [id]
        );
        if (serviceExists.rows.length === 0) {
            await client.query('ROLLBACK');
            return NextResponse.json(
                { error: 'Service not found' },
                { status: 404 }
            );
        }

        // 2. Delete in proper order to respect foreign keys
        await client.query(
            `DELETE FROM service_plan_features 
             WHERE service_plan_id IN (
                 SELECT id FROM service_plans WHERE service_id = $1
             )`,
            [id]
        );

        await client.query(
            `DELETE FROM service_plan_features 
             WHERE feature_id IN (
                 SELECT id FROM features WHERE service_id = $1
             )`,
            [id]
        );

        await client.query(
            `DELETE FROM service_plans WHERE service_id = $1`,
            [id]
        );

        await client.query(
            `DELETE FROM features WHERE service_id = $1`,
            [id]
        );

        await client.query(
            `DELETE FROM services WHERE id = $1`,
            [id]
        );

        await client.query('COMMIT');
        return NextResponse.json(
            { message: 'Service and all related data deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error deleting service:', error);
        return NextResponse.json(
            { error: 'Failed to delete service' },
            { status: 500 }
        );
    } finally {
        client.release();
    }
}