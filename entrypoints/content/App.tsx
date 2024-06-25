import { projectStorage } from "@/utilities/storage";
import { useState, useEffect } from "react";

function contrastingcolour(colour: string) {
  return luma(colour) >= 165 ? "000" : "fff";
}

function luma(colour: string) {
  // colour can be a hx string or an array of RGB values 0-255
  var rgb = typeof colour === "string" ? hexToRGBArray(colour) : colour;
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]; // SMPTE C, Rec. 709 weightings
}

function hexToRGBArray(colour: string) {
  if (colour.charAt(0) === "#") colour = colour.substring(1);
  if (colour.length === 3)
    colour =
      colour.charAt(0) +
      colour.charAt(0) +
      colour.charAt(1) +
      colour.charAt(1) +
      colour.charAt(2) +
      colour.charAt(2);
  else if (colour.length !== 6) throw "Invalid hex colour: " + colour;
  var rgb = [];
  for (var i = 0; i <= 2; i++)
    rgb[i] = parseInt(colour.substring(i * 2, 2), 16);
  return rgb;
}

export default function App() {
  const badgeColour = "#ff0000";

  const [environment, setEnvironment] = useState<Environment>();

  useEffect(() => {
    (async () => {
      const projects = await projectStorage.getValue();
      const currentProject = projects.find((project) =>
        project.environments.some((environment) =>
          document.URL.includes(environment.url),
        ),
      );
      if (currentProject)
        setEnvironment(
          currentProject?.environments.find((env) =>
            document.URL.includes(env.url),
          ),
        );
    })();
  }, []);

  if (environment)
    return (
      <div
        id="environment-switch-page-overlay"
        style={{
          backgroundColor: badgeColour,
          color: contrastingcolour(badgeColour),
        }}
      >
        {/* This element is created by the Environment Switch web extension, 
        and is inserted on any pages that match one of your environments.
        You can disable this functionality in the extension settings */}
        <p className="sr-only">This page's environment is:</p>
        <p>{environment.name}</p>
      </div>
    );

  return <></>;
}
