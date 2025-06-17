import pool from '@/app/utils/pg';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// GET all plans for a specific service
export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    // Validate service ID
    if (!id || isNaN(Number(id))) {
        return NextResponse.json(
            { error: 'Invalid service ID' },
            { status: 400 }
        );
    }

    const client = await pool.connect();
    try {
        // Get plans with their associated features
        const result = await client.query(`
            SELECT 
                sp.*,
                (
                    SELECT json_agg(f.feature_name)
                    FROM service_plan_features spf
                    JOIN features f ON f.id = spf.feature_id
                    WHERE spf.service_plan_id = sp.id
                ) AS features
            FROM service_plans sp
            WHERE service_id = $1
            ORDER BY sp.plan_price ASC
        `, [id]);

        if (result.rows.length === 0) {
            return NextResponse.json(
                { error: 'No plans found for this service' },
                { status: 404 }
            );
        }
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Error fetching service plans:', error);
        return NextResponse.json(
            { error: 'Failed to fetch service plans' },
            { status: 500 }
        );
    } finally {
        client.release();
    }
}

// Create a new plan for a specific service
export async function POST(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const { name, description, price, features } = await request.json();

    // Validate inputs
    if (!id || isNaN(Number(id))) {
        return NextResponse.json(
            { error: 'Invalid service ID' },
            { status: 400 }
        );
    }

    if (!name || !description || price === undefined || !Array.isArray(features)) {
        return NextResponse.json(
            { error: 'Missing required fields (name, description, price, features)' },
            { status: 400 }
        );
    }

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // 1. Check if service exists
        const serviceExists = await client.query(
            'SELECT 1 FROM services WHERE id = $1',
            [id]
        );
        if (serviceExists.rows.length === 0) {
            await client.query('ROLLBACK');
            return NextResponse.json(
                { error: 'Service not found' },
                { status: 404 }
            );
        }

        // 2. Insert plan
        const planResult = await client.query(
            `INSERT INTO service_plans 
             (service_id, plan_name, plan_description, plan_price) 
             VALUES ($1, $2, $3, $4) 
             RETURNING *`,
            [id, name, description, price]
        );
        const planId = planResult.rows[0].id;

        // 3. Insert plan features
        for (const featureId of features) {
            // Validate feature exists and belongs to this service
            const featureValid = await client.query(
                `SELECT 1 FROM features 
                 WHERE id = $1 AND service_id = $2`,
                [featureId, id]
            );

            if (featureValid.rows.length === 0) {
                await client.query('ROLLBACK');
                return NextResponse.json(
                    { error: `Feature with ID ${featureId} not found or doesn't belong to this service` },
                    { status: 400 }
                );
            }

            await client.query(
                `INSERT INTO service_plan_features 
                 (service_plan_id, feature_id) 
                 VALUES ($1, $2)`,
                [planId, featureId]
            );
        }

        await client.query('COMMIT');

        // Get the full plan with features to return
        const fullPlan = await client.query(
            `SELECT 
                sp.*,
                (
                    SELECT json_agg(feature_id)
                    FROM service_plan_features
                    WHERE service_plan_id = sp.id
                ) AS features
             FROM service_plans sp
             WHERE sp.id = $1`,
            [planId]
        );

        return NextResponse.json(
            fullPlan.rows[0],
            { status: 201 }
        );
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error creating service plan:', error);

        // Handle unique constraint violation
        if (error instanceof Error && error.message.includes('unique constraint')) {
            return NextResponse.json(
                { error: 'A plan with this name already exists for this service' },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to create service plan' },
            { status: 500 }
        );
    } finally {
        client.release();
    }
}