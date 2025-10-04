// Signal types for Godot nodes based on their built-in signals
// These correspond to the signals that each node type can emit

// Base Node signals (inherited by all nodes)
export interface BaseNodeSignals {
  // Core node lifecycle signals
  ready: () => void;
  enter_tree: () => void;
  exit_tree: () => void;
  tree_entered: () => void;
  tree_exiting: () => void;
  tree_exited: () => void;
  
  // Node management signals
  child_entered_tree: (node: any) => void;
  child_exiting_tree: (node: any) => void;
  child_order_changed: () => void;
  
  // Node property signals
  renamed: () => void;
  script_changed: () => void;
  
  // Process signals
  process: (delta: number) => void;
  physics_process: (delta: number) => void;
}

// Node2D specific signals (inherited by all 2D nodes)
export interface Node2DSignals extends BaseNodeSignals {
  // Transform signals
  transform_changed: () => void;
  
  // Visibility signals
  visibility_changed: () => void;
  draw: () => void;
}

// Sprite2D specific signals
export interface Sprite2DSignals extends Node2DSignals {
  // Texture signals
  texture_changed: () => void;
  
  // Region signals (if using texture regions)
  region_changed: () => void;
}

// AnimatedSprite2D specific signals
export interface AnimatedSprite2DSignals extends Node2DSignals {
  // Animation signals
  animation_finished: (animation_name: string) => void;
  animation_looped: (animation_name: string) => void;
  frame_changed: () => void;
  
  // Sprite frame signals
  sprite_frames_changed: () => void;
}

// Area2D specific signals
export interface Area2DSignals extends Node2DSignals {
  // Body detection signals
  body_entered: (body: any) => void;
  body_exited: (body: any) => void;
  body_shape_entered: (body_rid: any, body: any, body_shape_index: number, local_shape_index: number) => void;
  body_shape_exited: (body_rid: any, body: any, body_shape_index: number, local_shape_index: number) => void;
  
  // Area detection signals
  area_entered: (area: any) => void;
  area_exited: (area: any) => void;
  area_shape_entered: (area_rid: any, area: any, area_shape_index: number, local_shape_index: number) => void;
  area_shape_exited: (area_rid: any, area: any, area_shape_index: number, local_shape_index: number) => void;
  
  // Monitoring signals
  monitoring_toggled: (monitor: boolean) => void;
  monitorable_toggled: (monitorable: boolean) => void;
}

// RigidBody2D specific signals
export interface RigidBody2DSignals extends Node2DSignals {
  // Physics signals
  body_entered: (body: any) => void;
  body_exited: (body: any) => void;
  body_shape_entered: (body_rid: any, body: any, body_shape_index: number, local_shape_index: number) => void;
  body_shape_exited: (body_rid: any, body: any, body_shape_index: number, local_shape_index: number) => void;
  
  // Sleep state signals
  sleep_state_changed: () => void;
  
  // Collision signals
  collision: (body: any, collision: any) => void;
}

// CharacterBody2D specific signals
export interface CharacterBody2DSignals extends Node2DSignals {
  // Movement signals
  velocity_changed: () => void;
  
  // Collision signals
  collision: (body: any, collision: any) => void;
}

// StaticBody2D specific signals
export interface StaticBody2DSignals extends Node2DSignals {
  // Body detection signals
  body_entered: (body: any) => void;
  body_exited: (body: any) => void;
  body_shape_entered: (body_rid: any, body: any, body_shape_index: number, local_shape_index: number) => void;
  body_shape_exited: (body_rid: any, body: any, body_shape_index: number, local_shape_index: number) => void;
}

// CollisionShape2D specific signals
export interface CollisionShape2DSignals extends Node2DSignals {
  // Shape signals
  shape_changed: () => void;
}

// CollisionPolygon2D specific signals
export interface CollisionPolygon2DSignals extends Node2DSignals {
  // Polygon signals
  polygon_changed: () => void;
}

// Union type for all possible signals
export type NodeSignals = 
  | BaseNodeSignals
  | Node2DSignals
  | Sprite2DSignals
  | AnimatedSprite2DSignals
  | Area2DSignals
  | RigidBody2DSignals
  | CharacterBody2DSignals
  | StaticBody2DSignals
  | CollisionShape2DSignals
  | CollisionPolygon2DSignals;

// Signal parameter types for type safety
export interface SignalParameter {
  name: string;
  type: 'void' | 'int' | 'float' | 'string' | 'bool' | 'Vector2' | 'Vector3' | 'Node' | 'RID' | 'any';
  optional?: boolean;
}

// Signal definition interface
export interface SignalDefinition {
  name: string;
  parameters: SignalParameter[];
  description?: string;
}

// Signal mapping for each node type
export const NODE_SIGNAL_MAPPINGS: Record<string, SignalDefinition[]> = {
  'Node': [
    { name: 'ready', parameters: [], description: 'Emitted when the node is ready' },
    { name: 'enter_tree', parameters: [], description: 'Emitted when the node enters the scene tree' },
    { name: 'exit_tree', parameters: [], description: 'Emitted when the node exits the scene tree' },
    { name: 'tree_entered', parameters: [], description: 'Emitted when the node enters the scene tree' },
    { name: 'tree_exiting', parameters: [], description: 'Emitted when the node is about to exit the scene tree' },
    { name: 'tree_exited', parameters: [], description: 'Emitted when the node exits the scene tree' },
    { name: 'child_entered_tree', parameters: [{ name: 'node', type: 'Node' }], description: 'Emitted when a child node enters the scene tree' },
    { name: 'child_exiting_tree', parameters: [{ name: 'node', type: 'Node' }], description: 'Emitted when a child node is about to exit the scene tree' },
    { name: 'child_order_changed', parameters: [], description: 'Emitted when the child order changes' },
    { name: 'renamed', parameters: [], description: 'Emitted when the node is renamed' },
    { name: 'script_changed', parameters: [], description: 'Emitted when the node script changes' },
  ],
  'Node2D': [
    { name: 'transform_changed', parameters: [], description: 'Emitted when the transform changes' },
    { name: 'visibility_changed', parameters: [], description: 'Emitted when visibility changes' },
    { name: 'draw', parameters: [], description: 'Emitted when the node is drawn' },
  ],
  'Sprite2D': [
    { name: 'texture_changed', parameters: [], description: 'Emitted when the texture changes' },
    { name: 'region_changed', parameters: [], description: 'Emitted when the texture region changes' },
  ],
  'AnimatedSprite2D': [
    { name: 'animation_finished', parameters: [{ name: 'animation_name', type: 'string' }], description: 'Emitted when an animation finishes' },
    { name: 'animation_looped', parameters: [{ name: 'animation_name', type: 'string' }], description: 'Emitted when an animation loops' },
    { name: 'frame_changed', parameters: [], description: 'Emitted when the frame changes' },
    { name: 'sprite_frames_changed', parameters: [], description: 'Emitted when sprite frames change' },
  ],
  'Area2D': [
    { name: 'body_entered', parameters: [{ name: 'body', type: 'Node' }], description: 'Emitted when a body enters the area' },
    { name: 'body_exited', parameters: [{ name: 'body', type: 'Node' }], description: 'Emitted when a body exits the area' },
    { name: 'body_shape_entered', parameters: [
      { name: 'body_rid', type: 'RID' },
      { name: 'body', type: 'Node' },
      { name: 'body_shape_index', type: 'int' },
      { name: 'local_shape_index', type: 'int' }
    ], description: 'Emitted when a body shape enters the area' },
    { name: 'body_shape_exited', parameters: [
      { name: 'body_rid', type: 'RID' },
      { name: 'body', type: 'Node' },
      { name: 'body_shape_index', type: 'int' },
      { name: 'local_shape_index', type: 'int' }
    ], description: 'Emitted when a body shape exits the area' },
    { name: 'area_entered', parameters: [{ name: 'area', type: 'Node' }], description: 'Emitted when an area enters this area' },
    { name: 'area_exited', parameters: [{ name: 'area', type: 'Node' }], description: 'Emitted when an area exits this area' },
    { name: 'area_shape_entered', parameters: [
      { name: 'area_rid', type: 'RID' },
      { name: 'area', type: 'Node' },
      { name: 'area_shape_index', type: 'int' },
      { name: 'local_shape_index', type: 'int' }
    ], description: 'Emitted when an area shape enters this area' },
    { name: 'area_shape_exited', parameters: [
      { name: 'area_rid', type: 'RID' },
      { name: 'area', type: 'Node' },
      { name: 'area_shape_index', type: 'int' },
      { name: 'local_shape_index', type: 'int' }
    ], description: 'Emitted when an area shape exits this area' },
    { name: 'monitoring_toggled', parameters: [{ name: 'monitor', type: 'bool' }], description: 'Emitted when monitoring is toggled' },
    { name: 'monitorable_toggled', parameters: [{ name: 'monitorable', type: 'bool' }], description: 'Emitted when monitorable is toggled' },
  ],
  'RigidBody2D': [
    { name: 'body_entered', parameters: [{ name: 'body', type: 'Node' }], description: 'Emitted when a body enters' },
    { name: 'body_exited', parameters: [{ name: 'body', type: 'Node' }], description: 'Emitted when a body exits' },
    { name: 'body_shape_entered', parameters: [
      { name: 'body_rid', type: 'RID' },
      { name: 'body', type: 'Node' },
      { name: 'body_shape_index', type: 'int' },
      { name: 'local_shape_index', type: 'int' }
    ], description: 'Emitted when a body shape enters' },
    { name: 'body_shape_exited', parameters: [
      { name: 'body_rid', type: 'RID' },
      { name: 'body', type: 'Node' },
      { name: 'body_shape_index', type: 'int' },
      { name: 'local_shape_index', type: 'int' }
    ], description: 'Emitted when a body shape exits' },
    { name: 'sleep_state_changed', parameters: [], description: 'Emitted when sleep state changes' },
    { name: 'collision', parameters: [{ name: 'body', type: 'Node' }, { name: 'collision', type: 'any' }], description: 'Emitted on collision' },
  ],
  'CharacterBody2D': [
    { name: 'velocity_changed', parameters: [], description: 'Emitted when velocity changes' },
    { name: 'collision', parameters: [{ name: 'body', type: 'Node' }, { name: 'collision', type: 'any' }], description: 'Emitted on collision' },
  ],
  'StaticBody2D': [
    { name: 'body_entered', parameters: [{ name: 'body', type: 'Node' }], description: 'Emitted when a body enters' },
    { name: 'body_exited', parameters: [{ name: 'body', type: 'Node' }], description: 'Emitted when a body exits' },
    { name: 'body_shape_entered', parameters: [
      { name: 'body_rid', type: 'RID' },
      { name: 'body', type: 'Node' },
      { name: 'body_shape_index', type: 'int' },
      { name: 'local_shape_index', type: 'int' }
    ], description: 'Emitted when a body shape enters' },
    { name: 'body_shape_exited', parameters: [
      { name: 'body_rid', type: 'RID' },
      { name: 'body', type: 'Node' },
      { name: 'body_shape_index', type: 'int' },
      { name: 'local_shape_index', type: 'int' }
    ], description: 'Emitted when a body shape exits' },
  ],
  'CollisionShape2D': [
    { name: 'shape_changed', parameters: [], description: 'Emitted when the collision shape changes' },
  ],
  'CollisionPolygon2D': [
    { name: 'polygon_changed', parameters: [], description: 'Emitted when the collision polygon changes' },
  ],
};

// Helper function to get signals for a specific node type
export function getSignalsForNodeType(nodeType: string): SignalDefinition[] {
  return NODE_SIGNAL_MAPPINGS[nodeType] || [];
}

// Helper function to check if a signal exists for a node type
export function hasSignal(nodeType: string, signalName: string): boolean {
  const signals = getSignalsForNodeType(nodeType);
  return signals.some(signal => signal.name === signalName);
}
