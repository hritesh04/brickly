import { ObjectStore } from "./lib/objectStore";
import tmp from "tmp";
import { writeFile } from "fs/promises";

export const parseProject = async (project: any) => {
  const objStore = ObjectStore.getInstance();
  const tmpDir = tmp.dirSync({ unsafeCleanup: true });
  const scenes = project.scenes;
  const resources: any[] = project.resources;
  for (const r of resources) {
    if (!r.path) continue;
    const obj = await objStore.getFile(r.path);
    if (!obj) return;
    const buff = await obj.transformToByteArray();
    await writeFile(tmpDir.name + "/" + r.path, buff);
  }
  for (const s of scenes) {
    if (!s.parentID) {
      const nodes = parseNode(s);
      const file = `[gd_scene format=3]` + nodes.res + nodes.nodes;
      console.log(file);
    }
  }
  tmpDir.removeCallback();
};

function parseNode(node: any, parent?: string) {
  const parentAttr = parent ? `parent="${parent}"` : "";
  let nodes = `\n\n[node name="${node.name}" type="${node.type}"${
    parentAttr ?? parentAttr
  }]`;
  let res = "";

  if (node.property) {
    const { property, resource } = parseProperty(node);
    res = resource;
    nodes += property;
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
          property += `\n${res.name.toLowerCase()} = ${res.type}("${res.id}")`;
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
          property += `\n${res.name.toLowerCase()} = ${res.type}("${res.id}")`;
        }
      }
      return { property, resource };
    case "Sprite2D":
    case "Area2D":
    case "CollisionShape2D":
    case "StaticBody2D":
      const sprite = node;
      if (!sprite.property) return { property, resource };
      if (sprite.property.canvas) {
        property += getCanvasProperty(sprite.property.canvas);
      }
      if (sprite.property.transform) {
        property += getTransformProperty(sprite.property.transform);
      }
      if (sprite.property.sprite_2d.texture) {
        const texture = sprite.property.sprite_2d.texture;
        // for (const res of node.resources) {
        // console.log(res);
        const res = node.resources.find(
          (r: any) => r.id == Number(texture.value)
        );
        resource += parseResource(res);
        // console.log(res);
        property +=
          `\n${texture.name.toLowerCase()} = ${res.type}("${res.id}")` +
          parseProperty(res).property;
        // }
      }
  }
  return { property, resource };
}

function parseResource(resource: any) {
  let res = "";
  if (resource.type === "ExtResource") {
    res += `\n\n[ext_resource type="${resource.assetType}" path="${resource.path}" id="${resource.id}"]`;
  } else {
    res += `\n\n[sub_resource type="${resource.assetType}" id="${resource.id}"]`;
    // + this.parseProperty(resource.property)
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
