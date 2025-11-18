import { useTranslation } from "react-i18next";
import {
  DEFAULT_ACTIVITIES,
  DEFAULT_NUMBER_DAYS_WORKED_PER_WEEKS,
  DEFAULT_NUMBER_OF_DAYS_OFF_PER_YEAR,
  DEFAULT_NUMBER_OF_HOURS_WORKED_PER_DAY,
} from "../constants";
import { Inputs } from "../types";

function useInitialValues(): Inputs {
  const buildDefaultActivityValueForKind =
    useBuildDefaultActivityValueForKind();
  return {
    activities: [
      buildDefaultActivityValueForKind("daily_rate"),
      buildDefaultActivityValueForKind("hourly_rate"),
      buildDefaultActivityValueForKind("flat_rate"),
    ],
    config: {
      number_of_days_off_per_year: DEFAULT_NUMBER_OF_DAYS_OFF_PER_YEAR,
      number_of_days_worked_per_week: DEFAULT_NUMBER_DAYS_WORKED_PER_WEEKS,
      number_of_hours_worked_per_day: DEFAULT_NUMBER_OF_HOURS_WORKED_PER_DAY,
    },
  };
}

function useBuildDefaultActivityValueForKind() {
  const { t } = useTranslation();
  return (kind: Inputs["activities"][number]["kind"]) => {
    const defaultValue = DEFAULT_ACTIVITIES[kind];
    defaultValue.name = t(
      `simulator.inputs.tabs.missions.${kind}.default_name`,
    );
    return defaultValue;
  };
}

export { useInitialValues, useBuildDefaultActivityValueForKind };
