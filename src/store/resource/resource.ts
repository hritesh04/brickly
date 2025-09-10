import { makeAutoObservable } from "mobx";
import { Resource } from "@/actions/resource/schema";
import { projectWithResource } from "@/actions/project/schema";
import { node } from "@/actions/node/schema";
import { CollisionShapeType, Property } from "@/types/property";
import { SubResource } from "@/types/resource";
import { updateResource } from "@/actions/resource";

export class ResourceStore {
  resources: Map<number, Resource> = new Map();
  activeResource: Resource | null = null;
  saveTimer: NodeJS.Timeout | null = null;
  constructor() {
    makeAutoObservable(this);
  }

  autoSave() {
    if (!this.activeResource) return;
    try {
      updateResource({
        id: this.activeResource.id,
        property: JSON.stringify({ ...this.activeResource.property }),
      });
    } catch (error) {
      console.error("Failed to save node:", error);
    }
  }

  add(resource: Resource[]) {
    resource.map((r) => this.resources.set(r.id, r));
  }

  setActiveResource(resource: Resource) {
    this.activeResource = resource;
  }

  remove(id: number) {
    this.resources.delete(id);
  }

  clearActive() {
    this.autoSave();
    this.activeResource = null;
  }

  getById(id: number) {
    return this.resources.get(id) || null;
  }

  setResourceProperty<
    P extends keyof Property,
    SP extends keyof Property[P],
    V extends Property[P][SP]
  >(id: number, property: P, subProperty: SP, value: V): void {
    if (!this.activeResource) {
      throw new Error("No active node selected");
    }

    if (!this.activeResource.property) {
      this.activeResource.property = {} as Property;
    }

    if (!(property in (this.activeResource.property as Property))) {
      (this.activeResource.property as Property)[property] = {} as Property[P];
    }
    (this.activeResource.property as Property)[property][subProperty] = value;
  }
}
