// Action Types for Visual Scripting System

export interface BaseAction {
  id: string;
  name: string;
  type: ActionType;
  enabled: boolean;
}

export enum ActionType {
  // Transform Actions
  MOVE_TO = 'move_to',
  MOVE_BY = 'move_by',
  ROTATE_TO = 'rotate_to',
  ROTATE_BY = 'rotate_by',
  SCALE_TO = 'scale_to',
  SCALE_BY = 'scale_by',
  
  // Property Actions
  SET_VISIBLE = 'set_visible',
  SET_MODULATE = 'set_modulate',
  SET_PROPERTY = 'set_property',
  
  // Animation Actions
  TWEEN_PROPERTY = 'tween_property',
  PLAY_ANIMATION = 'play_animation',
  
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
  QUEUE_FREE = 'queue_free',
  
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
  parameters: SignalParameter[];
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
  | CustomCodeAction;

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

export interface SignalParameter {
  name: string;
  value: string;
  type: PropertyValueType;
}

// Action Categories for UI organization
export const ACTION_CATEGORIES = {
  TRANSFORM: {
    name: 'Transform',
    actions: [ActionType.MOVE_TO, ActionType.MOVE_BY, ActionType.ROTATE_TO, ActionType.ROTATE_BY, ActionType.SCALE_TO, ActionType.SCALE_BY]
  },
  PROPERTIES: {
    name: 'Properties',
    actions: [ActionType.SET_VISIBLE, ActionType.SET_MODULATE, ActionType.SET_PROPERTY]
  },
  ANIMATION: {
    name: 'Animation',
    actions: [ActionType.TWEEN_PROPERTY, ActionType.PLAY_ANIMATION]
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
    name: 'Scene',
    actions: [ActionType.CHANGE_SCENE, ActionType.INSTANTIATE_SCENE, ActionType.QUEUE_FREE]
  },
  AUDIO: {
    name: 'Audio',
    actions: [ActionType.PLAY_SOUND, ActionType.STOP_SOUND]
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
