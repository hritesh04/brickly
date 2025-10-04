// Node-specific mappings for triggers and actions based on Godot node capabilities

import { ActionType } from "./ActionTypes";

export enum NodeType {
  NODE = 'Node',
  NODE2D = 'Node2D',
  SPRITE2D = 'Sprite2D',
  ANIMATED_SPRITE2D = 'AnimatedSprite2D',
  RIGIDBODY2D = 'RigidBody2D',
  STATICBODY2D = 'StaticBody2D',
  AREA2D = 'Area2D',
  CHARACTERBODY2D = 'CharacterBody2D',
  COLLISION_SHAPE2D = 'CollisionShape2D',
  COLLISION_POLYGON2D = 'CollisionPolygon2D'
}

// Triggers available for each node type
export const NODE_TRIGGERS = {
  [NodeType.NODE]: [
    'onReady',
    'onProcess', 
    'onPhysicsProcess',
    'onDestroy',
    'onSignal'
  ],
  [NodeType.NODE2D]: [
    'onReady',
    'onProcess',
    'onPhysicsProcess', 
    'onDestroy',
    'onSignal'
  ],
  [NodeType.SPRITE2D]: [
    'onReady',
    'onProcess',
    'onPhysicsProcess',
    'onDestroy',
    'onSignal'
  ],
  [NodeType.ANIMATED_SPRITE2D]: [
    'onReady',
    'onProcess',
    'onPhysicsProcess',
    'onDestroy',
    'onSignal',
    'onAnimationFinished',
    'onFrameChanged'
  ],
  [NodeType.RIGIDBODY2D]: [
    'onReady',
    'onProcess',
    'onPhysicsProcess',
    'onDestroy',
    'onSignal',
    'onBodyEntered',
    'onBodyExited'
  ],
  [NodeType.STATICBODY2D]: [
    'onReady',
    'onProcess',
    'onPhysicsProcess',
    'onDestroy',
    'onSignal'
  ],
  [NodeType.AREA2D]: [
    'onReady',
    'onProcess',
    'onPhysicsProcess',
    'onDestroy',
    'onSignal',
    'onAreaBodyEntered',
    'onAreaBodyExited',
    'onAreaEntered',
    'onAreaExited'
  ],
  [NodeType.CHARACTERBODY2D]: [
    'onReady',
    'onProcess',
    'onPhysicsProcess',
    'onDestroy',
    'onSignal',
    'onInput'
  ],
  [NodeType.COLLISION_SHAPE2D]: [
    'onReady',
    'onProcess',
    'onPhysicsProcess',
    'onDestroy',
    'onSignal'
  ],
  [NodeType.COLLISION_POLYGON2D]: [
    'onReady',
    'onProcess',
    'onPhysicsProcess',
    'onDestroy',
    'onSignal'
  ]
};

// Base actions for each node type
const BASE_NODE_ACTIONS = [
  // Core Node functions
  ActionType.ADD_CHILD,
  ActionType.REMOVE_CHILD,
  ActionType.QUEUE_FREE,
  ActionType.GET_NODE,
  ActionType.GET_PARENT,
  ActionType.GET_CHILDREN,
  ActionType.SET_PROCESS,
  ActionType.SET_PHYSICS_PROCESS,
  ActionType.SET_VISIBLE,
  ActionType.SET_PROPERTY,
  // Flow Control
  ActionType.WAIT,
  ActionType.CONDITION,
  ActionType.LOOP,
  // Signals
  ActionType.EMIT_SIGNAL,
  ActionType.CONNECT_SIGNAL,
  // Debug
  ActionType.PRINT,
  ActionType.CUSTOM_CODE
];

const BASE_NODE2D_ACTIONS = [
  ...BASE_NODE_ACTIONS,
  // Transform functions
  ActionType.MOVE_TO,
  ActionType.MOVE_BY,
  ActionType.TRANSLATE,
  ActionType.ROTATE_TO,
  ActionType.ROTATE_BY,
  ActionType.ROTATE,
  ActionType.SCALE_TO,
  ActionType.SCALE_BY,
  ActionType.LOOK_AT,
  ActionType.GET_ANGLE_TO,
  ActionType.TO_LOCAL,
  ActionType.TO_GLOBAL,
  ActionType.SET_MODULATE,
  ActionType.TWEEN_PROPERTY
];

// Actions available for each node type
export const NODE_ACTIONS: Record<NodeType, ActionType[]> = {
  [NodeType.NODE]: BASE_NODE_ACTIONS,
  [NodeType.NODE2D]: BASE_NODE2D_ACTIONS,
  [NodeType.SPRITE2D]: [
    ...BASE_NODE2D_ACTIONS,
    // Sprite2D specific functions
    ActionType.SET_TEXTURE,
    ActionType.GET_TEXTURE,
    ActionType.SET_REGION_ENABLED,
    ActionType.SET_REGION_RECT,
    ActionType.SET_FLIP_H,
    ActionType.SET_FLIP_V
  ],
  [NodeType.ANIMATED_SPRITE2D]: [
    ...BASE_NODE2D_ACTIONS,
    // AnimatedSprite2D specific functions
    ActionType.PLAY_ANIMATION,
    ActionType.STOP_ANIMATION,
    ActionType.PAUSE_ANIMATION,
    ActionType.SET_ANIMATION,
    ActionType.GET_ANIMATION,
    ActionType.SET_FRAME,
    ActionType.GET_FRAME,
    ActionType.SET_SPEED_SCALE,
    ActionType.SET_FLIP_H,
    ActionType.SET_FLIP_V
  ],
  [NodeType.RIGIDBODY2D]: [
    ...BASE_NODE2D_ACTIONS,
    // RigidBody2D specific functions
    ActionType.APPLY_IMPULSE,
    ActionType.APPLY_FORCE,
    ActionType.SET_GRAVITY_SCALE,
    ActionType.FREEZE_BODY,
    ActionType.SET_FREEZE_ENABLED,
    ActionType.SET_MASS,
    ActionType.SET_LINEAR_VELOCITY,
    ActionType.SET_ANGULAR_VELOCITY,
    ActionType.SET_LOCK_ROTATION
  ],
  [NodeType.STATICBODY2D]: [
    ...BASE_NODE2D_ACTIONS,
    // StaticBody2D specific functions
    ActionType.MOVE_AND_COLLIDE,
    ActionType.SET_CONSTANT_LINEAR_VELOCITY,
    ActionType.SET_CONSTANT_ANGULAR_VELOCITY
  ],
  [NodeType.AREA2D]: [
    ...BASE_NODE2D_ACTIONS,
    // Area2D specific functions
    ActionType.GET_OVERLAPPING_BODIES,
    ActionType.GET_OVERLAPPING_AREAS,
    ActionType.OVERLAPS_BODY,
    ActionType.OVERLAPS_AREA,
    ActionType.SET_MONITORING,
    ActionType.SET_MONITORABLE,
    ActionType.SET_GRAVITY,
    ActionType.SET_GRAVITY_VECTOR
  ],
  [NodeType.CHARACTERBODY2D]: [
    ...BASE_NODE2D_ACTIONS,
    // CharacterBody2D specific functions
    ActionType.MOVE_AND_SLIDE,
    ActionType.IS_ON_FLOOR,
    ActionType.IS_ON_CEILING,
    ActionType.IS_ON_WALL,
    ActionType.GET_FLOOR_NORMAL,
    ActionType.SET_VELOCITY,
    ActionType.SET_FLOOR_MAX_ANGLE,
    ActionType.SET_UP_DIRECTION,
    ActionType.CHECK_INPUT
  ],
  [NodeType.COLLISION_SHAPE2D]: [
    ...BASE_NODE2D_ACTIONS,
    // CollisionShape2D specific functions
    ActionType.SET_SHAPE,
    ActionType.GET_SHAPE,
    ActionType.SET_COLLISION_DISABLED,
    ActionType.SET_ONE_WAY_COLLISION
  ],
  [NodeType.COLLISION_POLYGON2D]: [
    ...BASE_NODE2D_ACTIONS,
    // CollisionPolygon2D specific functions
    ActionType.SET_POLYGON,
    ActionType.GET_POLYGON,
    ActionType.SET_BUILD_MODE,
    ActionType.SET_COLLISION_DISABLED,
    ActionType.SET_ONE_WAY_COLLISION
  ]
};

// Helper functions
export function getAvailableTriggersForNode(nodeType: NodeType): string[] {
  return NODE_TRIGGERS[nodeType] || NODE_TRIGGERS[NodeType.NODE];
}

export function getAvailableActionsForNode(nodeType: NodeType): ActionType[] {
  return NODE_ACTIONS[nodeType] || NODE_ACTIONS[NodeType.NODE];
}

export function isActionAvailableForNode(nodeType: NodeType, actionType: ActionType): boolean {
  const availableActions = getAvailableActionsForNode(nodeType);
  return availableActions.includes(actionType);
}

export function isTriggerAvailableForNode(nodeType: NodeType, triggerType: string): boolean {
  const availableTriggers = getAvailableTriggersForNode(nodeType);
  return availableTriggers.includes(triggerType);
}
