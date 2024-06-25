import { projectStorage } from "@/utilities/storage";
import { useEffect, useMemo, useState } from "react";
import cogIcon from "@/assets/cog-svgrepo-com.svg";
import { Tabs } from "wxt/browser";

function App() {
  const [projects, setProjects] = useState<Project[]>();
  const [currentTab, setCurrentTab] = useState<Tabs.Tab>();

  const currentProject = useMemo(() => {
    if (currentTab && projects) {
      const currentProject = projects.find((project) =>
        project.environments.some((environment) =>
          currentTab.url?.includes(environment.url),
        ),
      );
      return currentProject;
    }
  }, [currentTab, projects]);

  useEffect(() => {
    (async () => {
      const thisProjects = await projectStorage.getValue();
      setProjects(thisProjects);

      const thisCurrentTab = (
        await browser.tabs.query({ currentWindow: true, active: true })
      )[0];
      setCurrentTab(thisCurrentTab);
    })();
  }, []);

  async function handleEnvironmentSwitch(hostname: string) {
    const currentTab = (
      await browser.tabs.query({ currentWindow: true, active: true })
    )[0];

    if (!currentTab || !currentTab.url) return;

    const path = new URL(currentTab.url).pathname;

    browser.tabs.create({ url: hostname + path });
  }

  return (
    <div className="flex flex-col gap-2">
      <div id="popup-header" className="flex flex-row gap-2 p-2 bg-zinc-200">
        <h1 className="mx-4 my-auto">
          {projects && projects?.length > 0
            ? currentProject
              ? currentProject.name
              : "No Project Found"
            : "No Projects"}
        </h1>
        <button
          className="ml-auto mr-4 bg-blue-500 hover:bg-blue-600 text-white font-bold p-2 rounded"
          onClick={() => browser.runtime.openOptionsPage()}
          aria-label="Settings"
        >
          <img src={cogIcon} alt="Settings" width={24} height={24} />
        </button>
      </div>
      <div
        id="popup-environment-container"
        className="flex flex-col items-center gap-2 mb-6 p-2 text-center"
      >
        {projects && projects.length > 0 ? (
          currentProject ? (
            currentProject.environments.map((environment) => (
              <button
                key={environment.id}
                onClick={() => handleEnvironmentSwitch(environment.url)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {environment.name}
              </button>
            ))
          ) : (
            <p className="text-sm">
              You have {projects.length} project{projects.length > 1 && "s"},
              <br />
              but this tab isn't in{" "}
              {projects.length == 1 ? "it" : "any of them"}
            </p>
          )
        ) : (
          <>
            <p className="text-sm">You've not added any projects yet!</p>
            <p className="text-sm">Head to the extension options to add one</p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
