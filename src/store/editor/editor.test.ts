import { useEditor } from "./editor";
import { NodeType } from "@/types/node";
import { Node } from "@/types/node";
import { Node2DProperty } from "@/types/property";
import { variant } from "@/types/variant";
import { Property } from "@/types/property";
import { AssetType, ResourceType } from "@/types/resource";

describe("Editor", () => {
  const editor = new useEditor();
  it("all nodes should be empty array", () => {
    expect(editor.getNodes()).toEqual([]);
  });
  it("active scene should be null", () => {
    expect(editor.getActiveScene()).toBeNull();
  });
  it("should throw error while adding child", () => {
    expect(() => editor.addChild(NodeType.Node2D)).toThrow("no active scene");
  });
  it("should add a scene", () => {
    editor.addNode(NodeType.Node);
    expect(editor.getNodes()).toEqual<Node[]>([
      { name: "Node", type: NodeType.Node },
    ]);
  });
  it("should add a child to scene", () => {
    editor.addChild(NodeType.Node2D);
    expect(editor.getNodes()).toEqual<Node[]>([
      {
        name: "Node",
        type: NodeType.Node,
        children: [
          {
            name: "Node2D",
            type: NodeType.Node2D,
            property: {} as Node2DProperty,
          },
        ],
      },
      { name: "Node2D", type: NodeType.Node2D, property: {} as Node2DProperty },
    ]);
  });
  it("should show gdscript file", () => {
    editor.setProperty("transform", "rotation", {
      name: "rotation",
      type: variant.Float,
      value: 2.1,
    });
    editor.addResource(AssetType.Script, ResourceType.ExtResource);
    editor.attachResource("Script", "Node2D");
    console.log(editor.getActiveScene());
    console.log(editor.saveAsScene("Node2D"));
  });
});
