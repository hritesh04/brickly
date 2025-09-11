import { Client } from "pg";

export class DB {
  private static db: DB;
  private client: Client | null = null;
  private constructor() {}
  static getInstance() {
    if (!this.db) this.db = new DB();
    return this.db;
  }
  private async getConnection() {
    if (this.client) return this.client;
    try {
      this.client = new Client(process.env.DATABASE_URL || "");
      await this.client.connect();
      console.log("Connected to DB");
      return this.client;
    } catch (error: any) {
      console.error("Failed to connect to DB : ", error);
      throw new Error(error);
    }
  }
  async userProject(projectID: number, userID: number): Promise<any | null> {
    try {
      const conn = await this.getConnection();
      const res = await conn.query(
        `
        SELECT p.*,
        COALESCE(nodes.children, '[]'::json) as scenes,
        COALESCE(resources.resource, '[]'::json) as resources
        FROM public."Project" p LEFT JOIN (
            WITH RECURSIVE node_hierarchy AS (
                SELECT n.id, n.name, n.type, n.property, n."parentID", n."projectID"
                FROM "Node" n
                WHERE n."projectID" = $1 AND n."parentID" IS NULL
                
                UNION ALL
        
                SELECT
                n.id, n.name, n.type, n.property, n."parentID", n."projectID" FROM "Node" n INNER JOIN node_hierarchy nh ON n."parentID" = nh.id
        )
        SELECT
            nh."projectID",
            json_agg(
                json_build_object(
                    'id', nh.id,
                    'name', nh.name,
                    'type', nh.type,
                    'property', nh.property,
                    'parentID', nh."parentID",
                    'projectID', nh."projectID",
                    'resources', COALESCE(node_resources.resources, '[]'::json)
                )ORDER BY nh.id
            ) as children FROM node_hierarchy nh
        LEFT JOIN (
            SELECT r."parentID",
            json_agg(
                json_build_object(
                    'id', r.id,
                    'name', r.name,
                    'type', r.type,
                    'assetType', r."assetType",
                    'path', r.path,
                    'property', r.property
                )
                ORDER BY r.id
            ) as resources
        FROM "Resource" r
        WHERE r."parentID" IS NOT NULL
        GROUP BY r."parentID"
    ) node_resources ON node_resources."parentID" = nh.id
    GROUP BY nh."projectID"
) nodes ON nodes."projectID" = p.id
LEFT JOIN (
    -- Get all project resources
    SELECT 
        r."projectID",
        json_agg(
            json_build_object(
                'id', r.id,
                'name', r.name,
                'type', r.type,
                'assetType', r."assetType",
                'path', r.path,
                'property', r.property,
                'parentID', r."parentID"
            )
            ORDER BY r.id
        ) as resource
    FROM "Resource" r
    WHERE r."projectID" = $1
    GROUP BY r."projectID"
) resources ON resources."projectID" = p.id
WHERE p.id = $1 AND p."userID" = $2;
        `,
        [projectID, 1]
      );
      if (res.rows.length === 0) throw new Error("Project Not Found");
      return res.rows[0];
    } catch (error: any) {
      console.error("Failed to fetch project deatils of a user");
      return null;
    }
  }
}
