import { createContext, useContext } from "react";
import { Project } from "@acme/db";

export const ProjectContext = createContext<Project | null | undefined>(null);

export const useProject = () => {
  const project = useContext(ProjectContext);
  if (project === null) {
    throw new Error("useProject must be called in a child of MainLayout");
  }

  return project;
};
