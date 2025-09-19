import { ObjectStore } from "./lib/objectStore";
import tmp from "tmp";
import { writeFile } from "fs/promises";
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
