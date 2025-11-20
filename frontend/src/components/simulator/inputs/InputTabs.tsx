import { Tabs } from "src/components/ui/Tabs";
import { UseFormReturn } from "react-hook-form";
import { Inputs } from "./types";
import { useActivitiesFieldArray } from "./shared/hooks";
import { CirclePlus, SlidersVertical } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ActivityInput } from "./private/ActivityInput";
import { twMerge } from "tailwind-merge";
import { Fragment } from "react";
import { Modal } from "src/components/ui/Modal";
import { FormInputs } from "src/components/ui/form/inputs";
import { InputGroupWithRange } from "./private/InputGroupWithRange";
import { InputGroupWithWeekdaysPicker } from "./private/InputGroupWithWeekdaysRadio";

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
      addActivityButtonClassName: "bg-blue-500 border-blue-500 text-white",
      newActivityKind: "hourly_rate",
    },
    {
      type: "project",
      triggerIsActiveClassName: "[--tab-bg:var(--color-lime-100)]",
      contentClassName: "bg-lime-100",
      badgeClassName: "bg-lime-500 border-lime-500 text-white",
      activitiesWithInputIndex: projectsWithInputIndex,
      addActivityButtonClassName: "bg-lime-600 border-lime-600 text-white",
      newActivityKind: "paid",
    },
  ] as const;

  return (
    <div className="col-span-2">
      <Tabs.Root defaultTab="step_0">
        {tabs.map((tab, index) => {
          return (
            <Fragment key={tab.type}>
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
                  <div className="flex gap-6">
                    <button
                      type="button"
                      className={twMerge(
                        "btn gap-3 grow",
                        tab.addActivityButtonClassName,
                      )}
                      onClick={() => appendActivities(tab.newActivityKind)}
                    >
                      {t(`simulator.inputs.tabs.${tab.type}.add_button`)}
                      <CirclePlus size={16} />
                    </button>
                    <Modal.Root>
                      <Modal.Trigger>
                        {t(
                          `simulator.inputs.tabs.activities.settings_modal.open_btn`,
                        )}
                        <SlidersVertical size={16} />
                      </Modal.Trigger>
                      <Modal.Content>
                        <div className="flex flex-col">
                          <p className="text-2xl font-bold text-center">
                            {t(
                              `simulator.inputs.tabs.activities.settings_modal.title`,
                            )}
                          </p>
                          <InputGroupWithRange
                            form={form}
                            hint={(currentValue) =>
                              t("common.value_with_unit.number_of_days", {
                                count: currentValue,
                              })
                            }
                            inputName={
                              "config.number_of_days_spent_on_admin_tasks"
                            }
                            label={t(
                              `simulator.inputs.tabs.activities.inputs.number_of_days_spent_on_admin_tasks_label`,
                            )}
                            rangeMin={0}
                            rangeMax={5}
                            step={0.5}
                          />
                          <InputGroupWithRange
                            form={form}
                            hint={(currentValue) =>
                              t("common.value_with_unit.number_of_weeks", {
                                count: currentValue,
                              })
                            }
                            inputName={"config.number_of_weeks_off_per_year"}
                            label={t(
                              `simulator.inputs.tabs.activities.inputs.number_of_weeks_off_per_year_label`,
                            )}
                            rangeMin={0}
                            rangeMax={10}
                            step={0.5}
                          />
                          <InputGroupWithWeekdaysPicker form={form} />
                        </div>
                      </Modal.Content>
                    </Modal.Root>
                  </div>
                </div>
              </Tabs.Content>
            </Fragment>
          );
        })}
      </Tabs.Root>
    </div>
  );
}

export { InputTabs };
