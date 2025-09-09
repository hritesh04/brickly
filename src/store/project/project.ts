import { Project, projectWithResource } from "@/actions/project/schema";

export class ProjectManager {
  project: projectWithResource | null = null;
  setProject(project: projectWithResource) {
    this.project = project;
  }
}
