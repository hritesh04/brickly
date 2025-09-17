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
      const project = await conn.query(
        `
        SELECT p.*,
COALESCE(
	json_agg(r), '[]'
) as resources
FROM "Project" p
LEFT JOIN "Resource" r 
  ON p.id = r."projectID"
WHERE p.id=$1 AND p."userID"=$2
GROUP BY p.id,p.name,p.icon,p.width,p.height,p.property,p."userID";
        `,
        [projectID, userID]
      );
      if (project.rows.length === 0) throw new Error("Project Not Found");

      const nodes = await conn.query(
        `
        WITH RECURSIVE node_hierarchy AS (
      SELECT 
        n.id,
        n.name,
        n.type,
        n.property,
        n."parentID",
        n."projectID"
      FROM "Node" n
      WHERE n."projectID" = $1 AND n."parentID" IS NULL
      
      UNION ALL
      
      SELECT 
        n.id,
        n.name,
        n.type,
        n.property,
        n."parentID",
        n."projectID"
      FROM "Node" n
      INNER JOIN node_hierarchy nh ON n."parentID" = nh.id
    )
    SELECT 
      nh.id,
      nh.name,
      nh.type,
      nh.property,
      nh."parentID",
      nh."projectID",
      COALESCE(
        json_agg(
          json_build_object(
            'id', r.id,
            'name', r.name,
            'type', r.type,
            'assetType', r."assetType",
            'path', r.path,
            'property', r.property
          )
        ) FILTER (WHERE r.id IS NOT NULL), '[]'::json
      ) as resource
    FROM node_hierarchy nh
    LEFT JOIN "Resource" r ON r."parentID" = nh.id
    GROUP BY nh.id, nh.name, nh.type, nh.property, nh."parentID", nh."projectID";
        `,
        [projectID]
      );
      const scenes = buildTree(nodes.rows);
      const out = { ...project.rows[0], scenes };
      return out;
    } catch (error: any) {
      console.error("Failed to fetch project deatils of a user");
      return null;
    }
  }
}

function buildTree(nodes: any[]) {
  const map = new Map<number, any>();
  const rootNodes: any[] = [];

  nodes.forEach((node) => {
    map.set(node.id, node);
  });

  nodes.forEach((node) => {
    if (node.parentID) {
      const parent = map.get(node.parentID);
      if (parent) {
        if (!parent.children) parent.children = [];
        parent.children.push(node);
      }
    }
    if (node.projectID) {
      rootNodes.push(node);
    }
  });
  return rootNodes;
}
