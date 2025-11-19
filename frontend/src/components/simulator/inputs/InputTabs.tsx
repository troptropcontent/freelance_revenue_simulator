import { Tabs } from "src/components/ui/Tabs";
import { UseFormReturn } from "react-hook-form";
import { Inputs } from "./types";
import { useActivitiesFieldArray } from "./shared/hooks";
import { CirclePlus } from "lucide-react";
import { TabTrigger } from "./private/TabTrigger";
import { useTranslation } from "react-i18next";
import { ActivityInput } from "./private/ActivityInput";
import { twMerge } from "tailwind-merge";

function InputTabs({ form }: { form: UseFormReturn<Inputs> }) {
  const { t } = useTranslation();
  const { activities, appendActivities, removeActivity } =
    useActivitiesFieldArray(form);
  const activitiesWithInputIndex = activities.map((activity, i) => {
    return { ...activity, inputIndex: i };
  });
  const missionsWithInputIndex = activitiesWithInputIndex.filter(
    (activityWithInputIndex) => activityWithInputIndex.type == "mission",
  );
  const projectsWithInputIndex = activitiesWithInputIndex.filter(
    (activityWithInputIndex) => activityWithInputIndex.type == "project",
  );

  const tabs = [
    {
      type: "mission",
      triggerIsActiveClassName: "[--tab-bg:var(--color-blue-200)]",
      contentClassName: "bg-blue-200",
      badgeClassName: "bg-blue-500 border-blue-500 text-white",
      activitiesWithInputIndex: missionsWithInputIndex,
      addActivityButtonClassName:
        "btn bg-blue-500 border-blue-500 text-white gap-3",
      newActivityKind: "hourly_rate",
    },
    {
      type: "project",
      triggerIsActiveClassName: "[--tab-bg:var(--color-lime-100)]",
      contentClassName: "bg-lime-100",
      badgeClassName: "bg-lime-500 border-lime-500 text-white",
      activitiesWithInputIndex: projectsWithInputIndex,
      addActivityButtonClassName:
        "btn bg-lime-600 border-lime-600 text-white gap-3",
      newActivityKind: "paid",
    },
  ] as const;

  return (
    <div className="col-span-2">
      <Tabs.Root defaultTab="step_1">
        {tabs.map((tab, index) => {
          return (
            <>
              <Tabs.Trigger
                name={`step_${index}`}
                isActiveClassName={tab.triggerIsActiveClassName}
              >
                <span className="flex gap-4 items-center">
                  <b>
                    {t("simulator.inputs.tabs.shared.step", {
                      stepNumber: index + 1,
                    })}
                  </b>
                  <p>{t(`simulator.inputs.tabs.${tab.type}.name`)}</p>
                  <div
                    className={twMerge("badge badge-xs", tab.badgeClassName)}
                  >
                    {tab.activitiesWithInputIndex.length}
                  </div>
                </span>
              </Tabs.Trigger>
              <Tabs.Content className={tab.contentClassName}>
                <div className="flex flex-col gap-6">
                  <p className="mx-auto">
                    {t(`simulator.inputs.tabs.${tab.type}.hint`)}
                  </p>
                  {tab.activitiesWithInputIndex.map(
                    (activityWithInputIndex) => (
                      <ActivityInput
                        activityWithInputIndex={activityWithInputIndex}
                        form={form}
                        key={activityWithInputIndex.inputIndex}
                        removeActivity={removeActivity}
                      />
                    ),
                  )}
                  <button
                    type="button"
                    className={tab.addActivityButtonClassName}
                    onClick={() => appendActivities(tab.newActivityKind)}
                  >
                    {t(`simulator.inputs.tabs.${tab.type}.add_button`)}
                    <CirclePlus size={16} />
                  </button>
                </div>
              </Tabs.Content>
            </>
          );
        })}
      </Tabs.Root>
    </div>
  );
}

export { InputTabs };
