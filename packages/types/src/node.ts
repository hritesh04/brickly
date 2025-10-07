import {
  AnimatedSprite2DProperty,
  Node2DProperty,
  Sprite2DProperty,
} from "./property";
import { Resource } from "./property";

// Node type enumeration
export enum NodeType {
  Node = "Node",
  Control = "Control",
  Node2D = "Node2D",
  Sprite2D = "Sprite2D",
  AnimatedSprite2D = "AnimatedSprite2D",
  RigidBody2D = "RigidBody2D",
  StaticBody2D = "StaticBody2D",
  Area2D = "Area2D",
  CharacterBody2D = "CharacterBody2D",
  CollisionShape2D = "CollisionShape2D",
  CollisionPolygon2D = "CollisionPolygon2D",
  PackedScene = "PackedScene",
}

// Signal connection types
export interface SignalConnection {
  id: string; // Unique identifier for the connection
  fromNodeId: string; // ID of the node emitting the signal
  fromSignal: string; // Name of the signal being emitted
  toNodeId: string; // ID of the node receiving the signal
  toMethod: string; // Name of the method to call on the receiving node
  enabled: boolean; // Whether the connection is active
  metadata?: {
    // Additional metadata for the connection
    description?: string;
    created?: Date;
    modified?: Date;
  };
}

// Connection direction types
export type ConnectionDirection = "outgoing" | "incoming" | "both";

// Connection filter options
export interface ConnectionFilter {
  nodeId?: string;
  signalName?: string;
  direction?: ConnectionDirection;
  enabled?: boolean;
}

interface BaseNode {
  id: string; // Unique identifier for the node
  name: string;
  type: NodeType;
  children?: INode[];
  resource?: Resource[];
  connections?: SignalConnection[]; // Array of signal connections
}

export interface Node extends BaseNode {
  type: NodeType.Node;
}

export interface Node2D extends BaseNode {
  type: NodeType.Node2D;
  property?: Node2DProperty;
}
export interface Sprite2D extends BaseNode {
  type: NodeType.Sprite2D;
  property?: Sprite2DProperty;
}

interface AnimatedSprite2D extends BaseNode {
  type: NodeType.AnimatedSprite2D;
  property?: AnimatedSprite2DProperty;
}

export type INode = Node | Node2D | Sprite2D | AnimatedSprite2D;

// Helper functions for managing signal connections
export class NodeConnectionManager {
  /**
   * Add a new signal connection to a node
   */
  static addConnection(node: INode, connection: SignalConnection): INode {
    return {
      ...node,
      connections: [...(node.connections || []), connection],
    };
  }

  /**
   * Remove a signal connection from a node
   */
  static removeConnection(node: INode, connectionId: string): INode {
    return {
      ...node,
      connections: (node.connections || []).filter(
        (conn) => conn.id !== connectionId
      ),
    };
  }

  /**
   * Update an existing signal connection
   */
  static updateConnection(
    node: INode,
    connectionId: string,
    updates: Partial<SignalConnection>
  ): INode {
    return {
      ...node,
      connections: (node.connections || []).map((conn) =>
        conn.id === connectionId ? { ...conn, ...updates } : conn
      ),
    };
  }

  /**
   * Get all connections for a node
   */
  static getConnections(
    node: INode,
    filter?: ConnectionFilter
  ): SignalConnection[] {
    let connections = node.connections || [];

    if (filter) {
      if (filter.nodeId) {
        connections = connections.filter(
          (conn) =>
            conn.fromNodeId === filter.nodeId || conn.toNodeId === filter.nodeId
        );
      }
      if (filter.signalName) {
        connections = connections.filter(
          (conn) => conn.fromSignal === filter.signalName
        );
      }
      if (filter.enabled !== undefined) {
        connections = connections.filter(
          (conn) => conn.enabled === filter.enabled
        );
      }
      if (filter.direction) {
        connections = connections.filter((conn) => {
          switch (filter.direction) {
            case "outgoing":
              return conn.fromNodeId === node.id;
            case "incoming":
              return conn.toNodeId === node.id;
            case "both":
              return conn.fromNodeId === node.id || conn.toNodeId === node.id;
            default:
              return true;
          }
        });
      }
    }

    return connections;
  }

  /**
   * Get outgoing connections (signals this node emits)
   */
  static getOutgoingConnections(node: INode): SignalConnection[] {
    return this.getConnections(node, { direction: "outgoing" });
  }

  /**
   * Get incoming connections (signals this node receives)
   */
  static getIncomingConnections(node: INode): SignalConnection[] {
    return this.getConnections(node, { direction: "incoming" });
  }

  /**
   * Check if a node has a specific signal connection
   */
  static hasConnection(
    node: INode,
    fromSignal: string,
    toNodeId: string,
    toMethod: string
  ): boolean {
    return (node.connections || []).some(
      (conn) =>
        conn.fromSignal === fromSignal &&
        conn.toNodeId === toNodeId &&
        conn.toMethod === toMethod
    );
  }

  /**
   * Enable or disable a connection
   */
  static toggleConnection(
    node: INode,
    connectionId: string,
    enabled: boolean
  ): INode {
    return this.updateConnection(node, connectionId, { enabled });
  }

  /**
   * Get all nodes connected to this node via signals
   */
  static getConnectedNodes(node: INode, allNodes: INode[]): INode[] {
    const connectedNodeIds = new Set<string>();

    (node.connections || []).forEach((conn) => {
      if (conn.fromNodeId === node.id) {
        connectedNodeIds.add(conn.toNodeId);
      }
      if (conn.toNodeId === node.id) {
        connectedNodeIds.add(conn.fromNodeId);
      }
    });

    return allNodes.filter((n) => connectedNodeIds.has(n.id));
  }
}

// Utility function to generate unique connection IDs
export function generateConnectionId(): string {
  return `conn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Utility function to create a new signal connection
export function createSignalConnection(
  fromNodeId: string,
  fromSignal: string,
  toNodeId: string,
  toMethod: string,
  enabled: boolean = true,
  description?: string
): SignalConnection {
  return {
    id: generateConnectionId(),
    fromNodeId,
    fromSignal,
    toNodeId,
    toMethod,
    enabled,
    metadata: {
      description,
      created: new Date(),
      modified: new Date(),
    },
  };
}

// export type Node = BaseNode &
// (
//   | { type: NodeType.Node }
//   | { type: NodeType.Node2D; property?: Node2DProperty }
//   | { type: NodeType.Sprite2D; property?: Sprite2DProperty }
//   | { type: NodeType.AnimatedSprite2D; property?: AnimatedSprite2DProperty }
// );
