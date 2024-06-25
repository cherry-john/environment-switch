import { useEffect, useState } from "react";
import EnvironmentEntry from "./EnvironmentEntry";

interface ProjectEntryProps {
  project: Project;
  updateProject: (project: Project) => void;
  deleteProject: (projectId: string) => void;
}

export default function ProjectEntry({
  project,
  updateProject,
  deleteProject,
}: ProjectEntryProps) {
  const [localProject, setLocalProject] = useState<Project>(project);

  function addEnvironment() {
    setLocalProject((project) => ({
      ...project,
      environments: [
        ...project.environments,
        {
          id: project.environments.length.toString(),
          name: "",
          url: "",
        },
      ],
    }));
  }

  function handleUpdateEnvironment(environment: Environment) {
    setLocalProject((project) => ({
      ...project,
      environments: project.environments.map((env) =>
        env.id == environment.id ? environment : env,
      ),
    }));
  }

  function deleteEnvironment(environmentId: string) {
    setLocalProject((project) => ({
      ...project,
      environments: project.environments.filter(
        (env) => env.id !== environmentId,
      ),
    }));
  }

  //Auto Saving
  useEffect(() => {
    (async () => {
      updateProject(localProject);
    })();
  }, [localProject]);

  return (
    <div className="m-2 border-2 border-zinc-200 rounded">
      <div className="flex flex-wrap gap-2 p-4 bg-zinc-200">
        <input
          type="text"
          className="w-full max-w-md rounded-md border-0 py-1 pr-2 pl-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600"
          placeholder="Project Name"
          aria-describedby="project-name-label"
          value={localProject.name}
          onChange={(event) => {
            setLocalProject((project) => ({
              ...project,
              name: event.target.value,
            }));
          }}
        />

        <div className="flex flex-wrap gap-2 ml-auto">
          <button
            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => addEnvironment()}
          >
            + Add Environment
          </button>
          <button
            className="bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded"
            onClick={() => deleteProject(project.id)}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="mt-2 p-2">
        <div className="w-full grid grid-cols-7 justify-around text-lg">
          <p className="col-span-3 text-center">Name</p>
          <p className="col-span-3 text-center">URL</p>
        </div>
        {localProject.environments.map((env) => (
          <EnvironmentEntry
            key={env.id}
            environment={env}
            updateEnvironment={handleUpdateEnvironment}
            deleteEnvironment={deleteEnvironment}
          />
        ))}
      </div>
    </div>
  );
}
