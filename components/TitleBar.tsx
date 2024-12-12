
import BackIcon from "@/assets/BackIcon";
import SettingsIcon from "@/assets/SettingsIcon";
import { Dispatch, SetStateAction } from "react";

interface TitleBarProps {
  settingsPage: boolean;
  setSettingsPage: Dispatch<SetStateAction<boolean>>;
}

export default function TitleBar({ settingsPage, setSettingsPage }: TitleBarProps) {

  return (
    <div className="w-full h-full flex flex-row gap-2 border-b-2 px-4">
      <h1 className="my-auto">Environment Switch</h1>
      <button
        className="ml-auto p-2 fill-black font-bold rounded hover:bg-slate-100"
        aria-label={settingsPage ? "Back to selector" : "Settings"}
        onClick={() => setSettingsPage(!settingsPage)}
      >
        {settingsPage ? <BackIcon /> : <SettingsIcon />}
      </button>
    </div>
  )
}