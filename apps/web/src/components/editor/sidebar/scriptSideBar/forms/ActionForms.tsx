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

// New Godot Action Forms

export const TranslateForm = ({ action, onChange }: { action: TranslateAction; onChange: (action: Action) => void }) => (
  <div className="grid grid-cols-2 gap-3">
    <FormField label="Vector X">
      <Input
        type="number"
        value={action.vector.x}
        onChange={(e) => onChange({ ...action, vector: { ...action.vector, x: parseFloat(e.target.value) || 0 } })}
        className="h-8 text-xs"
      />
    </FormField>
    <FormField label="Vector Y">
      <Input
        type="number"
        value={action.vector.y}
        onChange={(e) => onChange({ ...action, vector: { ...action.vector, y: parseFloat(e.target.value) || 0 } })}
        className="h-8 text-xs"
      />
    </FormField>
  </div>
);

export const RotateForm = ({ action, onChange }: { action: RotateAction; onChange: (action: Action) => void }) => (
  <FormField label="Angle (radians)">
    <Input
      type="number"
      step="0.1"
      value={action.angle}
      onChange={(e) => onChange({ ...action, angle: parseFloat(e.target.value) || 0 })}
      className="h-8 text-xs"
    />
  </FormField>
);

export const LookAtForm = ({ action, onChange }: { action: LookAtAction; onChange: (action: Action) => void }) => (
  <div className="grid grid-cols-2 gap-3">
    <FormField label="Point X">
      <Input
        type="number"
        value={action.point.x}
        onChange={(e) => onChange({ ...action, point: { ...action.point, x: parseFloat(e.target.value) || 0 } })}
        className="h-8 text-xs"
      />
    </FormField>
    <FormField label="Point Y">
      <Input
        type="number"
        value={action.point.y}
        onChange={(e) => onChange({ ...action, point: { ...action.point, y: parseFloat(e.target.value) || 0 } })}
        className="h-8 text-xs"
      />
    </FormField>
  </div>
);

export const GetAngleToForm = ({ action, onChange }: { action: GetAngleToAction; onChange: (action: Action) => void }) => (
  <div className="grid grid-cols-2 gap-3">
    <FormField label="Target X">
      <Input
        type="number"
        value={action.point.x}
        onChange={(e) => onChange({ ...action, point: { ...action.point, x: parseFloat(e.target.value) || 0 } })}
        className="h-8 text-xs"
      />
    </FormField>
    <FormField label="Target Y">
      <Input
        type="number"
        value={action.point.y}
        onChange={(e) => onChange({ ...action, point: { ...action.point, y: parseFloat(e.target.value) || 0 } })}
        className="h-8 text-xs"
      />
    </FormField>
  </div>
);

export const ToLocalForm = ({ action, onChange }: { action: ToLocalAction; onChange: (action: Action) => void }) => (
  <div className="grid grid-cols-2 gap-3">
    <FormField label="Global X">
      <Input
        type="number"
        value={action.globalPoint.x}
        onChange={(e) => onChange({ ...action, globalPoint: { ...action.globalPoint, x: parseFloat(e.target.value) || 0 } })}
        className="h-8 text-xs"
      />
    </FormField>
    <FormField label="Global Y">
      <Input
        type="number"
        value={action.globalPoint.y}
        onChange={(e) => onChange({ ...action, globalPoint: { ...action.globalPoint, y: parseFloat(e.target.value) || 0 } })}
        className="h-8 text-xs"
      />
    </FormField>
  </div>
);

export const ToGlobalForm = ({ action, onChange }: { action: ToGlobalAction; onChange: (action: Action) => void }) => (
  <div className="grid grid-cols-2 gap-3">
    <FormField label="Local X">
      <Input
        type="number"
        value={action.localPoint.x}
        onChange={(e) => onChange({ ...action, localPoint: { ...action.localPoint, x: parseFloat(e.target.value) || 0 } })}
        className="h-8 text-xs"
      />
    </FormField>
    <FormField label="Local Y">
      <Input
        type="number"
        value={action.localPoint.y}
        onChange={(e) => onChange({ ...action, localPoint: { ...action.localPoint, y: parseFloat(e.target.value) || 0 } })}
        className="h-8 text-xs"
      />
    </FormField>
  </div>
);

export const AddChildForm = ({ action, onChange }: { action: AddChildAction; onChange: (action: Action) => void }) => (
  <FormField label="Child Path">
    <Input
      value={action.childPath}
      onChange={(e) => onChange({ ...action, childPath: e.target.value })}
      className="h-8 text-xs"
      placeholder="res://scenes/Child.tscn"
    />
  </FormField>
);

export const RemoveChildForm = ({ action, onChange }: { action: RemoveChildAction; onChange: (action: Action) => void }) => (
  <FormField label="Child Node Path">
    <Input
      value={action.childPath}
      onChange={(e) => onChange({ ...action, childPath: e.target.value })}
      className="h-8 text-xs"
      placeholder="$ChildNode"
    />
  </FormField>
);

export const GetNodeForm = ({ action, onChange }: { action: GetNodeAction; onChange: (action: Action) => void }) => (
  <FormField label="Node Path">
    <Input
      value={action.nodePath}
      onChange={(e) => onChange({ ...action, nodePath: e.target.value })}
      className="h-8 text-xs"
      placeholder="$NodeName"
    />
  </FormField>
);

export const SetProcessForm = ({ action, onChange }: { action: SetProcessAction; onChange: (action: Action) => void }) => (
  <div className="flex items-center space-x-2">
    <Checkbox
      checked={action.enabled}
      onCheckedChange={(checked) => onChange({ ...action, enabled: !!checked })}
    />
    <Label className="text-sm">Enable _process() calls</Label>
  </div>
);

export const SetPhysicsProcessForm = ({ action, onChange }: { action: SetPhysicsProcessAction; onChange: (action: Action) => void }) => (
  <div className="flex items-center space-x-2">
    <Checkbox
      checked={action.enabled}
      onCheckedChange={(checked) => onChange({ ...action, enabled: !!checked })}
    />
    <Label className="text-sm">Enable _physics_process() calls</Label>
  </div>
);

export const SetTextureForm = ({ action, onChange }: { action: SetTextureAction; onChange: (action: Action) => void }) => (
  <FormField label="Texture Path">
    <Input
      value={action.texturePath}
      onChange={(e) => onChange({ ...action, texturePath: e.target.value })}
      className="h-8 text-xs"
      placeholder="res://textures/sprite.png"
    />
  </FormField>
);

export const SetRegionEnabledForm = ({ action, onChange }: { action: SetRegionEnabledAction; onChange: (action: Action) => void }) => (
  <div className="flex items-center space-x-2">
    <Checkbox
      checked={action.enabled}
      onCheckedChange={(checked) => onChange({ ...action, enabled: !!checked })}
    />
    <Label className="text-sm">Enable texture region</Label>
  </div>
);

export const SetRegionRectForm = ({ action, onChange }: { action: SetRegionRectAction; onChange: (action: Action) => void }) => (
  <div className="grid grid-cols-2 gap-3">
    <FormField label="X">
      <Input
        type="number"
        value={action.x}
        onChange={(e) => onChange({ ...action, x: parseFloat(e.target.value) || 0 })}
        className="h-8 text-xs"
      />
    </FormField>
    <FormField label="Y">
      <Input
        type="number"
        value={action.y}
        onChange={(e) => onChange({ ...action, y: parseFloat(e.target.value) || 0 })}
        className="h-8 text-xs"
      />
    </FormField>
    <FormField label="Width">
      <Input
        type="number"
        value={action.width}
        onChange={(e) => onChange({ ...action, width: parseFloat(e.target.value) || 0 })}
        className="h-8 text-xs"
      />
    </FormField>
    <FormField label="Height">
      <Input
        type="number"
        value={action.height}
        onChange={(e) => onChange({ ...action, height: parseFloat(e.target.value) || 0 })}
        className="h-8 text-xs"
      />
    </FormField>
  </div>
);

export const SetFlipHForm = ({ action, onChange }: { action: SetFlipHAction; onChange: (action: Action) => void }) => (
  <div className="flex items-center space-x-2">
    <Checkbox
      checked={action.flip}
      onCheckedChange={(checked) => onChange({ ...action, flip: !!checked })}
    />
    <Label className="text-sm">Flip horizontally</Label>
  </div>
);

export const SetFlipVForm = ({ action, onChange }: { action: SetFlipVAction; onChange: (action: Action) => void }) => (
  <div className="flex items-center space-x-2">
    <Checkbox
      checked={action.flip}
      onCheckedChange={(checked) => onChange({ ...action, flip: !!checked })}
    />
    <Label className="text-sm">Flip vertically</Label>
  </div>
);

// Animation Forms
export const SetAnimationForm = ({ action, onChange }: { action: SetAnimationAction; onChange: (action: Action) => void }) => (
  <FormField label="Animation Name">
    <Input
      value={action.animationName}
      onChange={(e) => onChange({ ...action, animationName: e.target.value })}
      className="h-8 text-xs"
      placeholder="default"
    />
  </FormField>
);

export const SetFrameForm = ({ action, onChange }: { action: SetFrameAction; onChange: (action: Action) => void }) => (
  <FormField label="Frame Number">
    <Input
      type="number"
      min="0"
      value={action.frame}
      onChange={(e) => onChange({ ...action, frame: parseInt(e.target.value) || 0 })}
      className="h-8 text-xs"
    />
  </FormField>
);

export const SetSpeedScaleForm = ({ action, onChange }: { action: SetSpeedScaleAction; onChange: (action: Action) => void }) => (
  <FormField label="Speed Scale">
    <Input
      type="number"
      step="0.1"
      min="0"
      value={action.speedScale}
      onChange={(e) => onChange({ ...action, speedScale: parseFloat(e.target.value) || 1 })}
      className="h-8 text-xs"
    />
  </FormField>
);

// RigidBody2D Forms
export const ApplyImpulseForm = ({ action, onChange }: { action: ApplyImpulseAction; onChange: (action: Action) => void }) => (
  <div className="space-y-3">
    <div className="grid grid-cols-2 gap-3">
      <FormField label="Impulse X">
        <Input
          type="number"
          value={action.impulse.x}
          onChange={(e) => onChange({ ...action, impulse: { ...action.impulse, x: parseFloat(e.target.value) || 0 } })}
          className="h-8 text-xs"
        />
      </FormField>
      <FormField label="Impulse Y">
        <Input
          type="number"
          value={action.impulse.y}
          onChange={(e) => onChange({ ...action, impulse: { ...action.impulse, y: parseFloat(e.target.value) || 0 } })}
          className="h-8 text-xs"
        />
      </FormField>
    </div>
    {action.position && (
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Position X">
          <Input
            type="number"
            value={action.position.x}
            onChange={(e) => onChange({ ...action, position: { ...action.position!, x: parseFloat(e.target.value) || 0 } })}
            className="h-8 text-xs"
          />
        </FormField>
        <FormField label="Position Y">
          <Input
            type="number"
            value={action.position.y}
            onChange={(e) => onChange({ ...action, position: { ...action.position!, y: parseFloat(e.target.value) || 0 } })}
            className="h-8 text-xs"
          />
        </FormField>
      </div>
    )}
  </div>
);

export const ApplyForceForm = ({ action, onChange }: { action: ApplyForceAction; onChange: (action: Action) => void }) => (
  <div className="space-y-3">
    <div className="grid grid-cols-2 gap-3">
      <FormField label="Force X">
        <Input
          type="number"
          value={action.force.x}
          onChange={(e) => onChange({ ...action, force: { ...action.force, x: parseFloat(e.target.value) || 0 } })}
          className="h-8 text-xs"
        />
      </FormField>
      <FormField label="Force Y">
        <Input
          type="number"
          value={action.force.y}
          onChange={(e) => onChange({ ...action, force: { ...action.force, y: parseFloat(e.target.value) || 0 } })}
          className="h-8 text-xs"
        />
      </FormField>
    </div>
    {action.position && (
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Position X">
          <Input
            type="number"
            value={action.position.x}
            onChange={(e) => onChange({ ...action, position: { ...action.position!, x: parseFloat(e.target.value) || 0 } })}
            className="h-8 text-xs"
          />
        </FormField>
        <FormField label="Position Y">
          <Input
            type="number"
            value={action.position.y}
            onChange={(e) => onChange({ ...action, position: { ...action.position!, y: parseFloat(e.target.value) || 0 } })}
            className="h-8 text-xs"
          />
        </FormField>
      </div>
    )}
  </div>
);

export const SetGravityScaleForm = ({ action, onChange }: { action: SetGravityScaleAction; onChange: (action: Action) => void }) => (
  <FormField label="Gravity Scale">
    <Input
      type="number"
      step="0.1"
      value={action.scale}
      onChange={(e) => onChange({ ...action, scale: parseFloat(e.target.value) || 1 })}
      className="h-8 text-xs"
    />
  </FormField>
);

export const SetMassForm = ({ action, onChange }: { action: SetMassAction; onChange: (action: Action) => void }) => (
  <FormField label="Mass">
    <Input
      type="number"
      step="0.1"
      min="0"
      value={action.mass}
      onChange={(e) => onChange({ ...action, mass: parseFloat(e.target.value) || 1 })}
      className="h-8 text-xs"
    />
  </FormField>
);

export const SetVelocityForm = ({ action, onChange }: { action: SetVelocityAction; onChange: (action: Action) => void }) => (
  <div className="grid grid-cols-2 gap-3">
    <FormField label="Velocity X">
      <Input
        type="number"
        value={action.velocity.x}
        onChange={(e) => onChange({ ...action, velocity: { ...action.velocity, x: parseFloat(e.target.value) || 0 } })}
        className="h-8 text-xs"
      />
    </FormField>
    <FormField label="Velocity Y">
      <Input
        type="number"
        value={action.velocity.y}
        onChange={(e) => onChange({ ...action, velocity: { ...action.velocity, y: parseFloat(e.target.value) || 0 } })}
        className="h-8 text-xs"
      />
    </FormField>
  </div>
);

export const SetLinearVelocityForm = ({ action, onChange }: { action: SetLinearVelocityAction; onChange: (action: Action) => void }) => (
  <div className="grid grid-cols-2 gap-3">
    <FormField label="Velocity X">
      <Input
        type="number"
        value={action.velocity.x}
        onChange={(e) => onChange({ ...action, velocity: { ...action.velocity, x: parseFloat(e.target.value) || 0 } })}
        className="h-8 text-xs"
      />
    </FormField>
    <FormField label="Velocity Y">
      <Input
        type="number"
        value={action.velocity.y}
        onChange={(e) => onChange({ ...action, velocity: { ...action.velocity, y: parseFloat(e.target.value) || 0 } })}
        className="h-8 text-xs"
      />
    </FormField>
  </div>
);

export const MoveAndCollideForm = ({ action, onChange }: { action: MoveAndCollideAction; onChange: (action: Action) => void }) => (
  <div className="grid grid-cols-2 gap-3">
    <FormField label="Velocity X">
      <Input
        type="number"
        value={action.velocity.x}
        onChange={(e) => onChange({ ...action, velocity: { ...action.velocity, x: parseFloat(e.target.value) || 0 } })}
        className="h-8 text-xs"
      />
    </FormField>
    <FormField label="Velocity Y">
      <Input
        type="number"
        value={action.velocity.y}
        onChange={(e) => onChange({ ...action, velocity: { ...action.velocity, y: parseFloat(e.target.value) || 0 } })}
        className="h-8 text-xs"
      />
    </FormField>
  </div>
);

export const SetConstantLinearVelocityForm = ({ action, onChange }: { action: SetConstantLinearVelocityAction; onChange: (action: Action) => void }) => (
  <div className="grid grid-cols-2 gap-3">
    <FormField label="Velocity X">
      <Input
        type="number"
        value={action.velocity.x}
        onChange={(e) => onChange({ ...action, velocity: { ...action.velocity, x: parseFloat(e.target.value) || 0 } })}
        className="h-8 text-xs"
      />
    </FormField>
    <FormField label="Velocity Y">
      <Input
        type="number"
        value={action.velocity.y}
        onChange={(e) => onChange({ ...action, velocity: { ...action.velocity, y: parseFloat(e.target.value) || 0 } })}
        className="h-8 text-xs"
      />
    </FormField>
  </div>
);

export const SetUpDirectionForm = ({ action, onChange }: { action: SetUpDirectionAction; onChange: (action: Action) => void }) => (
  <div className="grid grid-cols-2 gap-3">
    <FormField label="Direction X">
      <Input
        type="number"
        step="0.1"
        value={action.direction.x}
        onChange={(e) => onChange({ ...action, direction: { ...action.direction, x: parseFloat(e.target.value) || 0 } })}
        className="h-8 text-xs"
      />
    </FormField>
    <FormField label="Direction Y">
      <Input
        type="number"
        step="0.1"
        value={action.direction.y}
        onChange={(e) => onChange({ ...action, direction: { ...action.direction, y: parseFloat(e.target.value) || -1 } })}
        className="h-8 text-xs"
      />
    </FormField>
  </div>
);

export const SetLockRotationForm = ({ action, onChange }: { action: SetLockRotationAction; onChange: (action: Action) => void }) => (
  <div className="flex items-center space-x-2">
    <Checkbox
      checked={action.locked}
      onCheckedChange={(checked) => onChange({ ...action, locked: !!checked })}
    />
    <Label className="text-sm">Lock rotation</Label>
  </div>
);

// Area2D Forms
export const SetMonitoringForm = ({ action, onChange }: { action: SetMonitoringAction; onChange: (action: Action) => void }) => (
  <div className="flex items-center space-x-2">
    <Checkbox
      checked={action.enabled}
      onCheckedChange={(checked) => onChange({ ...action, enabled: !!checked })}
    />
    <Label className="text-sm">Enable monitoring</Label>
  </div>
);

export const SetMonitorableForm = ({ action, onChange }: { action: SetMonitorableAction; onChange: (action: Action) => void }) => (
  <div className="flex items-center space-x-2">
    <Checkbox
      checked={action.enabled}
      onCheckedChange={(checked) => onChange({ ...action, enabled: !!checked })}
    />
    <Label className="text-sm">Make monitorable</Label>
  </div>
);

export const SetGravityForm = ({ action, onChange }: { action: SetGravityAction; onChange: (action: Action) => void }) => (
  <FormField label="Gravity Strength">
    <Input
      type="number"
      value={action.gravity}
      onChange={(e) => onChange({ ...action, gravity: parseFloat(e.target.value) || 980 })}
      className="h-8 text-xs"
    />
  </FormField>
);

export const SetGravityVectorForm = ({ action, onChange }: { action: SetGravityVectorAction; onChange: (action: Action) => void }) => (
  <div className="grid grid-cols-2 gap-3">
    <FormField label="Vector X">
      <Input
        type="number"
        step="0.1"
        value={action.vector.x}
        onChange={(e) => onChange({ ...action, vector: { ...action.vector, x: parseFloat(e.target.value) || 0 } })}
        className="h-8 text-xs"
      />
    </FormField>
    <FormField label="Vector Y">
      <Input
        type="number"
        step="0.1"
        value={action.vector.y}
        onChange={(e) => onChange({ ...action, vector: { ...action.vector, y: parseFloat(e.target.value) || 1 } })}
        className="h-8 text-xs"
      />
    </FormField>
  </div>
);

// Collision Forms
export const SetCollisionDisabledForm = ({ action, onChange }: { action: SetCollisionDisabledAction; onChange: (action: Action) => void }) => (
  <div className="flex items-center space-x-2">
    <Checkbox
      checked={action.disabled}
      onCheckedChange={(checked) => onChange({ ...action, disabled: !!checked })}
    />
    <Label className="text-sm">Disable collision</Label>
  </div>
);

export const SetOneWayCollisionForm = ({ action, onChange }: { action: SetOneWayCollisionAction; onChange: (action: Action) => void }) => (
  <div className="flex items-center space-x-2">
    <Checkbox
      checked={action.enabled}
      onCheckedChange={(checked) => onChange({ ...action, enabled: !!checked })}
    />
    <Label className="text-sm">Enable one-way collision</Label>
  </div>
);

export const SetBuildModeForm = ({ action, onChange }: { action: SetBuildModeAction; onChange: (action: Action) => void }) => (
  <FormField label="Build Mode">
    <Select
      value={action.mode}
      onValueChange={(value) => onChange({ ...action, mode: value as BuildMode })}
    >
      <SelectTrigger className="h-8 text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={BuildMode.SOLIDS}>Solids</SelectItem>
        <SelectItem value={BuildMode.SEGMENTS}>Segments</SelectItem>
      </SelectContent>
    </Select>
  </FormField>
);

// Simple action forms (no parameters)
export const SimpleActionForm = ({ message }: { message: string }) => (
  <p className="text-xs text-muted-foreground">{message}</p>
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
    
    // New Godot Actions
    case ActionType.TRANSLATE:
      return <TranslateForm action={action as TranslateAction} onChange={onChange} />;
    case ActionType.ROTATE:
      return <RotateForm action={action as RotateAction} onChange={onChange} />;
    case ActionType.LOOK_AT:
      return <LookAtForm action={action as LookAtAction} onChange={onChange} />;
    case ActionType.GET_ANGLE_TO:
      return <GetAngleToForm action={action as GetAngleToAction} onChange={onChange} />;
    case ActionType.TO_LOCAL:
      return <ToLocalForm action={action as ToLocalAction} onChange={onChange} />;
    case ActionType.TO_GLOBAL:
      return <ToGlobalForm action={action as ToGlobalAction} onChange={onChange} />;
    case ActionType.ADD_CHILD:
      return <AddChildForm action={action as AddChildAction} onChange={onChange} />;
    case ActionType.REMOVE_CHILD:
      return <RemoveChildForm action={action as RemoveChildAction} onChange={onChange} />;
    case ActionType.GET_NODE:
      return <GetNodeForm action={action as GetNodeAction} onChange={onChange} />;
    case ActionType.SET_PROCESS:
      return <SetProcessForm action={action as SetProcessAction} onChange={onChange} />;
    case ActionType.SET_PHYSICS_PROCESS:
      return <SetPhysicsProcessForm action={action as SetPhysicsProcessAction} onChange={onChange} />;
    case ActionType.SET_TEXTURE:
      return <SetTextureForm action={action as SetTextureAction} onChange={onChange} />;
    case ActionType.SET_REGION_ENABLED:
      return <SetRegionEnabledForm action={action as SetRegionEnabledAction} onChange={onChange} />;
    case ActionType.SET_REGION_RECT:
      return <SetRegionRectForm action={action as SetRegionRectAction} onChange={onChange} />;
    case ActionType.SET_FLIP_H:
      return <SetFlipHForm action={action as SetFlipHAction} onChange={onChange} />;
    case ActionType.SET_FLIP_V:
      return <SetFlipVForm action={action as SetFlipVAction} onChange={onChange} />;
    case ActionType.STOP_ANIMATION:
      return <SimpleActionForm message="This action stops the current animation." />;
    case ActionType.PAUSE_ANIMATION:
      return <SimpleActionForm message="This action pauses the current animation." />;
    case ActionType.SET_ANIMATION:
      return <SetAnimationForm action={action as SetAnimationAction} onChange={onChange} />;
    case ActionType.SET_FRAME:
      return <SetFrameForm action={action as SetFrameAction} onChange={onChange} />;
    case ActionType.SET_SPEED_SCALE:
      return <SetSpeedScaleForm action={action as SetSpeedScaleAction} onChange={onChange} />;
    case ActionType.APPLY_IMPULSE:
      return <ApplyImpulseForm action={action as ApplyImpulseAction} onChange={onChange} />;
    case ActionType.APPLY_FORCE:
      return <ApplyForceForm action={action as ApplyForceAction} onChange={onChange} />;
    case ActionType.SET_GRAVITY_SCALE:
      return <SetGravityScaleForm action={action as SetGravityScaleAction} onChange={onChange} />;
    case ActionType.FREEZE_BODY:
      return <SimpleActionForm message="This action freezes the rigid body, stopping all movement." />;
    case ActionType.SET_FREEZE_ENABLED:
      return <SimpleActionForm message="This action enables or disables body freezing." />;
    case ActionType.SET_MASS:
      return <SetMassForm action={action as SetMassAction} onChange={onChange} />;
    case ActionType.SET_LINEAR_VELOCITY:
      return <SetLinearVelocityForm action={action as SetLinearVelocityAction} onChange={onChange} />;
    case ActionType.SET_ANGULAR_VELOCITY:
      return <SimpleActionForm message="This action sets the angular velocity of the body." />;
    case ActionType.SET_LOCK_ROTATION:
      return <SetLockRotationForm action={action as SetLockRotationAction} onChange={onChange} />;
    case ActionType.MOVE_AND_COLLIDE:
      return <MoveAndCollideForm action={action as MoveAndCollideAction} onChange={onChange} />;
    case ActionType.SET_CONSTANT_LINEAR_VELOCITY:
      return <SetConstantLinearVelocityForm action={action as SetConstantLinearVelocityAction} onChange={onChange} />;
    case ActionType.SET_CONSTANT_ANGULAR_VELOCITY:
      return <SimpleActionForm message="This action sets constant angular velocity for static body." />;
    case ActionType.GET_OVERLAPPING_BODIES:
      return <SimpleActionForm message="This action gets all bodies overlapping with this area." />;
    case ActionType.GET_OVERLAPPING_AREAS:
      return <SimpleActionForm message="This action gets all areas overlapping with this area." />;
    case ActionType.OVERLAPS_BODY:
      return <SimpleActionForm message="This action checks if a specific body overlaps with this area." />;
    case ActionType.OVERLAPS_AREA:
      return <SimpleActionForm message="This action checks if a specific area overlaps with this area." />;
    case ActionType.SET_MONITORING:
      return <SetMonitoringForm action={action as SetMonitoringAction} onChange={onChange} />;
    case ActionType.SET_MONITORABLE:
      return <SetMonitorableForm action={action as SetMonitorableAction} onChange={onChange} />;
    case ActionType.SET_GRAVITY:
      return <SetGravityForm action={action as SetGravityAction} onChange={onChange} />;
    case ActionType.SET_GRAVITY_VECTOR:
      return <SetGravityVectorForm action={action as SetGravityVectorAction} onChange={onChange} />;
    case ActionType.MOVE_AND_SLIDE:
      return <SimpleActionForm message="This action moves the character body with collision handling." />;
    case ActionType.IS_ON_FLOOR:
      return <SimpleActionForm message="This action checks if the character is on the floor." />;
    case ActionType.IS_ON_CEILING:
      return <SimpleActionForm message="This action checks if the character is hitting the ceiling." />;
    case ActionType.IS_ON_WALL:
      return <SimpleActionForm message="This action checks if the character is against a wall." />;
    case ActionType.GET_FLOOR_NORMAL:
      return <SimpleActionForm message="This action gets the floor surface normal vector." />;
    case ActionType.SET_VELOCITY:
      return <SetVelocityForm action={action as SetVelocityAction} onChange={onChange} />;
    case ActionType.SET_FLOOR_MAX_ANGLE:
      return <SimpleActionForm message="This action sets the maximum floor slope angle." />;
    case ActionType.SET_UP_DIRECTION:
      return <SetUpDirectionForm action={action as SetUpDirectionAction} onChange={onChange} />;
    case ActionType.SET_SHAPE:
      return <SimpleActionForm message="This action sets the collision shape for the collision object." />;
    case ActionType.SET_COLLISION_DISABLED:
      return <SetCollisionDisabledForm action={action as SetCollisionDisabledAction} onChange={onChange} />;
    case ActionType.SET_ONE_WAY_COLLISION:
      return <SetOneWayCollisionForm action={action as SetOneWayCollisionAction} onChange={onChange} />;
    case ActionType.SET_POLYGON:
      return <SimpleActionForm message="This action sets the polygon points for collision." />;
    case ActionType.SET_BUILD_MODE:
      return <SetBuildModeForm action={action as SetBuildModeAction} onChange={onChange} />;
    
    default:
      return <div className="text-xs text-muted-foreground">Form not implemented for this action type</div>;
  }
};
