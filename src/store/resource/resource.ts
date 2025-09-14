import { makeAutoObservable } from "mobx";
import { Resource } from "@/actions/resource/schema";
import { ResourceProperty } from "@/types/property";
import { updateResource } from "@/actions/resource";

export class ResourceStore {
  resources: Map<number, Resource> = new Map();
  activeResource: Resource | null = null;
  saveTimer: NodeJS.Timeout | null = null;
  dirty: boolean = false;
  constructor() {
    makeAutoObservable(this);
    this.autoSave();
  }

  autoSave() {
    if (this.saveTimer) clearInterval(this.saveTimer);

    this.saveTimer = setInterval(() => {
      try {
        this.save();
      } catch (error) {
        console.error("Failed to save node:", error);
      }
    }, 3000);
  }

  save() {
    if (!this.activeResource || !this.activeResource.id || !this.dirty) return;
    try {
      updateResource({
        id: this.activeResource.id,
        property: JSON.stringify({ ...this.activeResource.property }),
      });
      this.dirty = false;
    } catch (error) {
      console.error("Failed to save node:", error);
    }
  }

  add(resource: Resource[]) {
    resource.map((r) => this.resources.set(r.id, r));
  }

  setActiveResource(resource: Resource) {
    this.save();
    this.activeResource = resource;
  }

  remove(id: number) {
    this.resources.delete(id);
  }

  clearActive() {
    this.save();
    this.activeResource = null;
  }

  getById(id: number) {
    return this.resources.get(id) || null;
  }

  setResourceProperty<
    P extends keyof ResourceProperty,
    SP extends keyof ResourceProperty[P],
    V extends ResourceProperty[P][SP]
  >(id: number, property: P, subProperty: SP, value: V): void {
    if (!this.activeResource) {
      throw new Error("No active node selected");
    }

    if (!this.activeResource.property) {
      this.activeResource.property = {} as ResourceProperty;
    }

    if (!(property in (this.activeResource.property as ResourceProperty))) {
      (this.activeResource.property as ResourceProperty)[property] =
        {} as ResourceProperty[P];
    }
    (this.activeResource.property as ResourceProperty)[property][subProperty] =
      value;
    this.dirty = true;
  }
}
