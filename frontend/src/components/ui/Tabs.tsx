import { ReactNode, useState, useContext } from "react";
import { createContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { twMerge } from "tailwind-merge";

export const TabContext = createContext<null | {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabGroupName: string;
}>(null);

interface TabRootType {
  defaultTab: string;
  children: ReactNode;
}
function Root(props: TabRootType) {
  const [activeTab, setActiveTab] = useState(props.defaultTab);
  const tabGroupName = uuidv4();
  const contextValue = { activeTab, setActiveTab, tabGroupName };
  return (
    <TabContext.Provider value={contextValue}>
      <div className="tabs tabs-lift">{props.children}</div>
    </TabContext.Provider>
  );
}

interface TabTriggerType {
  name: string;
  children: ReactNode;
  isActiveClassName?: string;
}
function Trigger(props: TabTriggerType) {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("Tabs.Trigger must be used within a Tabs.Root component");
  }
  const isActive = props.name === context.activeTab;
  return (
    <label className={twMerge("tab", isActive ? props.isActiveClassName : "")}>
      <input
        type="radio"
        name={context.tabGroupName}
        checked={isActive}
        onChange={() => context.setActiveTab(props.name)}
      />
      {props.children}
    </label>
  );
}

interface TabContentType {
  children: ReactNode;
  className?: string;
}
function Content(props: TabContentType) {
  return (
    <div
      className={twMerge(
        "tab-content bg-base-100 border-base-300 p-6",
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}

const Tabs = { Root, Trigger, Content };

export { Tabs };
