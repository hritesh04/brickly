import { node } from "@/actions/node/schema";
import { INode, NodeType, Sprite2D } from "@/types/node";
import {
  AnimatedSprite2DProperty,
  CanvasItemProperty,
  Node2DProperty,
  Property,
  Sprite2DProperty,
  TransformProperty,
} from "@/types/property";
import { Resource } from "@/actions/resource/schema";
import { AssetType, ResourceType } from "@/types/resource";
// import { Property } from "@/types/property";
import { makeAutoObservable } from "mobx";
export class Editor {
  nodes: node[] = [];
  activeNode: node | null = null;
  resourceCounter: number = 0;
  resource: Resource[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  initScene(scene: node[]) {
    scene.map((s) => {
      this.nodes.push(s);
    });
  }

  addNode(node: node) {
    if (node.parentID) {
      const parentIdx = this.nodes.findIndex((n) => n.id == node.parentID);
      if (parentIdx === -1) throw new Error("parent node not found");
      this.nodes[parentIdx].children ??= [];
      this.nodes[parentIdx].children.push(node);
      return;
    }
    // const node = {
    // name: NodeType[type],
    // type: type,
    // property: {},
    // children: [],
    // } as INode;
    this.nodes.push(node);
    if (!this.activeNode) this.activeNode = this.nodes[0];
  }

  // addChild<T extends NodeType>(type: T) {
  //   if (!this.activeNode) throw new Error("no active scene");
  //   this.activeNode.children ??= [];
  //   const node = {
  //     name: NodeType[type],
  //     type,
  //     property: {},
  //     // children: [],
  //   } as INode;
  //   this.nodes.push(node);
  //   this.activeNode.children.push(node);
  //   this.activeNode = node;
  // }

  addResource(resource: Resource) {
    const path = "demoPath.png";

    if (resource.type === ResourceType.SubResource) {
      const parent = this.nodes.find((n) => {
        if (n.id === resource.parentID) return n;
        else n.children?.find((c) => c.id === resource.id);
      });
      if (!parent) return;
      // const resource = {
      //   id: ++this.resourceCounter,
      //   name: AssetType[assetType],
      //   assetType,
      //   type,
      //   // resType,
      //   // path,
      //   property: {} as Record<string, any>,
      // };
      parent.resource ??= [];
      parent.resource.push(resource);
    } else {
      // const resource = {
      //   id: ++this.resourceCounter,
      //   name: AssetType[assetType],
      //   assetType,
      //   type,
      //   path,
      // };
      this.resource.push(resource as Resource);
    }
  }

  attachResource(resName: string, nodeName: string) {
    const node = this.nodes.find((n) => n.name == nodeName);
    const res = this.resource.find((r) => r.name == resName);
    if (!node) throw new Error("node not found");
    if (!res) throw new Error("resource not found");
    node.resource ??= [];
    node.resource.push(res as Resource);
  }

  getNodes(): node[] {
    return this.nodes;
  }

  getActiveScene() {
    return this.activeNode;
  }

  setProperty<
    P extends keyof Property,
    SP extends keyof Property[P],
    V extends Property[P][SP] extends { value: infer U }
      ? Property[P][SP]
      : never
  >(property: P, subProperty: SP, value: V): void {
    if (!this.activeNode) {
      throw new Error("No active node selected");
    }
    if (this.activeNode.type == NodeType.Node) return;

    if (!this.activeNode.property) {
      this.activeNode.property = {} as Property;
    }

    if (!(property in (this.activeNode.property as Property))) {
      (this.activeNode.property as Property)[property] = {} as Property[P];
    }
    (this.activeNode.property as Property)[property][subProperty] = value;
  }

  saveAsScene(name: string) {
    const node = this.nodes.find((n) => n.name == name);
    // let resource = "";
    // if (node!.resource) {
    //   for (const res of node!.resource) resource += this.parseResource(res);
    // }
    const nodes = this.traverseChild(node as node);
    return `[gd_scene format=3]` + nodes.res + nodes.nodes;
  }

  traverseChild(node: node, parent?: string): { nodes: string; res: string } {
    const parentAttr = parent ? `parent="${parent}"` : "";
    let nodes = `\n\n[node name="${node.name}" type="${node.type}"${
      " " + parentAttr
    }]`;
    let res = "";

    if (node.type != NodeType.Node && node.property) {
      const { property, resource } = this.parseProperty(node);
      res = resource;
      nodes += property;
    }

    if (node.children) {
      for (const n of node.children) {
        const result = this.traverseChild(n as node, parent ? node.name : ".");
        nodes += result.nodes;
        res += result.res;
      }
    }
    return { res, nodes };
  }

  parseResource(resource: Resource) {
    let res = "";
    if (resource.type === ResourceType.ExtResource) {
      res += `\n\n[ext_resource type="${resource.assetType}" path="${resource.path}" id="${resource.id}"]`;
    } else {
      res += `\n\n[sub_resource type="${resource.assetType}" id="${resource.id}"]`;
      // + this.parseProperty(resource.property)
    }
    return res;
  }

  parseProperty(node: node): { property: string; resource: string } {
    // console.log("parsing property", node.property);
    let property = "";
    let resource = "";
    switch (node.type) {
      case NodeType.Node:
        if (node.resource) {
          for (const res of node.resource) {
            resource += this.parseResource(res);
            property += `\n${res.name.toLowerCase()} = ${res.type}("${
              res.id
            }")`;
          }
        }
        return { property, resource };
      case NodeType.Node2D:
        if (!node.property) return { property, resource };
        if (node.property.canvas) {
          property += this.getCanvasProperty(node.property.canvas);
        }
        if (node.property.transform) {
          property += this.getTransformProperty(node.property.transform);
        }
        if (node.resource) {
          for (const res of node.resource) {
            resource += this.parseResource(res);
            property += `\n${res.name.toLowerCase()} = ${res.type}("${
              res.id
            }")`;
          }
        }
        return { property, resource };
      case NodeType.Sprite2D:
        const sprite = node as Sprite2D;
        if (!sprite.property) return { property, resource };
        if (sprite.property.canvas) {
          property += this.getCanvasProperty(sprite.property.canvas);
        }
        if (sprite.property.transform) {
          property += this.getTransformProperty(sprite.property.transform);
        }
        if (node.resource) {
          for (const res of node.resource) {
            resource += this.parseResource(res);
            property += `\n${res.name.toLowerCase()} = ${res.type}("${
              res.id
            }")`;
          }
        }
    }
    return { property, resource };
  }

  getTransformProperty(transform: TransformProperty) {
    let property = "";
    if (
      transform.position &&
      (transform.position.value.x || transform.position.value.y)
    ) {
      property += `\n${transform.position.name} = ${transform.position.type}(${
        (transform.position.value.x, transform.position.value.y)
      })`;
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

  getCanvasProperty(canvas: CanvasItemProperty) {
    let property = "";
    if (!canvas.visible.value) {
      property += `\n${canvas.visible.name} = false`;
    }
    if (canvas.ZIndex.value) {
      property += `\n${canvas.ZIndex.name} = ${canvas.ZIndex.value}`;
    }
    return property;
  }

  setActiveNode(node: node) {
    this.activeNode = node;
  }
}
