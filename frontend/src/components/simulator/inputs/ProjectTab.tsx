import { useTranslation } from "react-i18next";
import { TabTrigger } from "./private/TabTrigger";

const STEP_NUMBER = 2;

function Trigger() {
  const { t } = useTranslation();
  const name = t("simulator.inputs.tabs.projects.name");
  const stepNumber = STEP_NUMBER;
  const badgeClassName = "bg-lime-500 border-lime-500 text-white";
  const badgeNumber = 2;

  return <TabTrigger {...{ name, stepNumber, badgeClassName, badgeNumber }} />;
}

function Content() {
  return "Étape 2 Inputs";
}

const ProjectTab = {
  Trigger,
  Content,
};

export { ProjectTab };
