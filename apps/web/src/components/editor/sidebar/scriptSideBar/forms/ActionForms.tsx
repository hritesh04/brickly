"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ActionType, EaseType, TransitionType, WaitType, BuildMode } from "@prisma/client";
import { action } from "@/actions/action/schema";

interface ActionFormProps {
  action: action;
  onChange: (action: action) => void;
}

const FormField = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-1">
    <Label className="text-xs font-medium">{label}</Label>
    {children}
  </div>
);

// Generic parameter form for actions
const ParameterForm = ({ action, onChange }: ActionFormProps) => {
  const parameters = action.parameters as Record<string, any> || {};

  const updateParameter = (key: string, value: any) => {
    const newParameters = { ...parameters, [key]: value };
    onChange({ ...action, parameters: newParameters });
  };

  const renderParameterField = (key: string, value: any, label: string) => {
    if (typeof value === 'boolean') {
      return (
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={value}
            onCheckedChange={(checked) => updateParameter(key, !!checked)}
          />
          <Label className="text-xs">{label}</Label>
        </div>
      );
    }

    if (typeof value === 'number') {
      return (
        <Input
          type="number"
          value={value}
          onChange={(e) => updateParameter(key, parseFloat(e.target.value) || 0)}
          className="h-8 text-xs"
        />
      );
    }

    if (typeof value === 'string') {
      if (value.length > 50) {
        return (
          <Textarea
            value={value}
            onChange={(e) => updateParameter(key, e.target.value)}
            className="h-16 text-xs"
          />
        );
      }
      return (
        <Input
          value={value}
          onChange={(e) => updateParameter(key, e.target.value)}
          className="h-8 text-xs"
        />
      );
    }

    if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        return (
          <Textarea
            value={JSON.stringify(value, null, 2)}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                updateParameter(key, parsed);
              } catch {
                // Invalid JSON, keep the text
              }
            }}
            className="h-20 text-xs font-mono"
            placeholder="Enter JSON array..."
          />
        );
      }
      return (
        <Textarea
          value={JSON.stringify(value, null, 2)}
          onChange={(e) => {
            try {
              const parsed = JSON.parse(e.target.value);
              updateParameter(key, parsed);
            } catch {
              // Invalid JSON, keep the text
            }
          }}
          className="h-20 text-xs font-mono"
          placeholder="Enter JSON object..."
        />
      );
    }

    return (
      <Input
        value={String(value)}
        onChange={(e) => updateParameter(key, e.target.value)}
        className="h-8 text-xs"
      />
    );
  };

  return (
    <div className="space-y-3">
      {Object.entries(parameters).map(([key, value]) => (
        <FormField key={key} label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}>
          {renderParameterField(key, value, key)}
        </FormField>
      ))}
      
      {Object.keys(parameters).length === 0 && (
        <p className="text-xs text-muted-foreground">
          No parameters available for this action type.
        </p>
      )}
    </div>
  );
};

// Specific forms for common action types
const MoveToForm = ({ action, onChange }: ActionFormProps) => {
  const parameters = action.parameters as Record<string, any> || {};
  
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <FormField label="Target X">
          <Input
            type="number"
            value={parameters.targetX || 0}
            onChange={(e) => {
              const newParameters = { ...parameters, targetX: parseFloat(e.target.value) || 0 };
              onChange({ ...action, parameters: newParameters });
            }}
            className="h-8 text-xs"
          />
        </FormField>
        <FormField label="Target Y">
          <Input
            type="number"
            value={parameters.targetY || 0}
            onChange={(e) => {
              const newParameters = { ...parameters, targetY: parseFloat(e.target.value) || 0 };
              onChange({ ...action, parameters: newParameters });
            }}
            className="h-8 text-xs"
          />
        </FormField>
      </div>
      <FormField label="Duration">
        <Input
          type="number"
          value={parameters.duration || 1}
          onChange={(e) => {
            const newParameters = { ...parameters, duration: parseFloat(e.target.value) || 1 };
            onChange({ ...action, parameters: newParameters });
          }}
          className="h-8 text-xs"
        />
      </FormField>
    </div>
  );
};

const MoveByForm = ({ action, onChange }: ActionFormProps) => {
  const parameters = action.parameters as Record<string, any> || {};
  
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <FormField label="Delta X">
          <Input
            type="number"
            value={parameters.deltaX || 0}
            onChange={(e) => {
              const newParameters = { ...parameters, deltaX: parseFloat(e.target.value) || 0 };
              onChange({ ...action, parameters: newParameters });
            }}
            className="h-8 text-xs"
          />
        </FormField>
        <FormField label="Delta Y">
          <Input
            type="number"
            value={parameters.deltaY || 0}
            onChange={(e) => {
              const newParameters = { ...parameters, deltaY: parseFloat(e.target.value) || 0 };
              onChange({ ...action, parameters: newParameters });
            }}
            className="h-8 text-xs"
          />
        </FormField>
      </div>
      <FormField label="Duration">
        <Input
          type="number"
          value={parameters.duration || 1}
          onChange={(e) => {
            const newParameters = { ...parameters, duration: parseFloat(e.target.value) || 1 };
            onChange({ ...action, parameters: newParameters });
          }}
          className="h-8 text-xs"
        />
      </FormField>
    </div>
  );
};

const SetVisibleForm = ({ action, onChange }: ActionFormProps) => {
  const parameters = action.parameters as Record<string, any> || {};
  
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={parameters.visible !== false}
          onCheckedChange={(checked) => {
            const newParameters = { ...parameters, visible: !!checked };
            onChange({ ...action, parameters: newParameters });
          }}
        />
        <Label className="text-xs">Visible</Label>
      </div>
    </div>
  );
};

const PrintForm = ({ action, onChange }: ActionFormProps) => {
  const parameters = action.parameters as Record<string, any> || {};
  
  return (
    <div className="space-y-3">
      <FormField label="Message">
        <Input
          value={parameters.message || ""}
          onChange={(e) => {
            const newParameters = { ...parameters, message: e.target.value };
            onChange({ ...action, parameters: newParameters });
          }}
          className="h-8 text-xs"
          placeholder="Debug message..."
        />
      </FormField>
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={parameters.includeNodeName || false}
          onCheckedChange={(checked) => {
            const newParameters = { ...parameters, includeNodeName: !!checked };
            onChange({ ...action, parameters: newParameters });
          }}
        />
        <Label className="text-xs">Include node name in output</Label>
      </div>
    </div>
  );
};

const WaitForm = ({ action, onChange }: ActionFormProps) => {
  const parameters = action.parameters as Record<string, any> || {};
  
  return (
    <div className="space-y-3">
      <FormField label="Duration">
        <Input
          type="number"
          value={parameters.duration || 1}
          onChange={(e) => {
            const newParameters = { ...parameters, duration: parseFloat(e.target.value) || 1 };
            onChange({ ...action, parameters: newParameters });
          }}
          className="h-8 text-xs"
        />
      </FormField>
      <FormField label="Wait Type">
        <Select
          value={parameters.waitType || WaitType.SECONDS}
          onValueChange={(value) => {
            const newParameters = { ...parameters, waitType: value };
            onChange({ ...action, parameters: newParameters });
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={WaitType.SECONDS}>Seconds</SelectItem>
            <SelectItem value={WaitType.FRAMES}>Frames</SelectItem>
          </SelectContent>
        </Select>
      </FormField>
    </div>
  );
};

const CustomCodeForm = ({ action, onChange }: ActionFormProps) => {
  const parameters = action.parameters as Record<string, any> || {};
  
  return (
    <div className="space-y-3">
      <FormField label="GDScript Code">
        <Textarea
          value={parameters.code || ""}
          onChange={(e) => {
            const newParameters = { ...parameters, code: e.target.value };
            onChange({ ...action, parameters: newParameters });
          }}
          className="h-32 text-xs font-mono"
          placeholder="# Enter your GDScript code here..."
        />
      </FormField>
    </div>
  );
};

export const ActionFormRenderer = ({ action, onChange }: ActionFormProps) => {
  switch (action.type) {
    case ActionType.MOVE_TO:
      return <MoveToForm action={action} onChange={onChange} />;
    case ActionType.MOVE_BY:
      return <MoveByForm action={action} onChange={onChange} />;
    case ActionType.SET_VISIBLE:
      return <SetVisibleForm action={action} onChange={onChange} />;
    case ActionType.PRINT:
      return <PrintForm action={action} onChange={onChange} />;
    case ActionType.WAIT:
      return <WaitForm action={action} onChange={onChange} />;
    case ActionType.CUSTOM_CODE:
      return <CustomCodeForm action={action} onChange={onChange} />;
    default:
      return <ParameterForm action={action} onChange={onChange} />;
  }
};
