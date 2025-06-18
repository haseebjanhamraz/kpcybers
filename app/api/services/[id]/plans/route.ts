import db from '@/lib/db';
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

    try {
        // Get plans with their associated features
        const plans = db.prepare(`
            SELECT * FROM service_plans 
            WHERE service_id = ? 
            ORDER BY plan_price ASC
        `).all(id);

        if (plans.length === 0) {
            return NextResponse.json(
                { error: 'No plans found for this service' },
                { status: 404 }
            );
        }

        // Get features for each plan
        const getPlanFeatures = db.prepare(`
            SELECT f.feature_name
            FROM service_plan_features spf
            JOIN features f ON f.id = spf.feature_id
            WHERE spf.service_plan_id = ?
        `);

        const plansWithFeatures = plans.map((plan: any) => {
            const features = getPlanFeatures.all(plan.id).map((f: any) => f.feature_name);
            return {
                ...plan,
                features
            };
        });

        return NextResponse.json(plansWithFeatures);
    } catch (error) {
        console.error('Error fetching service plans:', error);
        return NextResponse.json(
            { error: 'Failed to fetch service plans' },
            { status: 500 }
        );
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

    try {
        const transaction = db.transaction(() => {
            // 1. Check if service exists
            const serviceExists = db.prepare(`
                SELECT 1 FROM services WHERE id = ?
            `).get(id);
            
            if (!serviceExists) {
                throw new Error('Service not found');
            }

            // 2. Insert plan
            const insertPlan = db.prepare(`
                INSERT INTO service_plans 
                (service_id, plan_name, plan_description, plan_price) 
                VALUES (?, ?, ?, ?)
            `);
            const planResult = insertPlan.run(id, name, description, price);
            const planId = planResult.lastInsertRowid;

            // 3. Insert plan features
            const insertPlanFeature = db.prepare(`
                INSERT INTO service_plan_features 
                (service_plan_id, feature_id) 
                VALUES (?, ?)
            `);

            for (const featureId of features) {
                // Validate feature exists and belongs to this service
                const featureValid = db.prepare(`
                    SELECT 1 FROM features 
                    WHERE id = ? AND service_id = ?
                `).get(featureId, id);

                if (!featureValid) {
                    throw new Error(`Feature with ID ${featureId} not found or doesn't belong to this service`);
                }

                insertPlanFeature.run(planId, featureId);
            }

            return planId;
        });

        const planId = transaction();

        // Get the full plan with features to return
        const fullPlan = db.prepare(`
            SELECT * FROM service_plans WHERE id = ?
        `).get(planId);

        const planFeatures = db.prepare(`
            SELECT feature_id FROM service_plan_features
            WHERE service_plan_id = ?
        `).all(planId).map((row: any) => row.feature_id);

        return NextResponse.json(
            {
                ...fullPlan,
                features: planFeatures
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating service plan:', error);

        if (error instanceof Error) {
            if (error.message === 'Service not found') {
                return NextResponse.json(
                    { error: 'Service not found' },
                    { status: 404 }
                );
            }
            if (error.message.includes('Feature with ID')) {
                return NextResponse.json(
                    { error: error.message },
                    { status: 400 }
                );
            }
            if (error.message.includes('UNIQUE constraint')) {
                return NextResponse.json(
                    { error: 'A plan with this name already exists for this service' },
                    { status: 409 }
                );
            }
        }

        return NextResponse.json(
            { error: 'Failed to create service plan' },
            { status: 500 }
        );
    }
}