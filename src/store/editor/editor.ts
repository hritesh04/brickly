import { Node, NodeType } from "@/types/node";
import {
  AnimatedSprite2DProperty,
  CanvasItemProperty,
  Node2DProperty,
  Property,
  Sprite2DProperty,
  TransformProperty,
} from "@/types/property";
import { AssetType, Resource, ResourceType } from "@/types/resource";
// import { Property } from "@/types/property";

export class useEditor {
  nodes: Node[] = [];
  activeNode: Node | null = null;
  resourceCounter: number = 0;
  resource: Resource[] = [];
  constructor() {}

  addNode<T extends NodeType>(type: T) {
    const node = {
      name: NodeType[type],
      type: type,
      // property: {},
      // children: [],
    } as Node;
    this.nodes.push(node);
    if (!this.activeNode) this.activeNode = this.nodes[0];
  }

  addChild<T extends NodeType>(type: T) {
    if (!this.activeNode) throw new Error("no active scene");
    this.activeNode.children ??= [];
    const node = {
      name: NodeType[type],
      type,
      property: {},
      // children: [],
    } as Node;
    this.nodes.push(node);
    this.activeNode.children.push(node);
    this.activeNode = node;
  }

  addResource(type: AssetType, resType: ResourceType) {
    const path = "demoPath.png";

    if (resType === ResourceType.SubResource) {
      const resource: Resource = {
        id: ++this.resourceCounter,
        name: AssetType[type],
        type,
        resType,
        path,
        property: {} as Record<string, any>,
      };
      this.resource.push(resource);
    } else {
      const resource: Resource = {
        id: ++this.resourceCounter,
        name: AssetType[type],
        type,
        resType,
        path,
      };
      this.resource.push(resource);
    }
  }

  attachResource(resName: string, nodeName: string) {
    const node = this.nodes.find((n) => n.name == nodeName);
    const res = this.resource.find((r) => r.name == resName);
    if (!node) throw new Error("node not found");
    if (!res) throw new Error("resource not found");
    node.resource ??= [];
    node.resource.push(res);
  }

  getNodes(): Node[] {
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
    let resource = "";
    if (node!.resource) {
      for (const res of node!.resource) resource += this.parseResource(res);
    }
    const nodes = this.traverseChild(node!);
    // console.log(`[gdscene format=3]`);
    return `[gd_scene format=3]` + resource + nodes;
  }

  traverseChild(node: Node, parent?: string) {
    const parentAttr = parent ? `parent="${parent}"` : "";
    let result = `\n\n[node name="${node.name}" type="${node.type}"${
      " " + parentAttr
    }]`;

    if (node.type != NodeType.Node && node.property) {
      result += this.parseProperty(node);
    }

    if (node.children) {
      for (const n of node.children) {
        result += this.traverseChild(n, parent ? node.name : ".");
      }
    }
    return result;
  }

  parseResource(resource: Resource) {
    let res = "";
    if (resource.resType == ResourceType.ExtResource) {
      res += `\n\n[ext_resource type="${resource.type}" path="${resource.path}" id="${resource.id}"]`;
    }
    return res;
  }

  parseProperty(node: Node) {
    // console.log("parsing property", node.property);
    let property = "";
    switch (node.type) {
      case NodeType.Node:
        return;
      case NodeType.Node2D:
        if (node.property.canvas) {
          property += this.getCanvasProperty(node.property.canvas);
        }
        if (node.property.transform) {
          property += this.getTransformProperty(node.property.transform);
        }
    }
    return property;
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

  setActiveNode(name: string) {
    this.activeNode = this.nodes.find((n) => n.name === name)!;
  }
}
