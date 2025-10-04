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
  CustomCodeAction
} from "../types/ActionTypes";

export class CodeGenerator {
  static generateGDScript(actions: Action[]): string {
    if (actions.length === 0) return "";
    
    const code = actions.map(action => this.generateActionCode(action)).join('\n');
    return code;
  }

  static generateActionCode(action: Action): string {
    if (!action.enabled) return `# ${action.name} (disabled)`;

    switch (action.type) {
      case ActionType.MOVE_TO:
        return this.generateMoveToCode(action as MoveToAction);
      case ActionType.MOVE_BY:
        return this.generateMoveByCode(action as MoveByAction);
      case ActionType.ROTATE_TO:
        return this.generateRotateToCode(action as RotateToAction);
      case ActionType.ROTATE_BY:
        return this.generateRotateByCode(action as RotateByAction);
      case ActionType.SCALE_TO:
        return this.generateScaleToCode(action as ScaleToAction);
      case ActionType.SET_VISIBLE:
        return this.generateSetVisibleCode(action as SetVisibleAction);
      case ActionType.SET_MODULATE:
        return this.generateSetModulateCode(action as SetModulateAction);
      case ActionType.TWEEN_PROPERTY:
        return this.generateTweenPropertyCode(action as TweenPropertyAction);
      case ActionType.WAIT:
        return this.generateWaitCode(action as WaitAction);
      case ActionType.PRINT:
        return this.generatePrintCode(action as PrintAction);
      case ActionType.PLAY_SOUND:
        return this.generatePlaySoundCode(action as PlaySoundAction);
      case ActionType.CUSTOM_CODE:
        return this.generateCustomCodeCode(action as CustomCodeAction);
      default:
        return `# TODO: Implement ${action.type}`;
    }
  }

  private static generateMoveToCode(action: MoveToAction): string {
    if (action.duration && action.duration > 0) {
      return `# ${action.name}
var tween = create_tween()
tween.tween_property(self, "position", Vector2(${action.targetX}, ${action.targetY}), ${action.duration})`;
    } else {
      return `# ${action.name}
position = Vector2(${action.targetX}, ${action.targetY})`;
    }
  }

  private static generateMoveByCode(action: MoveByAction): string {
    if (action.duration && action.duration > 0) {
      return `# ${action.name}
var tween = create_tween()
var target_pos = position + Vector2(${action.deltaX}, ${action.deltaY})
tween.tween_property(self, "position", target_pos, ${action.duration})`;
    } else {
      return `# ${action.name}
position += Vector2(${action.deltaX}, ${action.deltaY})`;
    }
  }

  private static generateRotateToCode(action: RotateToAction): string {
    const radians = action.targetRotation * Math.PI / 180;
    if (action.duration && action.duration > 0) {
      return `# ${action.name}
var tween = create_tween()
tween.tween_property(self, "rotation", ${radians}, ${action.duration})`;
    } else {
      return `# ${action.name}
rotation = ${radians}`;
    }
  }

  private static generateRotateByCode(action: RotateByAction): string {
    const radians = action.deltaRotation * Math.PI / 180;
    if (action.duration && action.duration > 0) {
      return `# ${action.name}
var tween = create_tween()
tween.tween_property(self, "rotation", rotation + ${radians}, ${action.duration})`;
    } else {
      return `# ${action.name}
rotation += ${radians}`;
    }
  }

  private static generateScaleToCode(action: ScaleToAction): string {
    if (action.duration && action.duration > 0) {
      return `# ${action.name}
var tween = create_tween()
tween.tween_property(self, "scale", Vector2(${action.targetScaleX}, ${action.targetScaleY}), ${action.duration})`;
    } else {
      return `# ${action.name}
scale = Vector2(${action.targetScaleX}, ${action.targetScaleY})`;
    }
  }

  private static generateSetVisibleCode(action: SetVisibleAction): string {
    return `# ${action.name}
visible = ${action.visible}`;
  }

  private static generateSetModulateCode(action: SetModulateAction): string {
    return `# ${action.name}
modulate = Color("${action.color}")
modulate.a = ${action.alpha}`;
  }

  private static generateTweenPropertyCode(action: TweenPropertyAction): string {
    return `# ${action.name}
var tween = create_tween()
tween.set_ease(Tween.EASE_${action.easeType.toUpperCase()})
tween.set_trans(Tween.TRANS_${action.transitionType.toUpperCase()})
tween.tween_property(self, "${action.propertyPath}", ${action.targetValue}, ${action.duration})`;
  }

  private static generateWaitCode(action: WaitAction): string {
    switch (action.waitType) {
      case 'seconds':
        return `# ${action.name}
await get_tree().create_timer(${action.duration}).timeout`;
      case 'frames':
        return `# ${action.name}
for i in ${Math.floor(action.duration)}:
    await get_tree().process_frame`;
      case 'signal':
        return `# ${action.name}
# await some_signal`;
      default:
        return `# ${action.name}
await get_tree().create_timer(${action.duration}).timeout`;
    }
  }

  private static generatePrintCode(action: PrintAction): string {
    const message = action.includeNodeName 
      ? `"[" + name + "] ${action.message}"`
      : `"${action.message}"`;
    return `# ${action.name}
print(${message})`;
  }

  private static generatePlaySoundCode(action: PlaySoundAction): string {
    return `# ${action.name}
# Assuming you have an AudioStreamPlayer node
var audio_player = $AudioStreamPlayer
audio_player.stream = load("${action.soundPath}")
audio_player.volume_db = linear_to_db(${action.volume})
audio_player.pitch_scale = ${action.pitch}
audio_player.play()`;
  }

  private static generateCustomCodeCode(action: CustomCodeAction): string {
    return `# ${action.name}
${action.code}`;
  }

  static generateMainLoopFunction(actions: Action[]): string {
    if (actions.length === 0) return "";
    
    const code = this.generateGDScript(actions);
    return `func _process(delta):
${code.split('\n').map(line => '    ' + line).join('\n')}`;
  }

  static generateTriggerFunction(triggerName: string, actions: Action[]): string {
    if (actions.length === 0) return "";
    
    const code = this.generateGDScript(actions);
    const functionName = triggerName.toLowerCase().replace(/\s+/g, '_');
    return `func ${functionName}():
${code.split('\n').map(line => '    ' + line).join('\n')}`;
  }
}
