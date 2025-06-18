import db from '@/lib/db';
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
        // Get all services
        const services = db.prepare(`
            SELECT * FROM services ORDER BY created_at DESC
        `).all();

        // Get features for each service
        const getFeatures = db.prepare(`
            SELECT id, feature_name as name, created_at, updated_at
            FROM features 
            WHERE service_id = ?
        `);

        // Get plans for each service
        const getPlans = db.prepare(`
            SELECT id, plan_name as name, plan_description as description, 
                   plan_price as price, created_at, updated_at
            FROM service_plans 
            WHERE service_id = ?
        `);

        // Get plan features
        const getPlanFeatures = db.prepare(`
            SELECT f.feature_name
            FROM service_plan_features spf
            JOIN features f ON f.id = spf.feature_id
            WHERE spf.service_plan_id = ?
        `);

        const servicesWithData = services.map((service: any) => {
            const features = getFeatures.all(service.id);
            const plans = getPlans.all(service.id).map((plan: any) => {
                const planFeatures = getPlanFeatures.all(plan.id).map((f: any) => f.feature_name);
                return {
                    ...plan,
                    features: planFeatures
                };
            });

            return {
                ...service,
                features,
                plans
            };
        });

        return NextResponse.json(servicesWithData, { status: 200 });
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

    try {
        const transaction = db.transaction(() => {
            // 1. Insert Service
            const insertService = db.prepare(`
                INSERT INTO services (name, description, price)
                VALUES (?, ?, ?)
            `);
            const serviceResult = insertService.run(name, description, price);
            const serviceId = serviceResult.lastInsertRowid;

            // 2. Insert Features
            const featureIds: number[] = [];
            const insertFeature = db.prepare(`
                INSERT INTO features (service_id, feature_name)
                VALUES (?, ?)
            `);
            
            for (const feature of features) {
                // Check for duplicate feature names
                const existingFeature = db.prepare(`
                    SELECT 1 FROM features 
                    WHERE service_id = ? AND feature_name = ?
                `).get(serviceId, feature.name);

                if (existingFeature) {
                    throw new Error(`Feature '${feature.name}' already exists for this service`);
                }

                const featureResult = insertFeature.run(serviceId, feature.name);
                featureIds.push(featureResult.lastInsertRowid as number);
            }

            // 3. Insert Plans and their features
            const planIds: number[] = [];
            const insertPlan = db.prepare(`
                INSERT INTO service_plans (service_id, plan_name, plan_description, plan_price)
                VALUES (?, ?, ?, ?)
            `);
            const insertPlanFeature = db.prepare(`
                INSERT INTO service_plan_features (service_plan_id, feature_id)
                VALUES (?, ?)
            `);

            for (const plan of plans) {
                // Check for duplicate plan names
                const existingPlan = db.prepare(`
                    SELECT 1 FROM service_plans 
                    WHERE service_id = ? AND plan_name = ?
                `).get(serviceId, plan.name);

                if (existingPlan) {
                    throw new Error(`Plan '${plan.name}' already exists for this service`);
                }

                const planResult = insertPlan.run(serviceId, plan.name, plan.description, plan.price);
                const planId = planResult.lastInsertRowid as number;
                planIds.push(planId);

                // Associate features with this plan
                if (plan.features && plan.features.length > 0) {
                    for (const featureIndex of plan.features) {
                        if (featureIndex >= 0 && featureIndex < featureIds.length) {
                            insertPlanFeature.run(planId, featureIds[featureIndex]);
                        }
                    }
                }
            }

            return { serviceId, featureIds, planIds };
        });

        const result = transaction();

        // Return the complete service data
        const newService = db.prepare(`
            SELECT * FROM services WHERE id = ?
        `).get(result.serviceId);

        return NextResponse.json(
            {
                message: 'Service created successfully',
                service: newService,
                featureIds: result.featureIds,
                planIds: result.planIds
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating service:', error);
        
        if (error instanceof Error && error.message.includes('already exists')) {
            return NextResponse.json(
                { error: error.message },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to create service' },
            { status: 500 }
        );
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

    try {
        const transaction = db.transaction(() => {
            // 1. Verify service exists
            const serviceExists = db.prepare(`
                SELECT 1 FROM services WHERE id = ?
            `).get(id);
            
            if (!serviceExists) {
                throw new Error('Service not found');
            }

            // 2. Update Service
            const updateService = db.prepare(`
                UPDATE services 
                SET name = ?, description = ?, price = ?, updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
            `);
            updateService.run(name, description, price, id);

            // 3. Handle Features (simplified approach - you might want more sophisticated handling)
            for (const feature of features) {
                if ('id' in feature) {
                    // Update existing feature
                    const updateFeature = db.prepare(`
                        UPDATE features 
                        SET feature_name = ?, updated_at = CURRENT_TIMESTAMP
                        WHERE id = ? AND service_id = ?
                    `);
                    updateFeature.run(feature.name, (feature as any).id, id);
                } else {
                    // Add new feature
                    const insertFeature = db.prepare(`
                        INSERT INTO features (service_id, feature_name)
                        VALUES (?, ?)
                    `);
                    insertFeature.run(id, feature.name);
                }
            }
        });

        transaction();
        
        return NextResponse.json(
            { message: 'Service updated successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating service:', error);
        
        if (error instanceof Error && error.message === 'Service not found') {
            return NextResponse.json(
                { error: 'Service not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to update service' },
            { status: 500 }
        );
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

    try {
        const transaction = db.transaction(() => {
            // 1. Verify service exists
            const serviceExists = db.prepare(`
                SELECT 1 FROM services WHERE id = ?
            `).get(id);
            
            if (!serviceExists) {
                throw new Error('Service not found');
            }

            // 2. Delete service (cascading deletes will handle related records)
            const deleteService = db.prepare(`
                DELETE FROM services WHERE id = ?
            `);
            deleteService.run(id);
        });

        transaction();
        
        return NextResponse.json(
            { message: 'Service and all related data deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting service:', error);
        
        if (error instanceof Error && error.message === 'Service not found') {
            return NextResponse.json(
                { error: 'Service not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to delete service' },
            { status: 500 }
        );
    }
}