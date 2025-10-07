import { ObjectStore } from "./lib/objectStore";
import tmp from "tmp";
import { writeFile, mkdir } from "fs/promises";
import BuildQueue from "./lib/rabbitmq";
import { execSync } from "child_process";

export const parseProject = async (project: any): Promise<string> => {
  const queue = BuildQueue.getInstance();
  const objStore = ObjectStore.getInstance();
  const tmpDir = tmp.dirSync({ unsafeCleanup: true });
  const scenes = project.scenes;
  const resources: any[] = project.resources;
  const zipDir = tmpDir.name + ".tar.gz";
  for (const r of resources) {
    if (!r.path) continue;
    const obj = await objStore.getFile(r.path);
    if (!obj) throw new Error("Assets file not found");
    const buff = await obj.transformToByteArray();
    await writeFile(tmpDir.name + "/" + r.path, buff);
  }
  for (const s of scenes) {
    let file = "[gd_scene format=3]";
    if (s.projectID) {
      const nodes = parseNode(s);
      file = file + nodes.res + nodes.nodes;
    }
    console.log(`${s.name} content :\n`, file);
    await writeFile(tmpDir.name + "/" + s.name + ".tscn", file);
  }

  // Write script files
  await writeScriptFiles(project, tmpDir.name);
  await writeFile(
    tmpDir.name + "/project.godot",
    `
; Engine configuration file.
; It's best edited using the editor UI and not directly,
; since the parameters that go here are not all obvious.

config_version=5

[application]

config/name="${project.name}"
run/main_scene="res://Node2D.tscn"
config/features=PackedStringArray("4.4", "GL Compatibility")
; config/icon="res://icon.svg"

[rendering]

renderer/rendering_method="gl_compatibility"
renderer/rendering_method.mobile="gl_compatibility"
textures/vram_compression/import_etc2_astc=true
`
  );

  await writeFile(
    tmpDir.name + "/export_presets.cfg",
    `[preset.0]

name="Web"
platform="Web"
runnable=true
advanced_options=false
dedicated_server=false
custom_features=""
export_filter="all_resources"
include_filter=""
exclude_filter=""
export_path="Web/index.html"
patches=PackedStringArray()
encryption_include_filters=""
encryption_exclude_filters=""
seed=0
encrypt_pck=false
encrypt_directory=false
script_export_mode=2

[preset.0.options]

custom_template/debug=""
custom_template/release=""
variant/extensions_support=false
variant/thread_support=false
vram_texture_compression/for_desktop=true
vram_texture_compression/for_mobile=true
html/export_icon=true
html/custom_html_shell=""
html/head_include=""
html/canvas_resize_policy=2
html/focus_canvas_on_start=true
html/experimental_virtual_keyboard=false
progressive_web_app/enabled=false
progressive_web_app/ensure_cross_origin_isolation_headers=true
progressive_web_app/offline_page=""
progressive_web_app/display=1
progressive_web_app/orientation=0
progressive_web_app/icon_144x144=""
progressive_web_app/icon_180x180=""
progressive_web_app/icon_512x512=""
progressive_web_app/background_color=Color(0, 0, 0, 1)`
  );

  execSync(`tar -czf ${zipDir} -C ${tmpDir.name} .`);
  tmpDir.removeCallback();
  return zipDir;
};

function parseNode(node: any, parent?: string) {
  const parentAttr = parent ? ` parent="${parent}"` : "";
  const isExtRes =
    parent && node.projectID ? ` instance=ExtResource("scene-${node.id}")` : "";

  let nodes = `\n\n[node name="${node.name}" type="${node.type}"${parentAttr}${isExtRes}]`;
  let res = "";

  if (isExtRes) {
    res += `\n[ext_resource type="PackedScene" path="res://${node.name}.tscn" id="scene-${node.id}"]`;
    return { nodes, res };
  }
  if (node.property) {
    const { property, resource } = parseProperty(node);
    nodes += property;
    res += resource;
  }

  // Parse signals
  if (node.signals && node.signals.length > 0) {
    const { signalConnections, signalResources } = parseSignals(node.signals, node.name);
    nodes += signalConnections;
    res += signalResources;
  }

  // Parse scripts
  if (node.scripts && node.scripts.length > 0) {
    const { scriptConnections, scriptResources } = parseScripts(node.scripts, node.name);
    nodes += scriptConnections;
    res += scriptResources;
  }

  if (node.children) {
    for (const n of node.children) {
      const result = parseNode(n, parent ? node.name : ".");
      nodes += result.nodes;
      res += result.res;
    }
  }

  return { res, nodes };
}

function parseProperty(node: any): { property: any; resource: any } {
  let property = "";
  let resource = "";
  switch (node.type) {
    case "Node":
      if (node.resource) {
        for (const res of node.resource) {
          resource += parseResource(res);
          property += `\n${res.name.toLowerCase()} = ${res.type}("res-${
            res.id
          }")`;
        }
      }
      return { property, resource };
    case "Node2D":
      if (!node.property) return { property, resource };
      if (node.property.canvas) {
        property += getCanvasProperty(node.property.canvas);
      }
      if (node.property.transform) {
        property += getTransformProperty(node.property.transform);
      }
      if (node.resource) {
        for (const res of node.resource) {
          resource += parseResource(res);
          property += `\n${res.name.toLowerCase()} = ${res.type}("res-${
            res.id
          }")`;
        }
      }
      return { property, resource };
    case "Sprite2D":
    case "Area2D":
    case "CollisionShape2D":
    case "StaticBody2D":
    case "RigidBody2D":
      const sprite = node;
      if (!sprite.property) return { property, resource };
      if (sprite.property?.canvas) {
        property += getCanvasProperty(sprite.property.canvas);
      }
      if (sprite.property?.transform) {
        property += getTransformProperty(sprite.property.transform);
      }
      if (sprite?.property?.sprite_2d?.texture) {
        const texture = sprite.property.sprite_2d.texture;

        const res = sprite.resource.find(
          (r: any) => r.id == Number(texture.value)
        );
        resource += parseResource(res);
        property +=
          `\n${texture.name.toLowerCase()} = ${res.type}("res-${res.id}")` +
          parseProperty(res).property;
      }
      if (sprite?.property?.collision?.shape) {
        const shape = sprite.property.collision.shape;
        const res = sprite.resource.find(
          (r: any) => r.id == Number(shape.value)
        );
        resource += parseResource(res);
        property +=
          `\n${shape.name.toLowerCase()} = ${res.type}("res-${res.id}")` +
          parseProperty(res).property;
      }
  }
  return { property, resource };
}

function parseResourceProperty(resource: any): string {
  let property = "";
  if (!resource.property) return property;

  switch (resource.assetType) {
    case "RectangleShape2D":
    case "CircleShape2D":
    case "CapsuleShape2D":
    case "SegmentShape2D":
      if (resource.property?.collision?.shape) {
        const shape = resource.property.collision.shape;
        if (shape.value.a) {
          property += `\na = ${shape.type}(${Number(shape.value.a.x)}, ${Number(shape.value.a.y)})`;
        }
        if (shape.value.b) {
          property += `\nb = ${shape.type}(${Number(shape.value.b.x)}, ${Number(shape.value.b.y)})`;
        }
        if (shape.value.radius) {
          property += `\nradius = ${Number(shape.value.radius)}`;
        }
        if (shape.value.size) {
          property += `\nsize = ${shape.type}(${Number(shape.value.size.x)}, ${Number(shape.value.size.y)})`;
        }
        if (shape.value.height) {
          property += `\nheight = ${Number(shape.value.height)}`;
        }
      }
      break;
      
    default:
      break;
  }
  return property;
}

function parseResource(resource: any) {
  let res = "";
  if (resource.type === "ExtResource") {
    res += `\n\n[ext_resource type="${resource.assetType}" path="res://${resource.path}" id="res-${resource.id}"]`;
  } else {
    res += `\n\n[sub_resource type="${resource.assetType}" id="res-${resource.id}"]`;
    res += parseResourceProperty(resource);
  }
  return res;
}

function getTransformProperty(transform: any) {
  let property = "";
  if (
    transform.position &&
    (transform.position.value.x || transform.position.value.y)
  ) {
    property += `\n${transform.position.name} = ${transform.position.type}(${transform.position.value.x},${transform.position.value.y})`;
  }
  if (transform.rotation && transform.rotation.value) {
    property += `\n${transform.rotation.name} = ${transform.rotation.value}`;
  }
  if (
    transform.scale &&
    (transform.scale.value.x != 1.0 || transform.scale.value.y != 1.0)
  ) {
    property += `\n${transform.scale.name} = ${transform.scale.type}(${
      (transform.scale.value.x, transform.scale.value.y)
    })`;
  }
  if (transform.skew && transform.skew.value) {
    property += `\n${transform.skew.name} = ${transform.skew.value}`;
  }
  return property;
}

function getCanvasProperty(canvas: any) {
  let property = "";
  if (!canvas.visible.value) {
    property += `\n${canvas.visible.name} = false`;
  }
  if (canvas.ZIndex.value) {
    property += `\n${canvas.ZIndex.name} = ${canvas.ZIndex.value}`;
  }
  return property;
}

function parseSignals(signals: any[], nodeName: string): { signalConnections: string; signalResources: string } {
  let signalConnections = "";
  let signalResources = "";

  for (const signal of signals) {
    if (!signal || !signal.name) continue;

    // Add signal connection
    signalConnections += `\n[connection signal="${signal.name}" from="${nodeName}" to="${getNodeNameById(signal.toID)}" method="${signal.script}"]`;

    // If the signal has a script, add it as a resource
    if (signal.script && signal.script.trim()) {
      const scriptId = `signal_script_${signal.id}`;
      signalResources += `\n\n[ext_resource type="Script" path="res://scripts/${signal.script}.gd" id="${scriptId}"]`;
    }
  }

  return { signalConnections, signalResources };
}

function parseScripts(scripts: any[], nodeName: string): { scriptConnections: string; scriptResources: string } {
  let scriptConnections = "";
  let scriptResources = "";

  for (const script of scripts) {
    if (!script || !script.name) continue;

    // Add script resource
    const scriptId = `script_${script.id}`;
    scriptResources += `\n\n[ext_resource type="Script" path="res://scripts/${script.name}.gd" id="${scriptId}"]`;
    
    // Add script connection to the node
    scriptConnections += `\nscript = ExtResource("${scriptId}")`;

    // Generate GDScript content from actions and triggers
    const gdScriptContent = generateGDScript(script);
    if (gdScriptContent) {
      // Write the script file (this would be handled by the file writing logic)
      // For now, we'll just add the script reference
    }
  }

  return { scriptConnections, scriptResources };
}

function generateGDScript(script: any): string {
  let gdScript = `extends Node2D\n\n`;
  
  // Add signal declarations
  if (script.triggers && script.triggers.length > 0) {
    for (const trigger of script.triggers) {
      if (trigger.type === 'ready') {
        gdScript += `func _ready():\n`;
        gdScript += generateActionCode(script.actions, trigger.id);
        gdScript += `\n`;
      } else if (trigger.type === 'input') {
        gdScript += `func _input(event):\n`;
        gdScript += generateActionCode(script.actions, trigger.id);
        gdScript += `\n`;
      } else if (trigger.type === 'process') {
        gdScript += `func _process(delta):\n`;
        gdScript += generateActionCode(script.actions, trigger.id);
        gdScript += `\n`;
      } else if (trigger.type === 'physics_process') {
        gdScript += `func _physics_process(delta):\n`;
        gdScript += generateActionCode(script.actions, trigger.id);
        gdScript += `\n`;
      }
    }
  }

  // Add custom functions for actions
  if (script.actions && script.actions.length > 0) {
    gdScript += generateActionFunctions(script.actions);
  }

  return gdScript;
}

function generateActionCode(actions: any[], triggerId: number): string {
  let code = "";
  const triggerActions = actions.filter((action: any) => action.triggerID === triggerId);
  
  for (const action of triggerActions) {
    if (!action.enabled) continue;
    
    code += `\t${generateActionStatement(action)}\n`;
  }
  
  return code;
}

function generateActionFunctions(actions: any[]): string {
  let functions = "";
  const uniqueActions = actions.filter((action: any, index: number, self: any[]) => 
    self.findIndex(a => a.type === action.type) === index
  );

  for (const action of uniqueActions) {
    if (!action.enabled) continue;
    
    functions += `func ${action.name.toLowerCase().replace(/\s+/g, '_')}():\n`;
    functions += `\t${generateActionStatement(action)}\n\n`;
  }

  return functions;
}

function generateActionStatement(action: any): string {
  const params = action.parameters || {};
  
  switch (action.type) {
    case 'MOVE_TO':
      return `tween_property(self, "position", Vector2(${params.targetX || 0}, ${params.targetY || 0}), ${params.duration || 1.0})`;
    
    case 'MOVE_BY':
      return `position += Vector2(${params.deltaX || 0}, ${params.deltaY || 0})`;
    
    case 'ROTATE_TO':
      return `rotation = ${params.targetRotation || 0}`;
    
    case 'ROTATE_BY':
      return `rotation += ${params.deltaRotation || 0}`;
    
    case 'SCALE_TO':
      return `scale = Vector2(${params.targetScaleX || 1}, ${params.targetScaleY || 1})`;
    
    case 'SCALE_BY':
      return `scale *= Vector2(${params.scaleX || 1}, ${params.scaleY || 1})`;
    
    case 'SET_VISIBLE':
      return `visible = ${params.visible || true}`;
    
    case 'PRINT':
      return `print("${params.message || 'Hello World'}")`;
    
    case 'WAIT':
      return `await get_tree().create_timer(${params.duration || 1.0}).timeout`;
    
    case 'EMIT_SIGNAL':
      return `emit_signal("${params.signalName || 'custom_signal'}")`;
    
    case 'CUSTOM_CODE':
      return params.code || 'pass';
    
    default:
      return `# ${action.type} - ${action.name}`;
  }
}

function getNodeNameById(nodeId: number): string {
  // This would need to be implemented to map node IDs to names
  // For now, return a placeholder
  return `Node_${nodeId}`;
}

async function writeScriptFiles(project: any, tmpDir: string): Promise<void> {
  // Create scripts directory
  const scriptsDir = `${tmpDir}/scripts`;
  await mkdir(scriptsDir, { recursive: true });

  // Collect all scripts from all scenes
  const allScripts: any[] = [];
  
  for (const scene of project.scenes) {
    if (scene.scripts) {
      allScripts.push(...scene.scripts);
    }
    
    // Also collect scripts from child nodes
    const collectScriptsFromNode = (node: any) => {
      if (node.scripts) {
        allScripts.push(...node.scripts);
      }
      if (node.children) {
        for (const child of node.children) {
          collectScriptsFromNode(child);
        }
      }
    };
    
    collectScriptsFromNode(scene);
  }

  // Write each script file
  for (const script of allScripts) {
    if (!script || !script.name) continue;
    
    const gdScriptContent = generateGDScript(script);
    const scriptPath = `${scriptsDir}/${script.name}.gd`;
    await writeFile(scriptPath, gdScriptContent);
    console.log(`Generated script: ${scriptPath}`);
  }
}
