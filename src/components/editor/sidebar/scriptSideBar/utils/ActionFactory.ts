import { 
  Action, 
  ActionType, 
  MoveToAction, 
  MoveByAction, 
  RotateToAction,
  RotateByAction,
  ScaleToAction,
  SetVisibleAction,
  SetModulateAction,
  TweenPropertyAction,
  WaitAction,
  PrintAction,
  PlaySoundAction,
  CustomCodeAction,
  EaseType,
  TransitionType,
  WaitType
} from "../types/ActionTypes";

export class ActionFactory {
  static createAction(type: ActionType, name: string): Action {
    const baseAction = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name,
      type,
      enabled: true
    };

    switch (type) {
      case ActionType.MOVE_TO:
        return {
          ...baseAction,
          type: ActionType.MOVE_TO,
          targetX: 0,
          targetY: 0,
          duration: 1,
          easeType: EaseType.LINEAR
        } as MoveToAction;

      case ActionType.MOVE_BY:
        return {
          ...baseAction,
          type: ActionType.MOVE_BY,
          deltaX: 10,
          deltaY: 0,
          duration: 1,
          easeType: EaseType.LINEAR
        } as MoveByAction;

      case ActionType.ROTATE_TO:
        return {
          ...baseAction,
          type: ActionType.ROTATE_TO,
          targetRotation: 0,
          duration: 1,
          easeType: EaseType.LINEAR
        } as RotateToAction;

      case ActionType.ROTATE_BY:
        return {
          ...baseAction,
          type: ActionType.ROTATE_BY,
          deltaRotation: 90,
          duration: 1,
          easeType: EaseType.LINEAR
        } as RotateByAction;

      case ActionType.SCALE_TO:
        return {
          ...baseAction,
          type: ActionType.SCALE_TO,
          targetScaleX: 1,
          targetScaleY: 1,
          duration: 1,
          easeType: EaseType.LINEAR
        } as ScaleToAction;

      case ActionType.SET_VISIBLE:
        return {
          ...baseAction,
          type: ActionType.SET_VISIBLE,
          visible: true
        } as SetVisibleAction;

      case ActionType.SET_MODULATE:
        return {
          ...baseAction,
          type: ActionType.SET_MODULATE,
          color: "#ffffff",
          alpha: 1
        } as SetModulateAction;

      case ActionType.TWEEN_PROPERTY:
        return {
          ...baseAction,
          type: ActionType.TWEEN_PROPERTY,
          propertyPath: "position",
          targetValue: "Vector2(100, 100)",
          duration: 1,
          easeType: EaseType.LINEAR,
          transitionType: TransitionType.SINE
        } as TweenPropertyAction;

      case ActionType.WAIT:
        return {
          ...baseAction,
          type: ActionType.WAIT,
          duration: 1,
          waitType: WaitType.SECONDS
        } as WaitAction;

      case ActionType.PRINT:
        return {
          ...baseAction,
          type: ActionType.PRINT,
          message: "Debug message",
          includeNodeName: true
        } as PrintAction;

      case ActionType.PLAY_SOUND:
        return {
          ...baseAction,
          type: ActionType.PLAY_SOUND,
          soundPath: "res://audio/sound.ogg",
          volume: 1,
          pitch: 1,
          loop: false
        } as PlaySoundAction;

      case ActionType.CUSTOM_CODE:
        return {
          ...baseAction,
          type: ActionType.CUSTOM_CODE,
          code: "# Custom GDScript code\nprint('Hello World')"
        } as CustomCodeAction;

      default:
        throw new Error(`Unknown action type: ${type}`);
    }
  }

  static getActionDisplayName(type: ActionType): string {
    const displayNames: Record<ActionType, string> = {
      [ActionType.MOVE_TO]: "Move To Position",
      [ActionType.MOVE_BY]: "Move By Offset",
      [ActionType.ROTATE_TO]: "Rotate To Angle",
      [ActionType.ROTATE_BY]: "Rotate By Angle",
      [ActionType.SCALE_TO]: "Scale To Size",
      [ActionType.SCALE_BY]: "Scale By Factor",
      [ActionType.SET_VISIBLE]: "Set Visibility",
      [ActionType.SET_MODULATE]: "Set Color/Alpha",
      [ActionType.SET_PROPERTY]: "Set Property",
      [ActionType.TWEEN_PROPERTY]: "Tween Property",
      [ActionType.PLAY_ANIMATION]: "Play Animation",
      [ActionType.EMIT_SIGNAL]: "Emit Signal",
      [ActionType.CONNECT_SIGNAL]: "Connect Signal",
      [ActionType.WAIT]: "Wait",
      [ActionType.CONDITION]: "If Condition",
      [ActionType.LOOP]: "Loop",
      [ActionType.CHANGE_SCENE]: "Change Scene",
      [ActionType.INSTANTIATE_SCENE]: "Instantiate Scene",
      [ActionType.QUEUE_FREE]: "Delete Node",
      [ActionType.PLAY_SOUND]: "Play Sound",
      [ActionType.STOP_SOUND]: "Stop Sound",
      [ActionType.CHECK_INPUT]: "Check Input",
      [ActionType.PRINT]: "Print Debug",
      [ActionType.CUSTOM_CODE]: "Custom Code"
    };

    return displayNames[type] || type;
  }

  static getActionDescription(type: ActionType): string {
    const descriptions: Record<ActionType, string> = {
      [ActionType.MOVE_TO]: "Move node to specific coordinates",
      [ActionType.MOVE_BY]: "Move node by relative offset",
      [ActionType.ROTATE_TO]: "Rotate node to specific angle",
      [ActionType.ROTATE_BY]: "Rotate node by relative angle",
      [ActionType.SCALE_TO]: "Scale node to specific size",
      [ActionType.SCALE_BY]: "Scale node by relative factor",
      [ActionType.SET_VISIBLE]: "Show or hide the node",
      [ActionType.SET_MODULATE]: "Change node color and transparency",
      [ActionType.SET_PROPERTY]: "Set any node property",
      [ActionType.TWEEN_PROPERTY]: "Smoothly animate any property",
      [ActionType.PLAY_ANIMATION]: "Play animation from AnimationPlayer",
      [ActionType.EMIT_SIGNAL]: "Send signal to other nodes",
      [ActionType.CONNECT_SIGNAL]: "Connect to another node's signal",
      [ActionType.WAIT]: "Pause execution for specified time",
      [ActionType.CONDITION]: "Execute actions based on condition",
      [ActionType.LOOP]: "Repeat actions multiple times",
      [ActionType.CHANGE_SCENE]: "Switch to different scene",
      [ActionType.INSTANTIATE_SCENE]: "Create instance of scene",
      [ActionType.QUEUE_FREE]: "Remove node from scene",
      [ActionType.PLAY_SOUND]: "Play audio file",
      [ActionType.STOP_SOUND]: "Stop playing audio",
      [ActionType.CHECK_INPUT]: "Check for user input",
      [ActionType.PRINT]: "Output debug message to console",
      [ActionType.CUSTOM_CODE]: "Write custom GDScript code"
    };

    return descriptions[type] || "Custom action";
  }
}
