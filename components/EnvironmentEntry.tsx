import DeleteIcon from "@/assets/DeleteIcon";
import { useEffect, useState } from "react";

interface EnvironmentEntryProps {
  environment: Environment;
  updateEnvironment: (environment: Environment) => void;
  deleteEnvironment: (environmentId: string) => void;
}

export default function EnvironmentEntry({
  environment,
  updateEnvironment,
  deleteEnvironment,
}: EnvironmentEntryProps) {
  const [localEnvironment, setLocalEnvironment] =
    useState<Environment>(environment);

  return (
    <div className="grid grid-cols-7 gap-2 p-2 text-sm">
      <input
        className="col-span-3 rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600"
        placeholder="Environment Name"
        value={localEnvironment.name}
        onChange={(event) =>
          setLocalEnvironment((env) => ({ ...env, name: event.target.value }))
        }
        onBlur={() => updateEnvironment(localEnvironment)}
      />
      <input
        className="col-span-3 rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600"
        placeholder="Environment URL"
        value={localEnvironment.url}
        onChange={(event) =>
          setLocalEnvironment((env) => ({ ...env, url: event.target.value }))
        }
        onBlur={() => updateEnvironment(localEnvironment)}
      />
      <div className="w-full">
        <button
          className="my-auto text-red-800 text-center py-2 px-2 rounded hover:bg-red-100"
          onClick={() => deleteEnvironment(environment.id)}
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}
