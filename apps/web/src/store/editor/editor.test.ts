import { Editor } from "./editor";
import { NodeType, variant } from "@brickly/types";
import { node } from "@/actions/node/schema";
import { AssetType, ResourceType } from "@prisma/client";

describe("Editor", () => {
  const editor = new Editor();
  it("all nodes should be empty array", () => {
    expect(editor.getNodes()).toEqual([]);
  });
  it("active scene should be null", () => {
    expect(editor.getActiveScene()).toBeNull();
  });
  it("should throw error while adding child", () => {
    expect(() =>
      editor.addNode({ id: 1, name: "Node", type: "Node", parentID: 1 } as node)
    ).toThrow("parent node not found");
  });
  it("should add a scene", () => {
    editor.addNode({
      id: 1,
      name: "Node",
      type: "Node",
      projectID: 1,
      parentID: null,
      property: {},
    } as node);
    expect(editor.getNodes()).toEqual<node[]>([
      {
        id: 1,
        name: "Node",
        type: NodeType.Node,
        projectID: 1,
        parentID: null,
        property: {},
      },
    ]);
  });
  it("should add a child to scene", () => {
    editor.addNode({
      id: 2,
      name: "Node2D",
      type: "Node2D",
      parentID: 1,
      projectID: null,
      property: {},
    } as node);
    expect(editor.getNodes()).toEqual<node[]>([
      {
        id: 1,
        name: "Node",
        type: NodeType.Node,
        children: [
          {
            id: 2,
            name: "Node2D",
            type: NodeType.Node2D,
            projectID: null,
            parentID: 1,
            property: {},
          },
        ],
        projectID: 1,
        // resource: null,
        parentID: null,
        property: {},
      },
    ]);
  });
  it("should show gdscript file", () => {
    editor.setProperty("transform", "rotation", {
      name: "rotation",
      type: variant.Float,
      value: 2.1,
    });
    console.log(editor.getActiveScene());
    editor.addResource({
      id: 1,
      name: "testScript",
      path: "demoPath.gd",
      parentID: null,
      projectID: 1,
      property: {},
      assetType: AssetType.Script,
      type: ResourceType.ExtResource,
    });
    // console.log(editor.getNodes());
    console.log(editor.saveAsScene());
  });
});
