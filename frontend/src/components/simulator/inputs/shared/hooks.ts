import {
  DEFAULT_NUMBER_DAYS_WORKED_PER_WEEKS,
  DEFAULT_NUMBER_OF_DAYS_OFF_PER_YEAR,
  DEFAULT_NUMBER_OF_HOURS_WORKED_PER_DAY,
} from "../constants";
import { Inputs } from "../types";

function useInitialValues(): Inputs {
  return {
    activities: [],
    config: {
      number_of_days_off_per_year: DEFAULT_NUMBER_OF_DAYS_OFF_PER_YEAR,
      number_of_days_worked_per_week: DEFAULT_NUMBER_DAYS_WORKED_PER_WEEKS,
      number_of_hours_worked_per_day: DEFAULT_NUMBER_OF_HOURS_WORKED_PER_DAY,
    },
  };
}

export { useInitialValues };
