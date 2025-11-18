import { Tabs } from "src/components/ui/Tabs";
import { MissionTab } from "./MissionTab";
import { ProjectTab } from "./ProjectTab";

function InputTabs() {
  return (
    <div className="col-span-2">
      <Tabs.Root defaultTab="step_1">
        <Tabs.Trigger
          name="step_1"
          isActiveClassName="[--tab-bg:var(--color-blue-200)]"
        >
          <MissionTab.Trigger />
        </Tabs.Trigger>
        <Tabs.Content className="bg-blue-200">
          <MissionTab.Content />
        </Tabs.Content>
        <Tabs.Trigger
          name="step_2"
          isActiveClassName="[--tab-bg:var(--color-lime-100)]"
        >
          <ProjectTab.Trigger />
        </Tabs.Trigger>
        <Tabs.Content className="bg-lime-100">
          <ProjectTab.Content />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}

export { InputTabs };
