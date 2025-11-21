import { useTranslation } from "react-i18next";
import {
  DEFAULT_ACTIVITIES,
  DEFAULT_NUMBER_OF_WEEKS_OFF_PER_YEAR,
  DEFAULT_WEEKDAYS_WORKED,
  NUMBER_OF_HOURS_WORKED_PER_DAY,
  DEFAULT_MONTHLY_PROFESSIONAL_EXPENSE,
  DEFAULT_SOCIAL_CONTRIBUTIONS_RATE,
  DEFAULT_INCOME_TAX,
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
      number_of_hours_worked_per_day: NUMBER_OF_HOURS_WORKED_PER_DAY,
      monthly_professional_expense: DEFAULT_MONTHLY_PROFESSIONAL_EXPENSE,
      social_contributions_rate: DEFAULT_SOCIAL_CONTRIBUTIONS_RATE,
      income_tax: DEFAULT_INCOME_TAX,
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
