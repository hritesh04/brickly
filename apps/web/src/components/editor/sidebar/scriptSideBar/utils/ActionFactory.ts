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
  WaitType,
  BuildMode,
  // New Godot Action imports
  TranslateAction,
  RotateAction,
  LookAtAction,
  GetAngleToAction,
  ToLocalAction,
  ToGlobalAction,
  AddChildAction,
  RemoveChildAction,
  GetNodeAction,
  SetProcessAction,
  SetPhysicsProcessAction,
  SetTextureAction,
  SetRegionEnabledAction,
  SetRegionRectAction,
  SetFlipHAction,
  SetFlipVAction,
  StopAnimationAction,
  PauseAnimationAction,
  SetAnimationAction,
  SetFrameAction,
  SetSpeedScaleAction,
  ApplyImpulseAction,
  ApplyForceAction,
  SetGravityScaleAction,
  FreezeBodyAction,
  SetFreezeEnabledAction,
  SetMassAction,
  SetLinearVelocityAction,
  SetAngularVelocityAction,
  SetLockRotationAction,
  MoveAndCollideAction,
  SetConstantLinearVelocityAction,
  SetConstantAngularVelocityAction,
  GetOverlappingBodiesAction,
  GetOverlappingAreasAction,
  OverlapsBodyAction,
  OverlapsAreaAction,
  SetMonitoringAction,
  SetMonitorableAction,
  SetGravityAction,
  SetGravityVectorAction,
  MoveAndSlideAction,
  IsOnFloorAction,
  IsOnCeilingAction,
  IsOnWallAction,
  GetFloorNormalAction,
  SetVelocityAction,
  SetFloorMaxAngleAction,
  SetUpDirectionAction,
  SetShapeAction,
  SetCollisionDisabledAction,
  SetOneWayCollisionAction,
  SetPolygonAction,
  SetBuildModeAction
} from "@brickly/types";

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

      // New Godot Actions
      case ActionType.TRANSLATE:
        return {
          ...baseAction,
          type: ActionType.TRANSLATE,
          vector: { x: 10, y: 0 }
        } as TranslateAction;

      case ActionType.ROTATE:
        return {
          ...baseAction,
          type: ActionType.ROTATE,
          angle: 0.1
        } as RotateAction;

      case ActionType.LOOK_AT:
        return {
          ...baseAction,
          type: ActionType.LOOK_AT,
          point: { x: 0, y: 0 }
        } as LookAtAction;

      case ActionType.GET_ANGLE_TO:
        return {
          ...baseAction,
          type: ActionType.GET_ANGLE_TO,
          point: { x: 0, y: 0 }
        } as GetAngleToAction;

      case ActionType.TO_LOCAL:
        return {
          ...baseAction,
          type: ActionType.TO_LOCAL,
          globalPoint: { x: 0, y: 0 }
        } as ToLocalAction;

      case ActionType.TO_GLOBAL:
        return {
          ...baseAction,
          type: ActionType.TO_GLOBAL,
          localPoint: { x: 0, y: 0 }
        } as ToGlobalAction;

      case ActionType.ADD_CHILD:
        return {
          ...baseAction,
          type: ActionType.ADD_CHILD,
          childPath: "res://scenes/Child.tscn"
        } as AddChildAction;

      case ActionType.REMOVE_CHILD:
        return {
          ...baseAction,
          type: ActionType.REMOVE_CHILD,
          childPath: "$ChildNode"
        } as RemoveChildAction;

      case ActionType.GET_NODE:
        return {
          ...baseAction,
          type: ActionType.GET_NODE,
          nodePath: "$NodeName"
        } as GetNodeAction;

      case ActionType.SET_PROCESS:
        return {
          ...baseAction,
          type: ActionType.SET_PROCESS,
          enabled: true
        } as SetProcessAction;

      case ActionType.SET_PHYSICS_PROCESS:
        return {
          ...baseAction,
          type: ActionType.SET_PHYSICS_PROCESS,
          enabled: true
        } as SetPhysicsProcessAction;

      case ActionType.SET_TEXTURE:
        return {
          ...baseAction,
          type: ActionType.SET_TEXTURE,
          texturePath: "res://textures/sprite.png"
        } as SetTextureAction;

      case ActionType.SET_REGION_ENABLED:
        return {
          ...baseAction,
          type: ActionType.SET_REGION_ENABLED,
          enabled: true
        } as SetRegionEnabledAction;

      case ActionType.SET_REGION_RECT:
        return {
          ...baseAction,
          type: ActionType.SET_REGION_RECT,
          x: 0,
          y: 0,
          width: 32,
          height: 32
        } as SetRegionRectAction;

      case ActionType.SET_FLIP_H:
        return {
          ...baseAction,
          type: ActionType.SET_FLIP_H,
          flip: false
        } as SetFlipHAction;

      case ActionType.SET_FLIP_V:
        return {
          ...baseAction,
          type: ActionType.SET_FLIP_V,
          flip: false
        } as SetFlipVAction;

      case ActionType.STOP_ANIMATION:
        return {
          ...baseAction,
          type: ActionType.STOP_ANIMATION
        } as StopAnimationAction;

      case ActionType.PAUSE_ANIMATION:
        return {
          ...baseAction,
          type: ActionType.PAUSE_ANIMATION
        } as PauseAnimationAction;

      case ActionType.SET_ANIMATION:
        return {
          ...baseAction,
          type: ActionType.SET_ANIMATION,
          animationName: "default"
        } as SetAnimationAction;

      case ActionType.SET_FRAME:
        return {
          ...baseAction,
          type: ActionType.SET_FRAME,
          frame: 0
        } as SetFrameAction;

      case ActionType.SET_SPEED_SCALE:
        return {
          ...baseAction,
          type: ActionType.SET_SPEED_SCALE,
          speedScale: 1.0
        } as SetSpeedScaleAction;

      case ActionType.APPLY_IMPULSE:
        return {
          ...baseAction,
          type: ActionType.APPLY_IMPULSE,
          impulse: { x: 100, y: 0 },
          position: { x: 0, y: 0 }
        } as ApplyImpulseAction;

      case ActionType.APPLY_FORCE:
        return {
          ...baseAction,
          type: ActionType.APPLY_FORCE,
          force: { x: 50, y: 0 },
          position: { x: 0, y: 0 }
        } as ApplyForceAction;

      case ActionType.SET_GRAVITY_SCALE:
        return {
          ...baseAction,
          type: ActionType.SET_GRAVITY_SCALE,
          scale: 1.0
        } as SetGravityScaleAction;

      case ActionType.FREEZE_BODY:
        return {
          ...baseAction,
          type: ActionType.FREEZE_BODY
        } as FreezeBodyAction;

      case ActionType.SET_FREEZE_ENABLED:
        return {
          ...baseAction,
          type: ActionType.SET_FREEZE_ENABLED,
          enabled: false
        } as SetFreezeEnabledAction;

      case ActionType.SET_MASS:
        return {
          ...baseAction,
          type: ActionType.SET_MASS,
          mass: 1.0
        } as SetMassAction;

      case ActionType.SET_LINEAR_VELOCITY:
        return {
          ...baseAction,
          type: ActionType.SET_LINEAR_VELOCITY,
          velocity: { x: 0, y: 0 }
        } as SetLinearVelocityAction;

      case ActionType.SET_ANGULAR_VELOCITY:
        return {
          ...baseAction,
          type: ActionType.SET_ANGULAR_VELOCITY,
          velocity: 0
        } as SetAngularVelocityAction;

      case ActionType.SET_LOCK_ROTATION:
        return {
          ...baseAction,
          type: ActionType.SET_LOCK_ROTATION,
          locked: false
        } as SetLockRotationAction;

      case ActionType.MOVE_AND_COLLIDE:
        return {
          ...baseAction,
          type: ActionType.MOVE_AND_COLLIDE,
          velocity: { x: 10, y: 0 }
        } as MoveAndCollideAction;

      case ActionType.SET_CONSTANT_LINEAR_VELOCITY:
        return {
          ...baseAction,
          type: ActionType.SET_CONSTANT_LINEAR_VELOCITY,
          velocity: { x: 0, y: 0 }
        } as SetConstantLinearVelocityAction;

      case ActionType.SET_CONSTANT_ANGULAR_VELOCITY:
        return {
          ...baseAction,
          type: ActionType.SET_CONSTANT_ANGULAR_VELOCITY,
          velocity: 0
        } as SetConstantAngularVelocityAction;

      case ActionType.GET_OVERLAPPING_BODIES:
        return {
          ...baseAction,
          type: ActionType.GET_OVERLAPPING_BODIES
        } as GetOverlappingBodiesAction;

      case ActionType.GET_OVERLAPPING_AREAS:
        return {
          ...baseAction,
          type: ActionType.GET_OVERLAPPING_AREAS
        } as GetOverlappingAreasAction;

      case ActionType.OVERLAPS_BODY:
        return {
          ...baseAction,
          type: ActionType.OVERLAPS_BODY,
          bodyPath: "$Body"
        } as OverlapsBodyAction;

      case ActionType.OVERLAPS_AREA:
        return {
          ...baseAction,
          type: ActionType.OVERLAPS_AREA,
          areaPath: "$Area"
        } as OverlapsAreaAction;

      case ActionType.SET_MONITORING:
        return {
          ...baseAction,
          type: ActionType.SET_MONITORING,
          enabled: true
        } as SetMonitoringAction;

      case ActionType.SET_MONITORABLE:
        return {
          ...baseAction,
          type: ActionType.SET_MONITORABLE,
          enabled: true
        } as SetMonitorableAction;

      case ActionType.SET_GRAVITY:
        return {
          ...baseAction,
          type: ActionType.SET_GRAVITY,
          gravity: 980
        } as SetGravityAction;

      case ActionType.SET_GRAVITY_VECTOR:
        return {
          ...baseAction,
          type: ActionType.SET_GRAVITY_VECTOR,
          vector: { x: 0, y: 1 }
        } as SetGravityVectorAction;

      case ActionType.MOVE_AND_SLIDE:
        return {
          ...baseAction,
          type: ActionType.MOVE_AND_SLIDE
        } as MoveAndSlideAction;

      case ActionType.IS_ON_FLOOR:
        return {
          ...baseAction,
          type: ActionType.IS_ON_FLOOR
        } as IsOnFloorAction;

      case ActionType.IS_ON_CEILING:
        return {
          ...baseAction,
          type: ActionType.IS_ON_CEILING
        } as IsOnCeilingAction;

      case ActionType.IS_ON_WALL:
        return {
          ...baseAction,
          type: ActionType.IS_ON_WALL
        } as IsOnWallAction;

      case ActionType.GET_FLOOR_NORMAL:
        return {
          ...baseAction,
          type: ActionType.GET_FLOOR_NORMAL
        } as GetFloorNormalAction;

      case ActionType.SET_VELOCITY:
        return {
          ...baseAction,
          type: ActionType.SET_VELOCITY,
          velocity: { x: 0, y: 0 }
        } as SetVelocityAction;

      case ActionType.SET_FLOOR_MAX_ANGLE:
        return {
          ...baseAction,
          type: ActionType.SET_FLOOR_MAX_ANGLE,
          angle: 0.785398
        } as SetFloorMaxAngleAction;

      case ActionType.SET_UP_DIRECTION:
        return {
          ...baseAction,
          type: ActionType.SET_UP_DIRECTION,
          direction: { x: 0, y: -1 }
        } as SetUpDirectionAction;

      case ActionType.SET_SHAPE:
        return {
          ...baseAction,
          type: ActionType.SET_SHAPE,
          shapePath: "res://shapes/rectangle.tres"
        } as SetShapeAction;

      case ActionType.SET_COLLISION_DISABLED:
        return {
          ...baseAction,
          type: ActionType.SET_COLLISION_DISABLED,
          disabled: false
        } as SetCollisionDisabledAction;

      case ActionType.SET_ONE_WAY_COLLISION:
        return {
          ...baseAction,
          type: ActionType.SET_ONE_WAY_COLLISION,
          enabled: false
        } as SetOneWayCollisionAction;

      case ActionType.SET_POLYGON:
        return {
          ...baseAction,
          type: ActionType.SET_POLYGON,
          points: [{ x: 0, y: 0 }, { x: 32, y: 0 }, { x: 32, y: 32 }, { x: 0, y: 32 }]
        } as SetPolygonAction;

      case ActionType.SET_BUILD_MODE:
        return {
          ...baseAction,
          type: ActionType.SET_BUILD_MODE,
          mode: BuildMode.SOLIDS
        } as SetBuildModeAction;

      default:
        throw new Error(`Unknown action type: ${type}`);
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
      [ActionType.GET_SHAPE]: "Get Collision Shape",
      [ActionType.SET_COLLISION_DISABLED]: "Set Collision Disabled",
      [ActionType.SET_ONE_WAY_COLLISION]: "Set One Way Collision",
      [ActionType.SET_POLYGON]: "Set Polygon Points",
      [ActionType.GET_POLYGON]: "Get Polygon Points",
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
      [ActionType.CHANGE_SCENE]: "Change Scene",
      [ActionType.INSTANTIATE_SCENE]: "Instantiate Scene",
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
      [ActionType.GET_SHAPE]: "Get current shape",
      [ActionType.SET_COLLISION_DISABLED]: "Enable/disable collision",
      [ActionType.SET_ONE_WAY_COLLISION]: "Allow one-way collision",
      [ActionType.SET_POLYGON]: "Set polygon points",
      [ActionType.GET_POLYGON]: "Get polygon points array",
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
      [ActionType.CHANGE_SCENE]: "Switch to different scene",
      [ActionType.INSTANTIATE_SCENE]: "Create instance of scene",
      [ActionType.PLAY_SOUND]: "Play audio file",
      [ActionType.STOP_SOUND]: "Stop playing audio",
      [ActionType.CHECK_INPUT]: "Check for user input",
      [ActionType.PRINT]: "Output debug message to console",
      [ActionType.CUSTOM_CODE]: "Write custom GDScript code"
    };

    return descriptions[type] || "Custom action";
  }
}
