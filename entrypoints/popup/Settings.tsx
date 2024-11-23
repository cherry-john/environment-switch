import { projectStorage } from "@/utilities/storage";
import { useState, useEffect } from "react";
import AddIcon from "@/assets/AddIcon"
import ProjectEntry from "@/components/ProjectEntry";
import DeleteIcon from "@/assets/DeleteIcon";

export default function Settings() {

  const [projects, setProjects] = useState<Project[]>([]);

  const [selectedProject, setSelectedProject] = useState<Project | undefined>(undefined);

  useEffect(() => {
    (async () => {
      setProjects(await projectStorage.getValue());
    })();
  }, []);

  async function handleUpdateProject(project: Project) {
    const updatedProjects = projects.map((thisProject) =>
      thisProject.id === project.id ? project : thisProject,
    );
    setProjects(updatedProjects);
    await projectStorage.setValue(updatedProjects);
  }

  async function createNewProject() {
    setProjects((projects) => [
      ...projects,
      { id: projects.length.toString(), name: "New Project", environments: [] },
    ]);
    await projectStorage.setValue(projects);
  }

  async function deleteProject(projectId: string) {
    const updatedProjects = projects.filter(
      (thisProject) => thisProject.id !== projectId,
    );
    setProjects(updatedProjects);
    setSelectedProject(undefined)
    await projectStorage.setValue(updatedProjects);
  }

  return (
    <div className="flex flex-row h-full min-w-[750px]">
      <div className="h-full min-w-48">
        <div className="flex flex-row gap-2 mb-2 min-h-12 items-center border-b-2 p-2">
          <h2>Projects</h2>
          <button className="ml-auto" onClick={() => createNewProject()}><AddIcon /></button>
        </div>
        <div className="flex flex-col gap-4 p-2">
          {projects.map(project => (
            <div className="w-full flex flex-row gap-2" key={project.id}>
              <button onClick={() => setSelectedProject(projects.find((searchProject) => project.id == searchProject.id))}>{project.name}</button>
              <button onClick={() => deleteProject(project.id)} className="ml-auto"><DeleteIcon /></button>
            </div>
          ))}
        </div>
      </div>
      <div className="h-full min-h-80 w-full p-2 border-l-2">
        {selectedProject ? (
          <ProjectEntry project={selectedProject} updateProject={handleUpdateProject} />
        ) : (<p>Edit an environment by selecting it</p>)}
      </div>
    </div >
  )
}