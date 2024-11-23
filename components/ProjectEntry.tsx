import { useEffect, useState } from "react";
import EnvironmentEntry from "./EnvironmentEntry";
import AddIcon from "@/assets/AddIcon";
import DeleteIcon from "@/assets/DeleteIcon";

interface ProjectEntryProps {
  project: Project;
  updateProject: (project: Project) => void;
}

export default function ProjectEntry({
  project,
  updateProject,
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
    <div>
      <div className="flex gap-2 p-2 w-full">
        <input
          type="text"
          className="w-full col-span-3 rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600"
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
        <button
          className="font-bold p-2 rounded-md border"
          aria-label="Add Environment"
            onClick={() => addEnvironment()}
          >
          <AddIcon />
        </button>
      </div>
      <div>
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
