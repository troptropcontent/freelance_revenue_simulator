import { useTranslation } from "react-i18next";
import { TabTrigger } from "./private/TabTrigger";

const STEP_NUMBER = 1;

function Trigger() {
  const { t } = useTranslation();
  const name = t("simulator.inputs.tabs.missions.name");
  const stepNumber = STEP_NUMBER;
  const badgeClassName = "bg-blue-500 border-blue-500 text-white";
  const badgeNumber = 2;

  return <TabTrigger {...{ name, stepNumber, badgeClassName, badgeNumber }} />;
}

function Content() {
  return "Étape 1 Inputs";
}

const MissionTab = {
  Trigger,
  Content,
};

export { MissionTab };
