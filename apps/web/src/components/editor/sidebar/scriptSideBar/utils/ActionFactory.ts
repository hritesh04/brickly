import { ActionType, EaseType, TransitionType, WaitType, BuildMode } from "@prisma/client";
import { action } from "@/actions/action/schema";

export class ActionFactory {
  static createAction(type: ActionType, name: string): action {
    const baseAction = {
      id: Date.now() + Math.floor(Math.random() * 1000), // Generate a unique number ID
      name,
      type,
      enabled: true,
      order: 0,
      parameters: {},
      scriptID: 0, // Will be set when creating the action
      triggerID: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Set default parameters based on action type
    switch (type) {
      case ActionType.MOVE_TO:
        return {
          ...baseAction,
          parameters: {
            targetX: 0,
            targetY: 0,
            duration: 1,
            easeType: EaseType.LINEAR
          }
        };

      case ActionType.MOVE_BY:
        return {
          ...baseAction,
          parameters: {
            deltaX: 10,
            deltaY: 0,
            duration: 1,
            easeType: EaseType.LINEAR
          }
        };

      case ActionType.ROTATE_TO:
        return {
          ...baseAction,
          parameters: {
            targetRotation: 0,
            duration: 1,
            easeType: EaseType.LINEAR
          }
        };

      case ActionType.ROTATE_BY:
        return {
          ...baseAction,
          parameters: {
            deltaRotation: 90,
            duration: 1,
            easeType: EaseType.LINEAR
          }
        };

      case ActionType.SCALE_TO:
        return {
          ...baseAction,
          parameters: {
            targetScaleX: 1,
            targetScaleY: 1,
            duration: 1,
            easeType: EaseType.LINEAR
          }
        };

      case ActionType.SET_VISIBLE:
        return {
          ...baseAction,
          parameters: {
            visible: true
          }
        };

      case ActionType.SET_MODULATE:
        return {
          ...baseAction,
          parameters: {
            color: "#ffffff",
            alpha: 1
          }
        };

      case ActionType.TWEEN_PROPERTY:
        return {
          ...baseAction,
          parameters: {
            property: "position",
            targetValue: { x: 0, y: 0 },
            duration: 1,
            easeType: EaseType.LINEAR
          }
        };

      case ActionType.EMIT_SIGNAL:
        return {
          ...baseAction,
          parameters: {
            signalName: "custom_signal",
            args: []
          }
        };

      case ActionType.WAIT:
        return {
          ...baseAction,
          parameters: {
            duration: 1,
            waitType: WaitType.SECONDS
          }
        };

      case ActionType.CONDITION:
        return {
          ...baseAction,
          parameters: {
            leftOperand: "true",
            operator: "==",
            rightOperand: "true",
            trueActions: [],
            falseActions: []
          }
        };

      case ActionType.PRINT:
        return {
          ...baseAction,
          parameters: {
            message: "Hello World",
            includeNodeName: false
          }
        };

      case ActionType.PLAY_SOUND:
        return {
          ...baseAction,
          parameters: {
            soundPath: "res://sounds/click.wav",
            volume: 1.0,
            pitch: 1.0
          }
        };

      case ActionType.CUSTOM_CODE:
        return {
          ...baseAction,
          parameters: {
            code: "// Custom GDScript code here"
          }
        };

      // Add more cases as needed for other action types
      default:
        return {
          ...baseAction,
          parameters: {}
        };
    }
  }

  static getActionDisplayName(type: ActionType): string {
    const displayNames: Record<ActionType, string> = {
      [ActionType.MOVE_TO]: "Move To Position",
      [ActionType.MOVE_BY]: "Move By Offset",
      [ActionType.TRANSLATE]: "Translate",
      [ActionType.ROTATE_TO]: "Rotate To Angle",
      [ActionType.ROTATE_BY]: "Rotate By Angle",
      [ActionType.ROTATE]: "Rotate",
      [ActionType.SCALE_TO]: "Scale To Size",
      [ActionType.SCALE_BY]: "Scale By Factor",
      [ActionType.LOOK_AT]: "Look At Point",
      [ActionType.GET_ANGLE_TO]: "Get Angle To Point",
      [ActionType.TO_LOCAL]: "To Local Coordinates",
      [ActionType.TO_GLOBAL]: "To Global Coordinates",
      [ActionType.ADD_CHILD]: "Add Child Node",
      [ActionType.REMOVE_CHILD]: "Remove Child Node",
      [ActionType.QUEUE_FREE]: "Delete Node",
      [ActionType.GET_NODE]: "Get Node Reference",
      [ActionType.GET_PARENT]: "Get Parent Node",
      [ActionType.GET_CHILDREN]: "Get Child Nodes",
      [ActionType.SET_PROCESS]: "Set Process Enabled",
      [ActionType.SET_PHYSICS_PROCESS]: "Set Physics Process",
      [ActionType.SET_TEXTURE]: "Set Texture",
      [ActionType.GET_TEXTURE]: "Get Texture",
      [ActionType.SET_REGION_ENABLED]: "Set Region Enabled",
      [ActionType.SET_REGION_RECT]: "Set Region Rectangle",
      [ActionType.SET_FLIP_H]: "Set Horizontal Flip",
      [ActionType.SET_FLIP_V]: "Set Vertical Flip",
      [ActionType.PLAY_ANIMATION]: "Play Animation",
      [ActionType.STOP_ANIMATION]: "Stop Animation",
      [ActionType.PAUSE_ANIMATION]: "Pause Animation",
      [ActionType.SET_ANIMATION]: "Set Animation",
      [ActionType.GET_ANIMATION]: "Get Animation",
      [ActionType.SET_FRAME]: "Set Frame",
      [ActionType.GET_FRAME]: "Get Frame",
      [ActionType.SET_SPEED_SCALE]: "Set Speed Scale",
      [ActionType.APPLY_IMPULSE]: "Apply Impulse",
      [ActionType.APPLY_FORCE]: "Apply Force",
      [ActionType.SET_GRAVITY_SCALE]: "Set Gravity Scale",
      [ActionType.FREEZE_BODY]: "Freeze Body",
      [ActionType.SET_FREEZE_ENABLED]: "Set Freeze Enabled",
      [ActionType.SET_MASS]: "Set Mass",
      [ActionType.SET_LINEAR_VELOCITY]: "Set Linear Velocity",
      [ActionType.SET_ANGULAR_VELOCITY]: "Set Angular Velocity",
      [ActionType.SET_LOCK_ROTATION]: "Set Lock Rotation",
      [ActionType.MOVE_AND_COLLIDE]: "Move And Collide",
      [ActionType.SET_CONSTANT_LINEAR_VELOCITY]: "Set Constant Linear Velocity",
      [ActionType.SET_CONSTANT_ANGULAR_VELOCITY]: "Set Constant Angular Velocity",
      [ActionType.GET_OVERLAPPING_BODIES]: "Get Overlapping Bodies",
      [ActionType.GET_OVERLAPPING_AREAS]: "Get Overlapping Areas",
      [ActionType.OVERLAPS_BODY]: "Check Body Overlap",
      [ActionType.OVERLAPS_AREA]: "Check Area Overlap",
      [ActionType.SET_MONITORING]: "Set Monitoring",
      [ActionType.SET_MONITORABLE]: "Set Monitorable",
      [ActionType.SET_GRAVITY]: "Set Area Gravity",
      [ActionType.SET_GRAVITY_VECTOR]: "Set Gravity Vector",
      [ActionType.MOVE_AND_SLIDE]: "Move And Slide",
      [ActionType.IS_ON_FLOOR]: "Is On Floor",
      [ActionType.IS_ON_CEILING]: "Is On Ceiling",
      [ActionType.IS_ON_WALL]: "Is On Wall",
      [ActionType.GET_FLOOR_NORMAL]: "Get Floor Normal",
      [ActionType.SET_VELOCITY]: "Set Velocity",
      [ActionType.SET_FLOOR_MAX_ANGLE]: "Set Floor Max Angle",
      [ActionType.SET_UP_DIRECTION]: "Set Up Direction",
      [ActionType.SET_SHAPE]: "Set Collision Shape",
      [ActionType.SET_COLLISION_DISABLED]: "Set Collision Disabled",
      [ActionType.SET_ONE_WAY_COLLISION]: "Set One Way Collision",
      [ActionType.SET_POLYGON]: "Set Polygon Points",
      [ActionType.SET_BUILD_MODE]: "Set Build Mode",
      [ActionType.SET_VISIBLE]: "Set Visibility",
      [ActionType.SET_MODULATE]: "Set Color/Alpha",
      [ActionType.SET_PROPERTY]: "Set Property",
      [ActionType.TWEEN_PROPERTY]: "Tween Property",
      [ActionType.EMIT_SIGNAL]: "Emit Signal",
      [ActionType.CONNECT_SIGNAL]: "Connect Signal",
      [ActionType.WAIT]: "Wait",
      [ActionType.CONDITION]: "If Condition",
      [ActionType.LOOP]: "Loop",
      [ActionType.PRINT]: "Print Debug",
      [ActionType.PLAY_SOUND]: "Play Sound",
      [ActionType.STOP_SOUND]: "Stop Sound",
      [ActionType.CUSTOM_CODE]: "Custom Code"
    };

    return displayNames[type] || type;
  }

  static getActionDescription(type: ActionType): string {
    const descriptions: Record<ActionType, string> = {
      [ActionType.MOVE_TO]: "Move node to specific coordinates",
      [ActionType.MOVE_BY]: "Move node by relative offset",
      [ActionType.TRANSLATE]: "Move by offset vector",
      [ActionType.ROTATE_TO]: "Rotate node to specific angle",
      [ActionType.ROTATE_BY]: "Rotate node by relative angle",
      [ActionType.ROTATE]: "Rotate by angle in radians",
      [ActionType.SCALE_TO]: "Scale node to specific size",
      [ActionType.SCALE_BY]: "Scale node by relative factor",
      [ActionType.LOOK_AT]: "Face towards a point",
      [ActionType.GET_ANGLE_TO]: "Get angle to target point",
      [ActionType.TO_LOCAL]: "Convert global to local coordinates",
      [ActionType.TO_GLOBAL]: "Convert local to global coordinates",
      [ActionType.ADD_CHILD]: "Add a child node",
      [ActionType.REMOVE_CHILD]: "Remove a child node",
      [ActionType.QUEUE_FREE]: "Delete node safely at end of frame",
      [ActionType.GET_NODE]: "Get reference to other nodes",
      [ActionType.GET_PARENT]: "Get parent node",
      [ActionType.GET_CHILDREN]: "Get array of child nodes",
      [ActionType.SET_PROCESS]: "Enable/disable _process()",
      [ActionType.SET_PHYSICS_PROCESS]: "Enable/disable _physics_process()",
      [ActionType.SET_TEXTURE]: "Set sprite texture",
      [ActionType.GET_TEXTURE]: "Get current texture",
      [ActionType.SET_REGION_ENABLED]: "Enable texture region",
      [ActionType.SET_REGION_RECT]: "Set texture region area",
      [ActionType.SET_FLIP_H]: "Horizontal flip",
      [ActionType.SET_FLIP_V]: "Vertical flip",
      [ActionType.PLAY_ANIMATION]: "Play specific animation",
      [ActionType.STOP_ANIMATION]: "Stop current animation",
      [ActionType.PAUSE_ANIMATION]: "Pause animation",
      [ActionType.SET_ANIMATION]: "Set current animation",
      [ActionType.GET_ANIMATION]: "Get current animation name",
      [ActionType.SET_FRAME]: "Set current frame",
      [ActionType.GET_FRAME]: "Get current frame number",
      [ActionType.SET_SPEED_SCALE]: "Animation speed multiplier",
      [ActionType.APPLY_IMPULSE]: "Apply instant force",
      [ActionType.APPLY_FORCE]: "Apply continuous force",
      [ActionType.SET_GRAVITY_SCALE]: "Set gravity influence",
      [ActionType.FREEZE_BODY]: "Stop all movement",
      [ActionType.SET_FREEZE_ENABLED]: "Enable/disable freezing",
      [ActionType.SET_MASS]: "Body mass",
      [ActionType.SET_LINEAR_VELOCITY]: "Current velocity",
      [ActionType.SET_ANGULAR_VELOCITY]: "Rotational velocity",
      [ActionType.SET_LOCK_ROTATION]: "Prevent rotation",
      [ActionType.MOVE_AND_COLLIDE]: "Move with collision detection",
      [ActionType.SET_CONSTANT_LINEAR_VELOCITY]: "Constant movement",
      [ActionType.SET_CONSTANT_ANGULAR_VELOCITY]: "Constant rotation",
      [ActionType.GET_OVERLAPPING_BODIES]: "Get all overlapping bodies",
      [ActionType.GET_OVERLAPPING_AREAS]: "Get all overlapping areas",
      [ActionType.OVERLAPS_BODY]: "Check if body is overlapping",
      [ActionType.OVERLAPS_AREA]: "Check if area is overlapping",
      [ActionType.SET_MONITORING]: "Enable detection",
      [ActionType.SET_MONITORABLE]: "Can be detected by others",
      [ActionType.SET_GRAVITY]: "Area gravity strength",
      [ActionType.SET_GRAVITY_VECTOR]: "Gravity direction",
      [ActionType.MOVE_AND_SLIDE]: "Move with collision handling",
      [ActionType.IS_ON_FLOOR]: "Check if on ground",
      [ActionType.IS_ON_CEILING]: "Check if hitting ceiling",
      [ActionType.IS_ON_WALL]: "Check if against wall",
      [ActionType.GET_FLOOR_NORMAL]: "Get floor surface normal",
      [ActionType.SET_VELOCITY]: "Current velocity vector",
      [ActionType.SET_FLOOR_MAX_ANGLE]: "Maximum floor slope",
      [ActionType.SET_UP_DIRECTION]: "Which direction is up",
      [ActionType.SET_SHAPE]: "Set collision shape",
      [ActionType.SET_COLLISION_DISABLED]: "Enable/disable collision",
      [ActionType.SET_ONE_WAY_COLLISION]: "Allow one-way collision",
      [ActionType.SET_POLYGON]: "Set polygon points",
      [ActionType.SET_BUILD_MODE]: "Set how polygon is built",
      [ActionType.SET_VISIBLE]: "Show or hide the node",
      [ActionType.SET_MODULATE]: "Change node color and transparency",
      [ActionType.SET_PROPERTY]: "Set any node property",
      [ActionType.TWEEN_PROPERTY]: "Smoothly animate any property",
      [ActionType.EMIT_SIGNAL]: "Send signal to other nodes",
      [ActionType.CONNECT_SIGNAL]: "Connect to another node's signal",
      [ActionType.WAIT]: "Pause execution for specified time",
      [ActionType.CONDITION]: "Execute actions based on condition",
      [ActionType.LOOP]: "Repeat actions multiple times",
      [ActionType.PRINT]: "Output debug message to console",
      [ActionType.PLAY_SOUND]: "Play audio file",
      [ActionType.STOP_SOUND]: "Stop playing audio",
      [ActionType.CUSTOM_CODE]: "Write custom GDScript code"
    };

    return descriptions[type] || "Custom action";
  }
}
