import { NextResponse } from "next/server";
import db from "@/lib/db";

export const dynamic = 'force-dynamic';

// GET service plans by service id
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        // Validate service ID
        if (!id || isNaN(Number(id))) {
            return NextResponse.json(
                { error: 'Invalid service ID' },
                { status: 400 }
            );
        }

        // Get service
        const service = db.prepare(`
            SELECT * FROM services WHERE id = ?
        `).get(id);

        if (!service) {
            return NextResponse.json(
                { error: 'Service not found' },
                { status: 404 }
            );
        }

        // Get features for the service
        const features = db.prepare(`
            SELECT id, feature_name as name, created_at, updated_at
            FROM features 
            WHERE service_id = ?
        `).all(id);

        // Get plans for the service
        const plans = db.prepare(`
            SELECT id, plan_name as name, plan_description as description, 
                   plan_price as price, created_at, updated_at
            FROM service_plans 
            WHERE service_id = ?
        `).all(id);

        // Get plan features for each plan
        const getPlanFeatures = db.prepare(`
            SELECT f.feature_name
            FROM service_plan_features spf
            JOIN features f ON f.id = spf.feature_id
            WHERE spf.service_plan_id = ?
        `);

        const plansWithFeatures = plans.map((plan: any) => {
            const planFeatures = getPlanFeatures.all(plan.id).map((f: any) => f.feature_name);
            return {
                ...plan,
                features: planFeatures
            };
        });

        const result = {
            ...service,
            features,
            plans: plansWithFeatures
        };

        return NextResponse.json([result], { status: 200 });
    } catch (error) {
        console.error('Error fetching service:', error);
        return NextResponse.json(
            { error: 'Failed to fetch service' },
            { status: 500 }
        );
    }
}