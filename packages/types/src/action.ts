// Action Types for Visual Scripting System

export interface BaseAction {
  id: string;
  name: string;
  type: ActionType;
  enabled: boolean;
}

export enum ActionType {
  // Transform Actions (Node2D)
  MOVE_TO = 'move_to',
  MOVE_BY = 'move_by',
  TRANSLATE = 'translate',
  ROTATE_TO = 'rotate_to',
  ROTATE_BY = 'rotate_by',
  ROTATE = 'rotate',
  SCALE_TO = 'scale_to',
  SCALE_BY = 'scale_by',
  LOOK_AT = 'look_at',
  GET_ANGLE_TO = 'get_angle_to',
  TO_LOCAL = 'to_local',
  TO_GLOBAL = 'to_global',
  
  // Node Core Functions
  ADD_CHILD = 'add_child',
  REMOVE_CHILD = 'remove_child',
  QUEUE_FREE = 'queue_free',
  GET_NODE = 'get_node',
  GET_PARENT = 'get_parent',
  GET_CHILDREN = 'get_children',
  SET_PROCESS = 'set_process',
  SET_PHYSICS_PROCESS = 'set_physics_process',
  
  // Sprite2D Actions
  SET_TEXTURE = 'set_texture',
  GET_TEXTURE = 'get_texture',
  SET_REGION_ENABLED = 'set_region_enabled',
  SET_REGION_RECT = 'set_region_rect',
  SET_FLIP_H = 'set_flip_h',
  SET_FLIP_V = 'set_flip_v',
  
  // AnimatedSprite2D Actions
  PLAY_ANIMATION = 'play_animation',
  STOP_ANIMATION = 'stop_animation',
  PAUSE_ANIMATION = 'pause_animation',
  SET_ANIMATION = 'set_animation',
  GET_ANIMATION = 'get_animation',
  SET_FRAME = 'set_frame',
  GET_FRAME = 'get_frame',
  SET_SPEED_SCALE = 'set_speed_scale',
  
  // RigidBody2D Actions
  APPLY_IMPULSE = 'apply_impulse',
  APPLY_FORCE = 'apply_force',
  SET_GRAVITY_SCALE = 'set_gravity_scale',
  FREEZE_BODY = 'freeze_body',
  SET_FREEZE_ENABLED = 'set_freeze_enabled',
  SET_MASS = 'set_mass',
  SET_LINEAR_VELOCITY = 'set_linear_velocity',
  SET_ANGULAR_VELOCITY = 'set_angular_velocity',
  SET_LOCK_ROTATION = 'set_lock_rotation',
  
  // StaticBody2D Actions
  MOVE_AND_COLLIDE = 'move_and_collide',
  SET_CONSTANT_LINEAR_VELOCITY = 'set_constant_linear_velocity',
  SET_CONSTANT_ANGULAR_VELOCITY = 'set_constant_angular_velocity',
  
  // Area2D Actions
  GET_OVERLAPPING_BODIES = 'get_overlapping_bodies',
  GET_OVERLAPPING_AREAS = 'get_overlapping_areas',
  OVERLAPS_BODY = 'overlaps_body',
  OVERLAPS_AREA = 'overlaps_area',
  SET_MONITORING = 'set_monitoring',
  SET_MONITORABLE = 'set_monitorable',
  SET_GRAVITY = 'set_gravity',
  SET_GRAVITY_VECTOR = 'set_gravity_vector',
  
  // CharacterBody2D Actions
  MOVE_AND_SLIDE = 'move_and_slide',
  IS_ON_FLOOR = 'is_on_floor',
  IS_ON_CEILING = 'is_on_ceiling',
  IS_ON_WALL = 'is_on_wall',
  GET_FLOOR_NORMAL = 'get_floor_normal',
  SET_VELOCITY = 'set_velocity',
  SET_FLOOR_MAX_ANGLE = 'set_floor_max_angle',
  SET_UP_DIRECTION = 'set_up_direction',
  
  // CollisionShape2D Actions
  SET_SHAPE = 'set_shape',
  GET_SHAPE = 'get_shape',
  SET_COLLISION_DISABLED = 'set_collision_disabled',
  SET_ONE_WAY_COLLISION = 'set_one_way_collision',
  
  // CollisionPolygon2D Actions
  SET_POLYGON = 'set_polygon',
  GET_POLYGON = 'get_polygon',
  SET_BUILD_MODE = 'set_build_mode',
  
  // Property Actions
  SET_VISIBLE = 'set_visible',
  SET_MODULATE = 'set_modulate',
  SET_PROPERTY = 'set_property',
  
  // Animation Actions
  TWEEN_PROPERTY = 'tween_property',
  
  // Signal Actions
  EMIT_SIGNAL = 'emit_signal',
  CONNECT_SIGNAL = 'connect_signal',
  
  // Flow Control
  WAIT = 'wait',
  CONDITION = 'condition',
  LOOP = 'loop',
  
  // Scene Actions
  CHANGE_SCENE = 'change_scene',
  INSTANTIATE_SCENE = 'instantiate_scene',
  
  // Audio Actions
  PLAY_SOUND = 'play_sound',
  STOP_SOUND = 'stop_sound',
  
  // Input Actions
  CHECK_INPUT = 'check_input',
  
  // Debug Actions
  PRINT = 'print',
  
  // Advanced
  CUSTOM_CODE = 'custom_code'
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
  SOLIDS = 'solids',
  SEGMENTS = 'segments'
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
  LINEAR = 'linear',
  EASE_IN = 'ease_in',
  EASE_OUT = 'ease_out',
  EASE_IN_OUT = 'ease_in_out',
  EASE_OUT_IN = 'ease_out_in'
}

export enum TransitionType {
  SINE = 'sine',
  QUINT = 'quint',
  QUART = 'quart',
  QUAD = 'quad',
  EXPO = 'expo',
  ELASTIC = 'elastic',
  CUBIC = 'cubic',
  CIRC = 'circ',
  BOUNCE = 'bounce',
  BACK = 'back'
}

export enum PropertyValueType {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  VECTOR2 = 'vector2',
  COLOR = 'color'
}

export enum WaitType {
  SECONDS = 'seconds',
  FRAMES = 'frames',
  SIGNAL = 'signal'
}

export enum ComparisonOperator {
  EQUALS = '==',
  NOT_EQUALS = '!=',
  GREATER = '>',
  LESS = '<',
  GREATER_EQUAL = '>=',
  LESS_EQUAL = '<=',
  AND = 'and',
  OR = 'or'
}

export interface ActionSignalParameter {
  name: string;
  value: string;
  type: PropertyValueType;
}

// Action Categories for UI organization
export const ACTION_CATEGORIES = {
  TRANSFORM: {
    name: 'Transform (Node2D)',
    actions: [
      ActionType.MOVE_TO, ActionType.MOVE_BY, ActionType.TRANSLATE,
      ActionType.ROTATE_TO, ActionType.ROTATE_BY, ActionType.ROTATE,
      ActionType.SCALE_TO, ActionType.SCALE_BY,
      ActionType.LOOK_AT, ActionType.GET_ANGLE_TO,
      ActionType.TO_LOCAL, ActionType.TO_GLOBAL
    ]
  },
  NODE_CORE: {
    name: 'Node Core',
    actions: [
      ActionType.ADD_CHILD, ActionType.REMOVE_CHILD, ActionType.QUEUE_FREE,
      ActionType.GET_NODE, ActionType.GET_PARENT, ActionType.GET_CHILDREN,
      ActionType.SET_PROCESS, ActionType.SET_PHYSICS_PROCESS
    ]
  },
  SPRITE2D: {
    name: 'Sprite2D',
    actions: [
      ActionType.SET_TEXTURE, ActionType.GET_TEXTURE,
      ActionType.SET_REGION_ENABLED, ActionType.SET_REGION_RECT,
      ActionType.SET_FLIP_H, ActionType.SET_FLIP_V
    ]
  },
  ANIMATED_SPRITE: {
    name: 'AnimatedSprite2D',
    actions: [
      ActionType.PLAY_ANIMATION, ActionType.STOP_ANIMATION, ActionType.PAUSE_ANIMATION,
      ActionType.SET_ANIMATION, ActionType.GET_ANIMATION,
      ActionType.SET_FRAME, ActionType.GET_FRAME, ActionType.SET_SPEED_SCALE
    ]
  },
  RIGIDBODY2D: {
    name: 'RigidBody2D',
    actions: [
      ActionType.APPLY_IMPULSE, ActionType.APPLY_FORCE,
      ActionType.SET_GRAVITY_SCALE, ActionType.FREEZE_BODY, ActionType.SET_FREEZE_ENABLED,
      ActionType.SET_MASS, ActionType.SET_LINEAR_VELOCITY, ActionType.SET_ANGULAR_VELOCITY,
      ActionType.SET_LOCK_ROTATION
    ]
  },
  STATICBODY2D: {
    name: 'StaticBody2D',
    actions: [
      ActionType.MOVE_AND_COLLIDE,
      ActionType.SET_CONSTANT_LINEAR_VELOCITY, ActionType.SET_CONSTANT_ANGULAR_VELOCITY
    ]
  },
  AREA2D: {
    name: 'Area2D',
    actions: [
      ActionType.GET_OVERLAPPING_BODIES, ActionType.GET_OVERLAPPING_AREAS,
      ActionType.OVERLAPS_BODY, ActionType.OVERLAPS_AREA,
      ActionType.SET_MONITORING, ActionType.SET_MONITORABLE,
      ActionType.SET_GRAVITY, ActionType.SET_GRAVITY_VECTOR
    ]
  },
  CHARACTERBODY2D: {
    name: 'CharacterBody2D',
    actions: [
      ActionType.MOVE_AND_SLIDE, ActionType.IS_ON_FLOOR, ActionType.IS_ON_CEILING,
      ActionType.IS_ON_WALL, ActionType.GET_FLOOR_NORMAL,
      ActionType.SET_VELOCITY, ActionType.SET_FLOOR_MAX_ANGLE, ActionType.SET_UP_DIRECTION
    ]
  },
  COLLISION: {
    name: 'Collision',
    actions: [
      ActionType.SET_SHAPE, ActionType.GET_SHAPE,
      ActionType.SET_COLLISION_DISABLED, ActionType.SET_ONE_WAY_COLLISION,
      ActionType.SET_POLYGON, ActionType.GET_POLYGON, ActionType.SET_BUILD_MODE
    ]
  },
  PROPERTIES: {
    name: 'Properties',
    actions: [ActionType.SET_VISIBLE, ActionType.SET_MODULATE, ActionType.SET_PROPERTY]
  },
  ANIMATION: {
    name: 'Animation & Tweens',
    actions: [ActionType.TWEEN_PROPERTY]
  },
  SIGNALS: {
    name: 'Signals',
    actions: [ActionType.EMIT_SIGNAL, ActionType.CONNECT_SIGNAL]
  },
  FLOW_CONTROL: {
    name: 'Flow Control',
    actions: [ActionType.WAIT, ActionType.CONDITION, ActionType.LOOP]
  },
  SCENE: {
    name: 'Scene Management',
    actions: [ActionType.CHANGE_SCENE, ActionType.INSTANTIATE_SCENE]
  },
  AUDIO: {
    name: 'Audio',
    actions: [ActionType.PLAY_SOUND, ActionType.STOP_SOUND]
  },
  INPUT: {
    name: 'Input',
    actions: [ActionType.CHECK_INPUT]
  },
  DEBUG: {
    name: 'Debug',
    actions: [ActionType.PRINT]
  },
  ADVANCED: {
    name: 'Advanced',
    actions: [ActionType.CUSTOM_CODE]
  }
};
