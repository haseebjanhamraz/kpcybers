import { NextResponse } from "next/server";
import pool from "@/lib/pg";
// GET service plans by service id
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const client = await pool.connect();
        const { id } = await params;
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
            WHERE s.id = $1
            ORDER BY s.created_at DESC
        `, [id]);

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