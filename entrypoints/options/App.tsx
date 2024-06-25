import ProjectEntry from "@/components/ProjectEntry";
import { projectStorage } from "@/utilities/storage";
import { useEffect, useState } from "react";

function App() {
  const [projects, setProjects] = useState<Project[]>([]);

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

  function createNewProject() {
    setProjects((projects) => [
      ...projects,
      { id: projects.length.toString(), name: "New Project", environments: [] },
    ]);
  }

  async function deleteProject(projectId: string) {
    const updatedProjects = projects.filter(
      (thisProject) => thisProject.id !== projectId,
    );
    setProjects(updatedProjects);
    await projectStorage.setValue(updatedProjects);
  }

  return (
    <>
      <div className="flex flex-col gap-2 font-semibold">
        <div
          id="options-header"
          className="flex flex-row flex-wrap gap-2 p-4 bg-zinc-200"
        >
          <h1 className="my-auto ml-4 text-xl font-semibold">
            Environment Switcher
          </h1>
          <div className="ml-auto mr-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => createNewProject()}
            >
              + Add Project
            </button>
          </div>
        </div>
        <div id="options-project-container" className="flex flex-col p-2">
          {projects?.map((project) => (
            <ProjectEntry
              key={project.id}
              project={project}
              updateProject={handleUpdateProject}
              deleteProject={deleteProject}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
