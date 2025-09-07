import { Project } from "@/actions/project/schema";

export class ProjectManager {
  project: Project | null = null;
  setProject(project: Project) {
    this.project = project;
  }
}
