"use client";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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

interface ActionFormProps {
  action: Action;
  onChange: (action: Action) => void;
}

const FormField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1">
    <Label className="text-xs font-medium">{label}</Label>
    {children}
  </div>
);

export const MoveToForm = ({ action, onChange }: { action: MoveToAction; onChange: (action: Action) => void }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    <FormField label="Target X">
      <Input
        type="number"
        value={action.targetX}
        onChange={(e) => onChange({ ...action, targetX: parseFloat(e.target.value) || 0 })}
        className="h-8 text-xs"
      />
    </FormField>
    <FormField label="Target Y">
      <Input
        type="number"
        value={action.targetY}
        onChange={(e) => onChange({ ...action, targetY: parseFloat(e.target.value) || 0 })}
        className="h-8 text-xs"
      />
    </FormField>
    <FormField label="Duration (s)">
      <Input
        type="number"
        step="0.1"
        value={action.duration || 0}
        onChange={(e) => onChange({ ...action, duration: parseFloat(e.target.value) || 0 })}
        className="h-8 text-xs"
        placeholder="Instant"
      />
    </FormField>
    <FormField label="Ease Type">
      <Select
        value={action.easeType || EaseType.LINEAR}
        onValueChange={(value) => onChange({ ...action, easeType: value as EaseType })}
      >
        <SelectTrigger className="h-8 text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={EaseType.LINEAR}>Linear</SelectItem>
          <SelectItem value={EaseType.EASE_IN}>Ease In</SelectItem>
          <SelectItem value={EaseType.EASE_OUT}>Ease Out</SelectItem>
          <SelectItem value={EaseType.EASE_IN_OUT}>Ease In Out</SelectItem>
        </SelectContent>
      </Select>
    </FormField>
  </div>
);

export const MoveByForm = ({ action, onChange }: { action: MoveByAction; onChange: (action: Action) => void }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    <FormField label="Delta X">
      <Input
        type="number"
        value={action.deltaX}
        onChange={(e) => onChange({ ...action, deltaX: parseFloat(e.target.value) || 0 })}
        className="h-8 text-xs"
      />
    </FormField>
    <FormField label="Delta Y">
      <Input
        type="number"
        value={action.deltaY}
        onChange={(e) => onChange({ ...action, deltaY: parseFloat(e.target.value) || 0 })}
        className="h-8 text-xs"
      />
    </FormField>
    <FormField label="Duration (s)">
      <Input
        type="number"
        step="0.1"
        value={action.duration || 0}
        onChange={(e) => onChange({ ...action, duration: parseFloat(e.target.value) || 0 })}
        className="h-8 text-xs"
        placeholder="Instant"
      />
    </FormField>
    <FormField label="Ease Type">
      <Select
        value={action.easeType || EaseType.LINEAR}
        onValueChange={(value) => onChange({ ...action, easeType: value as EaseType })}
      >
        <SelectTrigger className="h-8 text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={EaseType.LINEAR}>Linear</SelectItem>
          <SelectItem value={EaseType.EASE_IN}>Ease In</SelectItem>
          <SelectItem value={EaseType.EASE_OUT}>Ease Out</SelectItem>
          <SelectItem value={EaseType.EASE_IN_OUT}>Ease In Out</SelectItem>
        </SelectContent>
      </Select>
    </FormField>
  </div>
);

export const RotateToForm = ({ action, onChange }: { action: RotateToAction; onChange: (action: Action) => void }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    <FormField label="Target Rotation (degrees)">
      <Input
        type="number"
        value={action.targetRotation}
        onChange={(e) => onChange({ ...action, targetRotation: parseFloat(e.target.value) || 0 })}
        className="h-8 text-xs"
      />
    </FormField>
    <FormField label="Duration (s)">
      <Input
        type="number"
        step="0.1"
        value={action.duration || 0}
        onChange={(e) => onChange({ ...action, duration: parseFloat(e.target.value) || 0 })}
        className="h-8 text-xs"
        placeholder="Instant"
      />
    </FormField>
  </div>
);

export const RotateByForm = ({ action, onChange }: { action: RotateByAction; onChange: (action: Action) => void }) => (
  <div className="grid grid-cols-2 gap-3">
    <FormField label="Delta Rotation (degrees)">
      <Input
        type="number"
        value={action.deltaRotation}
        onChange={(e) => onChange({ ...action, deltaRotation: parseFloat(e.target.value) || 0 })}
        className="h-8 text-xs"
      />
    </FormField>
    <FormField label="Duration (s)">
      <Input
        type="number"
        step="0.1"
        value={action.duration || 0}
        onChange={(e) => onChange({ ...action, duration: parseFloat(e.target.value) || 0 })}
        className="h-8 text-xs"
        placeholder="Instant"
      />
    </FormField>
  </div>
);

export const ScaleToForm = ({ action, onChange }: { action: ScaleToAction; onChange: (action: Action) => void }) => (
  <div className="grid grid-cols-2 gap-3">
    <FormField label="Scale X">
      <Input
        type="number"
        step="0.1"
        value={action.targetScaleX}
        onChange={(e) => onChange({ ...action, targetScaleX: parseFloat(e.target.value) || 1 })}
        className="h-8 text-xs"
      />
    </FormField>
    <FormField label="Scale Y">
      <Input
        type="number"
        step="0.1"
        value={action.targetScaleY}
        onChange={(e) => onChange({ ...action, targetScaleY: parseFloat(e.target.value) || 1 })}
        className="h-8 text-xs"
      />
    </FormField>
    <FormField label="Duration (s)">
      <Input
        type="number"
        step="0.1"
        value={action.duration || 0}
        onChange={(e) => onChange({ ...action, duration: parseFloat(e.target.value) || 0 })}
        className="h-8 text-xs"
        placeholder="Instant"
      />
    </FormField>
  </div>
);

export const SetVisibleForm = ({ action, onChange }: { action: SetVisibleAction; onChange: (action: Action) => void }) => (
  <div className="flex items-center space-x-2">
    <Checkbox
      checked={action.visible}
      onCheckedChange={(checked) => onChange({ ...action, visible: !!checked })}
    />
    <Label className="text-sm">Make node visible</Label>
  </div>
);

export const SetModulateForm = ({ action, onChange }: { action: SetModulateAction; onChange: (action: Action) => void }) => (
  <div className="grid grid-cols-2 gap-3">
    <FormField label="Color">
      <Input
        type="color"
        value={action.color}
        onChange={(e) => onChange({ ...action, color: e.target.value })}
        className="h-8"
      />
    </FormField>
    <FormField label="Alpha">
      <Input
        type="number"
        min="0"
        max="1"
        step="0.1"
        value={action.alpha}
        onChange={(e) => onChange({ ...action, alpha: parseFloat(e.target.value) || 1 })}
        className="h-8 text-xs"
      />
    </FormField>
  </div>
);

export const TweenPropertyForm = ({ action, onChange }: { action: TweenPropertyAction; onChange: (action: Action) => void }) => (
  <div className="space-y-3">
    <FormField label="Property Path">
      <Input
        value={action.propertyPath}
        onChange={(e) => onChange({ ...action, propertyPath: e.target.value })}
        className="h-8 text-xs"
        placeholder="e.g., position, rotation, modulate"
      />
    </FormField>
    <FormField label="Target Value">
      <Input
        value={action.targetValue}
        onChange={(e) => onChange({ ...action, targetValue: e.target.value })}
        className="h-8 text-xs"
        placeholder="e.g., Vector2(100, 50), 45, Color.RED"
      />
    </FormField>
    <div className="grid grid-cols-3 gap-2">
      <FormField label="Duration">
        <Input
          type="number"
          step="0.1"
          value={action.duration}
          onChange={(e) => onChange({ ...action, duration: parseFloat(e.target.value) || 1 })}
          className="h-8 text-xs"
        />
      </FormField>
      <FormField label="Ease">
        <Select
          value={action.easeType}
          onValueChange={(value) => onChange({ ...action, easeType: value as EaseType })}
        >
          <SelectTrigger className="h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={EaseType.LINEAR}>Linear</SelectItem>
            <SelectItem value={EaseType.EASE_IN}>Ease In</SelectItem>
            <SelectItem value={EaseType.EASE_OUT}>Ease Out</SelectItem>
            <SelectItem value={EaseType.EASE_IN_OUT}>Ease In Out</SelectItem>
          </SelectContent>
        </Select>
      </FormField>
      <FormField label="Transition">
        <Select
          value={action.transitionType}
          onValueChange={(value) => onChange({ ...action, transitionType: value as TransitionType })}
        >
          <SelectTrigger className="h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={TransitionType.SINE}>Sine</SelectItem>
            <SelectItem value={TransitionType.QUAD}>Quad</SelectItem>
            <SelectItem value={TransitionType.CUBIC}>Cubic</SelectItem>
            <SelectItem value={TransitionType.BOUNCE}>Bounce</SelectItem>
            <SelectItem value={TransitionType.ELASTIC}>Elastic</SelectItem>
          </SelectContent>
        </Select>
      </FormField>
    </div>
  </div>
);

export const WaitForm = ({ action, onChange }: { action: WaitAction; onChange: (action: Action) => void }) => (
  <div className="grid grid-cols-2 gap-3">
    <FormField label="Duration">
      <Input
        type="number"
        step="0.1"
        value={action.duration}
        onChange={(e) => onChange({ ...action, duration: parseFloat(e.target.value) || 1 })}
        className="h-8 text-xs"
      />
    </FormField>
    <FormField label="Wait Type">
      <Select
        value={action.waitType}
        onValueChange={(value) => onChange({ ...action, waitType: value as WaitType })}
      >
        <SelectTrigger className="h-8 text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={WaitType.SECONDS}>Seconds</SelectItem>
          <SelectItem value={WaitType.FRAMES}>Frames</SelectItem>
          <SelectItem value={WaitType.SIGNAL}>Signal</SelectItem>
        </SelectContent>
      </Select>
    </FormField>
  </div>
);

export const PrintForm = ({ action, onChange }: { action: PrintAction; onChange: (action: Action) => void }) => (
  <div className="space-y-3">
    <FormField label="Message">
      <Input
        value={action.message}
        onChange={(e) => onChange({ ...action, message: e.target.value })}
        className="h-8 text-xs"
        placeholder="Debug message..."
      />
    </FormField>
    <div className="flex items-center space-x-2">
      <Checkbox
        checked={action.includeNodeName}
        onCheckedChange={(checked) => onChange({ ...action, includeNodeName: !!checked })}
      />
      <Label className="text-xs">Include node name in output</Label>
    </div>
  </div>
);

export const PlaySoundForm = ({ action, onChange }: { action: PlaySoundAction; onChange: (action: Action) => void }) => (
  <div className="space-y-3">
    <FormField label="Sound Path">
      <Input
        value={action.soundPath}
        onChange={(e) => onChange({ ...action, soundPath: e.target.value })}
        className="h-8 text-xs"
        placeholder="res://audio/sound.ogg"
      />
    </FormField>
    <div className="grid grid-cols-3 gap-2">
      <FormField label="Volume">
        <Input
          type="number"
          min="0"
          max="1"
          step="0.1"
          value={action.volume}
          onChange={(e) => onChange({ ...action, volume: parseFloat(e.target.value) || 1 })}
          className="h-8 text-xs"
        />
      </FormField>
      <FormField label="Pitch">
        <Input
          type="number"
          min="0.1"
          max="3"
          step="0.1"
          value={action.pitch}
          onChange={(e) => onChange({ ...action, pitch: parseFloat(e.target.value) || 1 })}
          className="h-8 text-xs"
        />
      </FormField>
      <div className="flex items-center space-x-2 pt-5">
        <Checkbox
          checked={action.loop}
          onCheckedChange={(checked) => onChange({ ...action, loop: !!checked })}
        />
        <Label className="text-xs">Loop</Label>
      </div>
    </div>
  </div>
);

export const CustomCodeForm = ({ action, onChange }: { action: CustomCodeAction; onChange: (action: Action) => void }) => (
  <div className="space-y-2">
    <FormField label="Custom GDScript Code">
      <Textarea
        value={action.code}
        onChange={(e) => onChange({ ...action, code: e.target.value })}
        className="min-h-[100px] font-mono text-xs"
        placeholder="# Write custom GDScript code here
print('Hello World')
position.x += 10"
      />
    </FormField>
    <p className="text-xs text-muted-foreground">
      Use this for advanced functionality not covered by visual actions
    </p>
  </div>
);

export const ActionFormRenderer = ({ action, onChange }: ActionFormProps) => {
  switch (action.type) {
    case ActionType.MOVE_TO:
      return <MoveToForm action={action as MoveToAction} onChange={onChange} />;
    case ActionType.MOVE_BY:
      return <MoveByForm action={action as MoveByAction} onChange={onChange} />;
    case ActionType.ROTATE_TO:
      return <RotateToForm action={action as RotateToAction} onChange={onChange} />;
    case ActionType.ROTATE_BY:
      return <RotateByForm action={action as RotateByAction} onChange={onChange} />;
    case ActionType.SCALE_TO:
      return <ScaleToForm action={action as ScaleToAction} onChange={onChange} />;
    case ActionType.SET_VISIBLE:
      return <SetVisibleForm action={action as SetVisibleAction} onChange={onChange} />;
    case ActionType.SET_MODULATE:
      return <SetModulateForm action={action as SetModulateAction} onChange={onChange} />;
    case ActionType.TWEEN_PROPERTY:
      return <TweenPropertyForm action={action as TweenPropertyAction} onChange={onChange} />;
    case ActionType.WAIT:
      return <WaitForm action={action as WaitAction} onChange={onChange} />;
    case ActionType.PRINT:
      return <PrintForm action={action as PrintAction} onChange={onChange} />;
    case ActionType.PLAY_SOUND:
      return <PlaySoundForm action={action as PlaySoundAction} onChange={onChange} />;
    case ActionType.CUSTOM_CODE:
      return <CustomCodeForm action={action as CustomCodeAction} onChange={onChange} />;
    default:
      return <div className="text-xs text-muted-foreground">Form not implemented for this action type</div>;
  }
};
