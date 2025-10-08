// Node-specific mappings for triggers and actions based on Godot node capabilities

import { ActionType } from "./action";
import { NodeType } from "./node";

// Helper function to convert signal names to trigger names
function signalToTriggerName(signalName: string): string {
  return `on${signalName.charAt(0).toUpperCase()}${signalName.slice(1)}`;
}

// Get triggers for a node type based on available signals
export function getNodeTriggers(nodeType: NodeType): string[] {
  // const signals = getSignalsForNodeType(nodeType);
  const baseTriggers = [
    "onProcess",
    "onPhysicsProcess",
    "onDestroy",
    "onSignal",
  ];

  // Convert signal names to trigger names
  // const signalTriggers = signals.map((signal) =>
  // signalToTriggerName(signal.name)
  // );

  // Combine base triggers with signal-based triggers
  // return [...baseTriggers, ...signalTriggers];
  return baseTriggers;
}

// Legacy NODE_TRIGGERS for backward compatibility
export const NODE_TRIGGERS = {
  [NodeType.Node]: getNodeTriggers(NodeType.Node),
  [NodeType.Node2D]: getNodeTriggers(NodeType.Node2D),
  [NodeType.Sprite2D]: getNodeTriggers(NodeType.Sprite2D),
  [NodeType.AnimatedSprite2D]: getNodeTriggers(NodeType.AnimatedSprite2D),
  [NodeType.RigidBody2D]: getNodeTriggers(NodeType.RigidBody2D),
  [NodeType.StaticBody2D]: getNodeTriggers(NodeType.StaticBody2D),
  [NodeType.Area2D]: getNodeTriggers(NodeType.Area2D),
  [NodeType.CharacterBody2D]: getNodeTriggers(NodeType.CharacterBody2D),
  [NodeType.CollisionShape2D]: getNodeTriggers(NodeType.CollisionShape2D),
  [NodeType.CollisionPolygon2D]: getNodeTriggers(NodeType.CollisionPolygon2D),
  [NodeType.PackedScene]: getNodeTriggers(NodeType.PackedScene),
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
  ActionType.CUSTOM_CODE,
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
  ActionType.TWEEN_PROPERTY,
];

// Actions available for each node type
export const NODE_ACTIONS: Record<NodeType, ActionType[]> = {
  [NodeType.Node]: BASE_NODE_ACTIONS,
  [NodeType.Node2D]: BASE_NODE2D_ACTIONS,
  [NodeType.Sprite2D]: [
    ...BASE_NODE2D_ACTIONS,
    // Sprite2D specific functions
    ActionType.SET_TEXTURE,
    ActionType.GET_TEXTURE,
    ActionType.SET_REGION_ENABLED,
    ActionType.SET_REGION_RECT,
    ActionType.SET_FLIP_H,
    ActionType.SET_FLIP_V,
  ],
  [NodeType.AnimatedSprite2D]: [
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
    ActionType.SET_FLIP_V,
  ],
  [NodeType.RigidBody2D]: [
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
    ActionType.SET_LOCK_ROTATION,
  ],
  [NodeType.StaticBody2D]: [
    ...BASE_NODE2D_ACTIONS,
    // StaticBody2D specific functions
    ActionType.MOVE_AND_COLLIDE,
    ActionType.SET_CONSTANT_LINEAR_VELOCITY,
    ActionType.SET_CONSTANT_ANGULAR_VELOCITY,
  ],
  [NodeType.Area2D]: [
    ...BASE_NODE2D_ACTIONS,
    // Area2D specific functions
    ActionType.GET_OVERLAPPING_BODIES,
    ActionType.GET_OVERLAPPING_AREAS,
    ActionType.OVERLAPS_BODY,
    ActionType.OVERLAPS_AREA,
    ActionType.SET_MONITORING,
    ActionType.SET_MONITORABLE,
    ActionType.SET_GRAVITY,
    ActionType.SET_GRAVITY_VECTOR,
  ],
  [NodeType.CharacterBody2D]: [
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
    ActionType.CHECK_INPUT,
  ],
  [NodeType.CollisionShape2D]: [
    ...BASE_NODE2D_ACTIONS,
    // CollisionShape2D specific functions
    ActionType.SET_SHAPE,
    ActionType.GET_SHAPE,
    ActionType.SET_COLLISION_DISABLED,
    ActionType.SET_ONE_WAY_COLLISION,
  ],
  [NodeType.CollisionPolygon2D]: [
    ...BASE_NODE2D_ACTIONS,
    // CollisionPolygon2D specific functions
    ActionType.SET_POLYGON,
    ActionType.GET_POLYGON,
    ActionType.SET_BUILD_MODE,
    ActionType.SET_COLLISION_DISABLED,
    ActionType.SET_ONE_WAY_COLLISION,
  ],
  [NodeType.PackedScene]: BASE_NODE_ACTIONS,
};

// Trigger option interface for UI components
export interface TriggerOption {
  value: string;
  label: string;
  description: string;
}

// Get trigger options with descriptions for a node type
export function getTriggerOptionsForNode(nodeType: NodeType): TriggerOption[] {
  // const signals = getSignalsForNodeType(nodeType);
  const baseTriggers: TriggerOption[] = [
    {
      value: "onProcess",
      label: "On Process",
      description: "Called every frame (_process)",
    },
    {
      value: "onPhysicsProcess",
      label: "On Physics Process",
      description: "Called every physics frame (_physics_process)",
    },
    {
      value: "onDestroy",
      label: "On Destroy",
      description: "When node is being destroyed",
    },
    {
      value: "onSignal",
      label: "On Custom Signal",
      description: "When receiving a custom signal",
    },
  ];

  // Convert signal definitions to trigger options
  // const signalTriggers: TriggerOption[] = signals.map((signal) => ({
  //   value: signalToTriggerName(signal.name),
  //   label: `On ${signal.name.charAt(0).toUpperCase()}${signal.name
  //     .slice(1)
  //     .replace(/_/g, " ")}`,
  //   description: signal.description || `Emitted when ${signal.name} occurs`,
  // }));

  // return [...baseTriggers, ...signalTriggers];
  return baseTriggers;
}

// Helper functions
export function getAvailableTriggersForNode(nodeType: NodeType): string[] {
  return NODE_TRIGGERS[nodeType] || NODE_TRIGGERS[NodeType.Node];
}

export function getAvailableActionsForNode(nodeType: NodeType): ActionType[] {
  return NODE_ACTIONS[nodeType] || NODE_ACTIONS[NodeType.Node];
}

export function isActionAvailableForNode(
  nodeType: NodeType,
  actionType: ActionType
): boolean {
  const availableActions = getAvailableActionsForNode(nodeType);
  return availableActions.includes(actionType);
}

export function isTriggerAvailableForNode(
  nodeType: NodeType,
  triggerType: string
): boolean {
  const availableTriggers = getAvailableTriggersForNode(nodeType);
  return availableTriggers.includes(triggerType);
}
