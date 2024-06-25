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
    <div className="grid grid-cols-7 gap-2 p-2">
      <input
        className="col-span-3 rounded-md border-0 py-1 pr-2 pl-4  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600"
        placeholder="Environment Name"
        value={localEnvironment.name}
        onChange={(event) =>
          setLocalEnvironment((env) => ({ ...env, name: event.target.value }))
        }
        onBlur={() => updateEnvironment(localEnvironment)}
      />
      <input
        className="col-span-3 rounded-md border-0 py-1 pr-2 pl-4  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600"
        placeholder="Environment URL"
        value={localEnvironment.url}
        onChange={(event) =>
          setLocalEnvironment((env) => ({ ...env, url: event.target.value }))
        }
        onBlur={() => updateEnvironment(localEnvironment)}
      />
      <button
        className="col-span-1 bg-red-800 hover:bg-red-900 text-white text-md text-center font-bold py-2 px-4 rounded"
        onClick={() => deleteEnvironment(environment.id)}
      >
        Delete
      </button>
    </div>
  );
}
