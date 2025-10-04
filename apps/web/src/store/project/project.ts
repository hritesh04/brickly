import { projectWithResource } from "@/actions/project/schema";
import { resourceStore } from "@/store/resource";

export class ProjectManager {
  project: projectWithResource | null = null;
  setProject(project: projectWithResource) {
    this.project = project;
    if (project.resource) resourceStore.add(project.resource);
  }
}
