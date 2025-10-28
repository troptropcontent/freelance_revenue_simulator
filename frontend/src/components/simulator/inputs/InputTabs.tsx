import { Tabs } from "src/components/ui/Tabs";

function InputTabs() {
  return (
    <div className="col-span-2">
      <Tabs.Root defaultTab="step_1">
        <Tabs.Trigger
          name="step_1"
          isActiveClassName="[--tab-bg:var(--color-blue-200)]"
        >
          Étape 1
        </Tabs.Trigger>
        <Tabs.Content className="bg-blue-200">Inputs étape 1</Tabs.Content>
        <Tabs.Trigger
          name="step_2"
          isActiveClassName="[--tab-bg:var(--color-lime-100)]"
        >
          Étape 2
        </Tabs.Trigger>
        <Tabs.Content className="bg-lime-100">Inputs étape 2</Tabs.Content>
      </Tabs.Root>
    </div>
  );
}

export { InputTabs };
