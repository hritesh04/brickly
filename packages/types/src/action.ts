// Action Types for Visual Scripting System

export interface BaseAction {
  id: string;
  name: string;
  type: ActionType;
  enabled: boolean;
}

export enum ActionType {
  // Transform Actions (Node2D)
  MOVE_TO = "MOVE_TO",
  MOVE_BY = "MOVE_BY",
  TRANSLATE = "TRANSLATE",
  ROTATE_TO = "ROTATE_TO",
  ROTATE_BY = "ROTATE_BY",
  ROTATE = "ROTATE",
  SCALE_TO = "SCALE_TO",
  SCALE_BY = "SCALE_BY",
  LOOK_AT = "LOOK_AT",
  GET_ANGLE_TO = "GET_ANGLE_TO",
  TO_LOCAL = "TO_LOCAL",
  TO_GLOBAL = "TO_GLOBAL",

  // Node Core Functions
  ADD_CHILD = "ADD_CHILD",
  REMOVE_CHILD = "REMOVE_CHILD",
  QUEUE_FREE = "QUEUE_FREE",
  GET_NODE = "GET_NODE",
  GET_PARENT = "GET_PARENT",
  GET_CHILDREN = "GET_CHILDREN",
  SET_PROCESS = "SET_PROCESS",
  SET_PHYSICS_PROCESS = "SET_PHYSICS_PROCESS",

  // Sprite2D Actions
  SET_TEXTURE = "SET_TEXTURE",
  GET_TEXTURE = "GET_TEXTURE",
  SET_REGION_ENABLED = "SET_REGION_ENABLED",
  SET_REGION_RECT = "SET_REGION_RECT",
  SET_FLIP_H = "SET_FLIP_H",
  SET_FLIP_V = "SET_FLIP_V",

  // AnimatedSprite2D Actions
  PLAY_ANIMATION = "PLAY_ANIMATION",
  STOP_ANIMATION = "STOP_ANIMATION",
  PAUSE_ANIMATION = "PAUSE_ANIMATION",
  SET_ANIMATION = "SET_ANIMATION",
  GET_ANIMATION = "GET_ANIMATION",
  SET_FRAME = "SET_FRAME",
  GET_FRAME = "GET_FRAME",
  SET_SPEED_SCALE = "SET_SPEED_SCALE",

  // RigidBody2D Actions
  APPLY_IMPULSE = "APPLY_IMPULSE",
  APPLY_FORCE = "APPLY_FORCE",
  SET_GRAVITY_SCALE = "SET_GRAVITY_SCALE",
  FREEZE_BODY = "FREEZE_BODY",
  SET_FREEZE_ENABLED = "SET_FREEZE_ENABLED",
  SET_MASS = "SET_MASS",
  SET_LINEAR_VELOCITY = "SET_LINEAR_VELOCITY",
  SET_ANGULAR_VELOCITY = "SET_ANGULAR_VELOCITY",
  SET_LOCK_ROTATION = "SET_LOCK_ROTATION",

  // StaticBody2D Actions
  MOVE_AND_COLLIDE = "MOVE_AND_COLLIDE",
  SET_CONSTANT_LINEAR_VELOCITY = "SET_CONSTANT_LINEAR_VELOCITY",
  SET_CONSTANT_ANGULAR_VELOCITY = "SET_CONSTANT_ANGULAR_VELOCITY",

  // Area2D Actions
  GET_OVERLAPPING_BODIES = "GET_OVERLAPPING_BODIES",
  GET_OVERLAPPING_AREAS = "GET_OVERLAPPING_AREAS",
  OVERLAPS_BODY = "OVERLAPS_BODY",
  OVERLAPS_AREA = "OVERLAPS_AREA",
  SET_MONITORING = "SET_MONITORING",
  SET_MONITORABLE = "SET_MONITORABLE",
  SET_GRAVITY = "SET_GRAVITY",
  SET_GRAVITY_VECTOR = "SET_GRAVITY_VECTOR",

  // CharacterBody2D Actions
  MOVE_AND_SLIDE = "MOVE_AND_SLIDE",
  IS_ON_FLOOR = "IS_ON_FLOOR",
  IS_ON_CEILING = "IS_ON_CEILING",
  IS_ON_WALL = "IS_ON_WALL",
  GET_FLOOR_NORMAL = "GET_FLOOR_NORMAL",
  SET_VELOCITY = "SET_VELOCITY",
  SET_FLOOR_MAX_ANGLE = "SET_FLOOR_MAX_ANGLE",
  SET_UP_DIRECTION = "SET_UP_DIRECTION",

  // CollisionShape2D Actions
  SET_SHAPE = "SET_SHAPE",
  GET_SHAPE = "GET_SHAPE",
  SET_COLLISION_DISABLED = "SET_COLLISION_DISABLED",
  SET_ONE_WAY_COLLISION = "SET_ONE_WAY_COLLISION",

  // CollisionPolygon2D Actions
  SET_POLYGON = "SET_POLYGON",
  GET_POLYGON = "GET_POLYGON",
  SET_BUILD_MODE = "SET_BUILD_MODE",

  // Property Actions
  SET_VISIBLE = "SET_VISIBLE",
  SET_MODULATE = "SET_MODULATE",
  SET_PROPERTY = "SET_PROPERTY",

  // Animation Actions
  TWEEN_PROPERTY = "TWEEN_PROPERTY",

  // Signal Actions
  EMIT_SIGNAL = "EMIT_SIGNAL",
  CONNECT_SIGNAL = "CONNECT_SIGNAL",

  // Flow Control
  WAIT = "WAIT",
  CONDITION = "CONDITION",
  LOOP = "LOOP",

  // Scene Actions
  CHANGE_SCENE = "CHANGE_SCENE",
  INSTANTIATE_SCENE = "INSTANTIATE_SCENE",

  // Audio Actions
  PLAY_SOUND = "PLAY_SOUND",
  STOP_SOUND = "STOP_SOUND",

  // Input Actions
  CHECK_INPUT = "CHECK_INPUT",

  // Debug Actions
  PRINT = "PRINT",

  // Advanced
  CUSTOM_CODE = "CUSTOM_CODE",
}

// Specific Action Interfaces
export interface MoveToAction extends BaseAction {
  type: ActionType.MOVE_TO;
  targetX: number;
  targetY: number;
  duration?: number;
  easeType?: EaseType;
}

export interface MoveByAction extends BaseAction {
  type: ActionType.MOVE_BY;
  deltaX: number;
  deltaY: number;
  duration?: number;
  easeType?: EaseType;
}

export interface RotateToAction extends BaseAction {
  type: ActionType.ROTATE_TO;
  targetRotation: number;
  duration?: number;
  easeType?: EaseType;
}

export interface RotateByAction extends BaseAction {
  type: ActionType.ROTATE_BY;
  deltaRotation: number;
  duration?: number;
  easeType?: EaseType;
}

export interface ScaleToAction extends BaseAction {
  type: ActionType.SCALE_TO;
  targetScaleX: number;
  targetScaleY: number;
  duration?: number;
  easeType?: EaseType;
}

export interface SetVisibleAction extends BaseAction {
  type: ActionType.SET_VISIBLE;
  visible: boolean;
}

export interface SetModulateAction extends BaseAction {
  type: ActionType.SET_MODULATE;
  color: string;
  alpha: number;
}

export interface SetPropertyAction extends BaseAction {
  type: ActionType.SET_PROPERTY;
  propertyPath: string;
  value: string;
  valueType: PropertyValueType;
}

export interface TweenPropertyAction extends BaseAction {
  type: ActionType.TWEEN_PROPERTY;
  propertyPath: string;
  targetValue: string;
  duration: number;
  easeType: EaseType;
  transitionType: TransitionType;
}

export interface EmitSignalAction extends BaseAction {
  type: ActionType.EMIT_SIGNAL;
  signalName: string;
  parameters: ActionSignalParameter[];
}

export interface WaitAction extends BaseAction {
  type: ActionType.WAIT;
  duration: number;
  waitType: WaitType;
}

export interface ConditionAction extends BaseAction {
  type: ActionType.CONDITION;
  leftOperand: string;
  operator: ComparisonOperator;
  rightOperand: string;
  trueActions: string[]; // Action IDs
  falseActions: string[]; // Action IDs
}

export interface PrintAction extends BaseAction {
  type: ActionType.PRINT;
  message: string;
  includeNodeName: boolean;
}

export interface PlaySoundAction extends BaseAction {
  type: ActionType.PLAY_SOUND;
  soundPath: string;
  volume: number;
  pitch: number;
  loop: boolean;
}

export interface CustomCodeAction extends BaseAction {
  type: ActionType.CUSTOM_CODE;
  code: string;
}

// New Godot Action Interfaces

// Node2D Transform Actions
export interface TranslateAction extends BaseAction {
  type: ActionType.TRANSLATE;
  vector: { x: number; y: number };
}

export interface RotateAction extends BaseAction {
  type: ActionType.ROTATE;
  angle: number;
}

export interface LookAtAction extends BaseAction {
  type: ActionType.LOOK_AT;
  point: { x: number; y: number };
}

export interface GetAngleToAction extends BaseAction {
  type: ActionType.GET_ANGLE_TO;
  point: { x: number; y: number };
}

export interface ToLocalAction extends BaseAction {
  type: ActionType.TO_LOCAL;
  globalPoint: { x: number; y: number };
}

export interface ToGlobalAction extends BaseAction {
  type: ActionType.TO_GLOBAL;
  localPoint: { x: number; y: number };
}

// Node Core Actions
export interface AddChildAction extends BaseAction {
  type: ActionType.ADD_CHILD;
  childPath: string;
}

export interface RemoveChildAction extends BaseAction {
  type: ActionType.REMOVE_CHILD;
  childPath: string;
}

export interface GetNodeAction extends BaseAction {
  type: ActionType.GET_NODE;
  nodePath: string;
}

export interface SetProcessAction extends BaseAction {
  type: ActionType.SET_PROCESS;
  enabled: boolean;
}

export interface SetPhysicsProcessAction extends BaseAction {
  type: ActionType.SET_PHYSICS_PROCESS;
  enabled: boolean;
}

// Sprite2D Actions
export interface SetTextureAction extends BaseAction {
  type: ActionType.SET_TEXTURE;
  texturePath: string;
}

export interface SetRegionEnabledAction extends BaseAction {
  type: ActionType.SET_REGION_ENABLED;
  enabled: boolean;
}

export interface SetRegionRectAction extends BaseAction {
  type: ActionType.SET_REGION_RECT;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface SetFlipHAction extends BaseAction {
  type: ActionType.SET_FLIP_H;
  flip: boolean;
}

export interface SetFlipVAction extends BaseAction {
  type: ActionType.SET_FLIP_V;
  flip: boolean;
}

// AnimatedSprite2D Actions
export interface StopAnimationAction extends BaseAction {
  type: ActionType.STOP_ANIMATION;
}

export interface PauseAnimationAction extends BaseAction {
  type: ActionType.PAUSE_ANIMATION;
}

export interface SetAnimationAction extends BaseAction {
  type: ActionType.SET_ANIMATION;
  animationName: string;
}

export interface SetFrameAction extends BaseAction {
  type: ActionType.SET_FRAME;
  frame: number;
}

export interface SetSpeedScaleAction extends BaseAction {
  type: ActionType.SET_SPEED_SCALE;
  speedScale: number;
}

// RigidBody2D Actions
export interface ApplyImpulseAction extends BaseAction {
  type: ActionType.APPLY_IMPULSE;
  impulse: { x: number; y: number };
  position?: { x: number; y: number };
}

export interface ApplyForceAction extends BaseAction {
  type: ActionType.APPLY_FORCE;
  force: { x: number; y: number };
  position?: { x: number; y: number };
}

export interface SetGravityScaleAction extends BaseAction {
  type: ActionType.SET_GRAVITY_SCALE;
  scale: number;
}

export interface FreezeBodyAction extends BaseAction {
  type: ActionType.FREEZE_BODY;
}

export interface SetFreezeEnabledAction extends BaseAction {
  type: ActionType.SET_FREEZE_ENABLED;
  enabled: boolean;
}

export interface SetMassAction extends BaseAction {
  type: ActionType.SET_MASS;
  mass: number;
}

export interface SetLinearVelocityAction extends BaseAction {
  type: ActionType.SET_LINEAR_VELOCITY;
  velocity: { x: number; y: number };
}

export interface SetAngularVelocityAction extends BaseAction {
  type: ActionType.SET_ANGULAR_VELOCITY;
  velocity: number;
}

export interface SetLockRotationAction extends BaseAction {
  type: ActionType.SET_LOCK_ROTATION;
  locked: boolean;
}

// StaticBody2D Actions
export interface MoveAndCollideAction extends BaseAction {
  type: ActionType.MOVE_AND_COLLIDE;
  velocity: { x: number; y: number };
}

export interface SetConstantLinearVelocityAction extends BaseAction {
  type: ActionType.SET_CONSTANT_LINEAR_VELOCITY;
  velocity: { x: number; y: number };
}

export interface SetConstantAngularVelocityAction extends BaseAction {
  type: ActionType.SET_CONSTANT_ANGULAR_VELOCITY;
  velocity: number;
}

// Area2D Actions
export interface GetOverlappingBodiesAction extends BaseAction {
  type: ActionType.GET_OVERLAPPING_BODIES;
}

export interface GetOverlappingAreasAction extends BaseAction {
  type: ActionType.GET_OVERLAPPING_AREAS;
}

export interface OverlapsBodyAction extends BaseAction {
  type: ActionType.OVERLAPS_BODY;
  bodyPath: string;
}

export interface OverlapsAreaAction extends BaseAction {
  type: ActionType.OVERLAPS_AREA;
  areaPath: string;
}

export interface SetMonitoringAction extends BaseAction {
  type: ActionType.SET_MONITORING;
  enabled: boolean;
}

export interface SetMonitorableAction extends BaseAction {
  type: ActionType.SET_MONITORABLE;
  enabled: boolean;
}

export interface SetGravityAction extends BaseAction {
  type: ActionType.SET_GRAVITY;
  gravity: number;
}

export interface SetGravityVectorAction extends BaseAction {
  type: ActionType.SET_GRAVITY_VECTOR;
  vector: { x: number; y: number };
}

// CharacterBody2D Actions
export interface MoveAndSlideAction extends BaseAction {
  type: ActionType.MOVE_AND_SLIDE;
}

export interface IsOnFloorAction extends BaseAction {
  type: ActionType.IS_ON_FLOOR;
}

export interface IsOnCeilingAction extends BaseAction {
  type: ActionType.IS_ON_CEILING;
}

export interface IsOnWallAction extends BaseAction {
  type: ActionType.IS_ON_WALL;
}

export interface GetFloorNormalAction extends BaseAction {
  type: ActionType.GET_FLOOR_NORMAL;
}

export interface SetVelocityAction extends BaseAction {
  type: ActionType.SET_VELOCITY;
  velocity: { x: number; y: number };
}

export interface SetFloorMaxAngleAction extends BaseAction {
  type: ActionType.SET_FLOOR_MAX_ANGLE;
  angle: number;
}

export interface SetUpDirectionAction extends BaseAction {
  type: ActionType.SET_UP_DIRECTION;
  direction: { x: number; y: number };
}

// CollisionShape2D Actions
export interface SetShapeAction extends BaseAction {
  type: ActionType.SET_SHAPE;
  shapePath: string;
}

export interface SetCollisionDisabledAction extends BaseAction {
  type: ActionType.SET_COLLISION_DISABLED;
  disabled: boolean;
}

export interface SetOneWayCollisionAction extends BaseAction {
  type: ActionType.SET_ONE_WAY_COLLISION;
  enabled: boolean;
}

// CollisionPolygon2D Actions
export interface SetPolygonAction extends BaseAction {
  type: ActionType.SET_POLYGON;
  points: Array<{ x: number; y: number }>;
}

export interface SetBuildModeAction extends BaseAction {
  type: ActionType.SET_BUILD_MODE;
  mode: BuildMode;
}

export enum BuildMode {
  SOLIDS = "solids",
  SEGMENTS = "segments",
}

// Union type for all actions
export type Action =
  | MoveToAction
  | MoveByAction
  | RotateToAction
  | RotateByAction
  | ScaleToAction
  | SetVisibleAction
  | SetModulateAction
  | SetPropertyAction
  | TweenPropertyAction
  | EmitSignalAction
  | WaitAction
  | ConditionAction
  | PrintAction
  | PlaySoundAction
  | CustomCodeAction
  // New Godot Actions
  | TranslateAction
  | RotateAction
  | LookAtAction
  | GetAngleToAction
  | ToLocalAction
  | ToGlobalAction
  | AddChildAction
  | RemoveChildAction
  | GetNodeAction
  | SetProcessAction
  | SetPhysicsProcessAction
  | SetTextureAction
  | SetRegionEnabledAction
  | SetRegionRectAction
  | SetFlipHAction
  | SetFlipVAction
  | StopAnimationAction
  | PauseAnimationAction
  | SetAnimationAction
  | SetFrameAction
  | SetSpeedScaleAction
  | ApplyImpulseAction
  | ApplyForceAction
  | SetGravityScaleAction
  | FreezeBodyAction
  | SetFreezeEnabledAction
  | SetMassAction
  | SetLinearVelocityAction
  | SetAngularVelocityAction
  | SetLockRotationAction
  | MoveAndCollideAction
  | SetConstantLinearVelocityAction
  | SetConstantAngularVelocityAction
  | GetOverlappingBodiesAction
  | GetOverlappingAreasAction
  | OverlapsBodyAction
  | OverlapsAreaAction
  | SetMonitoringAction
  | SetMonitorableAction
  | SetGravityAction
  | SetGravityVectorAction
  | MoveAndSlideAction
  | IsOnFloorAction
  | IsOnCeilingAction
  | IsOnWallAction
  | GetFloorNormalAction
  | SetVelocityAction
  | SetFloorMaxAngleAction
  | SetUpDirectionAction
  | SetShapeAction
  | SetCollisionDisabledAction
  | SetOneWayCollisionAction
  | SetPolygonAction
  | SetBuildModeAction;

// Enums for options
export enum EaseType {
  LINEAR = "linear",
  EASE_IN = "ease_in",
  EASE_OUT = "ease_out",
  EASE_IN_OUT = "ease_in_out",
  EASE_OUT_IN = "ease_out_in",
}

export enum TransitionType {
  SINE = "sine",
  QUINT = "quint",
  QUART = "quart",
  QUAD = "quad",
  EXPO = "expo",
  ELASTIC = "elastic",
  CUBIC = "cubic",
  CIRC = "circ",
  BOUNCE = "bounce",
  BACK = "back",
}

export enum PropertyValueType {
  STRING = "string",
  NUMBER = "number",
  BOOLEAN = "boolean",
  VECTOR2 = "vector2",
  COLOR = "color",
}

export enum WaitType {
  SECONDS = "seconds",
  FRAMES = "frames",
  SIGNAL = "signal",
}

export enum ComparisonOperator {
  EQUALS = "==",
  NOT_EQUALS = "!=",
  GREATER = ">",
  LESS = "<",
  GREATER_EQUAL = ">=",
  LESS_EQUAL = "<=",
  AND = "and",
  OR = "or",
}

export interface ActionSignalParameter {
  name: string;
  value: string;
  type: PropertyValueType;
}

// Action Categories for UI organization
export const ACTION_CATEGORIES = {
  TRANSFORM: {
    name: "Transform (Node2D)",
    actions: [
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
    ],
  },
  NODE_CORE: {
    name: "Node Core",
    actions: [
      ActionType.ADD_CHILD,
      ActionType.REMOVE_CHILD,
      ActionType.QUEUE_FREE,
      ActionType.GET_NODE,
      ActionType.GET_PARENT,
      ActionType.GET_CHILDREN,
      ActionType.SET_PROCESS,
      ActionType.SET_PHYSICS_PROCESS,
    ],
  },
  SPRITE2D: {
    name: "Sprite2D",
    actions: [
      ActionType.SET_TEXTURE,
      ActionType.GET_TEXTURE,
      ActionType.SET_REGION_ENABLED,
      ActionType.SET_REGION_RECT,
      ActionType.SET_FLIP_H,
      ActionType.SET_FLIP_V,
    ],
  },
  ANIMATED_SPRITE: {
    name: "AnimatedSprite2D",
    actions: [
      ActionType.PLAY_ANIMATION,
      ActionType.STOP_ANIMATION,
      ActionType.PAUSE_ANIMATION,
      ActionType.SET_ANIMATION,
      ActionType.GET_ANIMATION,
      ActionType.SET_FRAME,
      ActionType.GET_FRAME,
      ActionType.SET_SPEED_SCALE,
    ],
  },
  RIGIDBODY2D: {
    name: "RigidBody2D",
    actions: [
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
  },
  STATICBODY2D: {
    name: "StaticBody2D",
    actions: [
      ActionType.MOVE_AND_COLLIDE,
      ActionType.SET_CONSTANT_LINEAR_VELOCITY,
      ActionType.SET_CONSTANT_ANGULAR_VELOCITY,
    ],
  },
  AREA2D: {
    name: "Area2D",
    actions: [
      ActionType.GET_OVERLAPPING_BODIES,
      ActionType.GET_OVERLAPPING_AREAS,
      ActionType.OVERLAPS_BODY,
      ActionType.OVERLAPS_AREA,
      ActionType.SET_MONITORING,
      ActionType.SET_MONITORABLE,
      ActionType.SET_GRAVITY,
      ActionType.SET_GRAVITY_VECTOR,
    ],
  },
  CHARACTERBODY2D: {
    name: "CharacterBody2D",
    actions: [
      ActionType.MOVE_AND_SLIDE,
      ActionType.IS_ON_FLOOR,
      ActionType.IS_ON_CEILING,
      ActionType.IS_ON_WALL,
      ActionType.GET_FLOOR_NORMAL,
      ActionType.SET_VELOCITY,
      ActionType.SET_FLOOR_MAX_ANGLE,
      ActionType.SET_UP_DIRECTION,
    ],
  },
  COLLISION: {
    name: "Collision",
    actions: [
      ActionType.SET_SHAPE,
      ActionType.GET_SHAPE,
      ActionType.SET_COLLISION_DISABLED,
      ActionType.SET_ONE_WAY_COLLISION,
      ActionType.SET_POLYGON,
      ActionType.GET_POLYGON,
      ActionType.SET_BUILD_MODE,
    ],
  },
  PROPERTIES: {
    name: "Properties",
    actions: [
      ActionType.SET_VISIBLE,
      ActionType.SET_MODULATE,
      ActionType.SET_PROPERTY,
    ],
  },
  ANIMATION: {
    name: "Animation & Tweens",
    actions: [ActionType.TWEEN_PROPERTY],
  },
  SIGNALS: {
    name: "Signals",
    actions: [ActionType.EMIT_SIGNAL, ActionType.CONNECT_SIGNAL],
  },
  FLOW_CONTROL: {
    name: "Flow Control",
    actions: [ActionType.WAIT, ActionType.CONDITION, ActionType.LOOP],
  },
  SCENE: {
    name: "Scene Management",
    actions: [ActionType.CHANGE_SCENE, ActionType.INSTANTIATE_SCENE],
  },
  AUDIO: {
    name: "Audio",
    actions: [ActionType.PLAY_SOUND, ActionType.STOP_SOUND],
  },
  INPUT: {
    name: "Input",
    actions: [ActionType.CHECK_INPUT],
  },
  DEBUG: {
    name: "Debug",
    actions: [ActionType.PRINT],
  },
  ADVANCED: {
    name: "Advanced",
    actions: [ActionType.CUSTOM_CODE],
  },
};
