import { projectStorage } from "@/utilities/storage";
import { useEffect, useMemo, useState } from "react";
import { Tabs } from "wxt/browser";

export default function Switch() {
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
      <h2 className="mx-auto p-2 font-bold">{currentProject?.name}</h2>
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
                className="py-2 px-4 rounded border-2 border-gray-300"
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
            <p className="text-sm">Head to the options above to add one</p>
          </>
        )}
      </div>
    </div>
  );
}