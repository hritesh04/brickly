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
      ) as resource,
      COALESCE(
        json_agg(
          json_build_object(
            'id', s.id,
            'name', s.name,
            'fromID', s."fromID",
            'toID', s."toID",
            'script', s.script
          )
        ) FILTER (WHERE s.id IS NOT NULL), '[]'::json
      ) as signals,
      COALESCE(
        json_agg(
          json_build_object(
            'id', sc.id,
            'name', sc.name,
            'content', sc.content,
            'actions', COALESCE(
              json_agg(
                json_build_object(
                  'id', a.id,
                  'name', a.name,
                  'type', a.type,
                  'enabled', a.enabled,
                  'order', a.order,
                  'parameters', a.parameters
                )
              ) FILTER (WHERE a.id IS NOT NULL), '[]'::json
            ),
            'triggers', COALESCE(
              json_agg(
                json_build_object(
                  'id', t.id,
                  'name', t.name,
                  'type', t.type,
                  'enabled', t.enabled,
                  'conditions', t.conditions
                )
              ) FILTER (WHERE t.id IS NOT NULL), '[]'::json
            )
          )
        ) FILTER (WHERE sc.id IS NOT NULL), '[]'::json
      ) as scripts
    FROM node_hierarchy nh
    LEFT JOIN "Resource" r ON r."parentID" = nh.id
    LEFT JOIN "Signal" s ON s."fromID" = nh.id OR s."toID" = nh.id
    LEFT JOIN "Script" sc ON sc."nodeID" = nh.id
    LEFT JOIN "Action" a ON a."scriptID" = sc.id
    LEFT JOIN "Trigger" t ON t."scriptID" = sc.id
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
