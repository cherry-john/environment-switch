import TitleBar from "@/components/TitleBar";
import Settings from "./Settings";
import { useState } from "react";
import Switch from "./Switch";

export default function App() {
  const [settingsPage, setSettingsPage] = useState<boolean>(false);
  return (
    <div className="min-w-64">
      <div className="h-12">
        <TitleBar {...{ settingsPage, setSettingsPage }} />
      </div>
      <div className="min-h-48">
        {settingsPage ? <Settings /> : <Switch />}
      </div>
    </div>
  )
}