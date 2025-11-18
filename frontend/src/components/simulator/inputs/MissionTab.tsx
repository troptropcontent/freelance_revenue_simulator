import { useTranslation } from "react-i18next";
import { TabTrigger } from "./private/TabTrigger";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { Inputs } from "./types";
import { ActivityInput } from "./private/ActivityInput";
import { CirclePlus } from "lucide-react";
import { DEFAULT_MISSION_DAILY_RATE } from "./constants";
import { useBuildDefaultActivityValueForKind } from "./shared/hooks";

const STEP_NUMBER = 1;

function Trigger() {
  const { t } = useTranslation();
  const name = t("simulator.inputs.tabs.missions.name");
  const stepNumber = STEP_NUMBER;
  const badgeClassName = "bg-blue-500 border-blue-500 text-white";
  const badgeNumber = 2;

  return <TabTrigger {...{ name, stepNumber, badgeClassName, badgeNumber }} />;
}

function Content({ form }: { form: UseFormReturn<Inputs> }) {
  const { t } = useTranslation();
  const buildDefaultActivityValueForKind =
    useBuildDefaultActivityValueForKind();
  const {
    fields: activities,
    remove,
    append,
  } = useFieldArray({
    control: form.control,
    name: "activities",
  });
  const missions = activities.filter((activity) => activity.type === "mission");

  return (
    <div className="flex flex-col gap-6">
      <p className="mx-auto">{t("simulator.inputs.tabs.missions.hint")}</p>
      {missions.map((mission, i) => (
        <ActivityInput
          activityIndex={i}
          form={form}
          key={mission.id}
          remove={remove}
        />
      ))}
      <button
        type="button"
        className="btn bg-blue-500 border-blue-500 text-white gap-3"
        onClick={() => append(buildDefaultActivityValueForKind("daily_rate"))}
      >
        {t("simulator.inputs.tabs.missions.add_button")}
        <CirclePlus size={16} />
      </button>
    </div>
  );
}

const MissionTab = {
  Trigger,
  Content,
};

export { MissionTab };
