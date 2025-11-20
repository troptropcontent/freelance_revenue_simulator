import { useTranslation } from "react-i18next";
import {
  DEFAULT_ACTIVITIES,
  DEFAULT_NUMBER_DAYS_WORKED_PER_WEEKS,
  DEFAULT_NUMBER_OF_DAYS_OFF_PER_YEAR,
  DEFAULT_NUMBER_OF_HOURS_WORKED_PER_DAY,
  DEFAULT_NUMBER_OF_WEEKS_OFF_PER_YEAR,
  DEFAULT_WEEKDAYS_WORKED,
} from "../constants";
import { Inputs } from "../types";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { DEFAULT_NUMBER_OF_HOURS_SPENT_ON_ADMIN_TASKS_PER_WEEK } from "../../constants";

function useInitialValues(): Inputs {
  const buildDefaultActivityValueForKind =
    useBuildDefaultActivityValueForKind();
  return {
    activities: [
      buildDefaultActivityValueForKind("daily_rate"),
      buildDefaultActivityValueForKind("hourly_rate"),
      buildDefaultActivityValueForKind("flat_rate"),
      buildDefaultActivityValueForKind("paid"),
      buildDefaultActivityValueForKind("free"),
    ],
    config: {
      number_of_days_spent_on_admin_tasks:
        DEFAULT_NUMBER_OF_HOURS_SPENT_ON_ADMIN_TASKS_PER_WEEK,
      number_of_weeks_off_per_year: DEFAULT_NUMBER_OF_WEEKS_OFF_PER_YEAR,
      weekdays_worked: DEFAULT_WEEKDAYS_WORKED,
    },
  };
}

function useActivitiesFieldArray(form: UseFormReturn<Inputs>) {
  const buildDefaultActivityValueForKind =
    useBuildDefaultActivityValueForKind();
  const { append, remove } = useFieldArray({
    control: form.control,
    name: "activities",
  });
  const appendActivities = (
    missionKind: Inputs["activities"][number]["kind"],
  ) => append(buildDefaultActivityValueForKind(missionKind));
  const activities = form.watch("activities");
  return { activities, appendActivities, removeActivity: remove };
}

function useBuildDefaultActivityValueForKind() {
  const { t } = useTranslation();
  return (kind: Inputs["activities"][number]["kind"]) => {
    const defaultValue = DEFAULT_ACTIVITIES[kind];
    defaultValue.name = t(`simulator.inputs.tabs.mission.${kind}.default_name`);
    return defaultValue;
  };
}

export {
  useInitialValues,
  useBuildDefaultActivityValueForKind,
  useActivitiesFieldArray,
};
