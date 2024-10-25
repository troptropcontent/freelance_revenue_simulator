import { FormValues } from "src/App";
import {
  NUMBER_OF_WEEKS_IN_A_MONTH,
  NUMBER_OF_WEEKS_PER_YEAR,
} from "../../constants";

const computeAnnualTurnover = (
  { type, enabled, values }: FormValues["activities"][number],
  weeks_off: number,
) => {
  if (!enabled || values == undefined) {
    return null;
  }

  const months_worked_per_year =
    (NUMBER_OF_WEEKS_PER_YEAR - weeks_off) / NUMBER_OF_WEEKS_IN_A_MONTH;

  switch (type) {
    case "admin":
      return 0;
    case "side_project":
      return 0;
    case "consulting": {
      const { quantity, rate } = values;
      return rate * quantity * months_worked_per_year;
    }
    case "entrepreneurship": {
      const { rate, quantity } = values;
      return rate * quantity;
    }
    case "freelance_daily_rate": {
      const { rate, quantity } = values;
      return rate * quantity * (NUMBER_OF_WEEKS_PER_YEAR - weeks_off);
    }
    case "freelance_on_delivery": {
      const { frequency_unit, rate, frequency_value } = values;
      return frequency_unit == "by_month"
        ? rate * frequency_value * months_worked_per_year
        : rate * frequency_value;
    }
    case "sponsorship": {
      const { quantity, rate } = values;
      return rate * quantity * months_worked_per_year;
    }
    default:
      throw new Error(`${type} is not handled`);
  }
};

const computeNumberOfDaysWorkedPerWeek = (
  { type, enabled, values }: FormValues["activities"][number],
  number_of_hours_worked_per_day: number,
) => {
  if (!enabled || values == undefined) {
    return null;
  }

  switch (type) {
    case "admin":
      return values.average_time_spent;
    case "side_project":
      return values.average_time_spent;
    case "consulting": {
      const { quantity, average_time_spent } = values;
      return (
        (quantity * average_time_spent) /
        NUMBER_OF_WEEKS_IN_A_MONTH /
        number_of_hours_worked_per_day
      );
    }
    case "entrepreneurship": {
      return values.average_time_spent;
    }
    case "freelance_daily_rate": {
      return values.quantity;
    }
    case "freelance_on_delivery": {
      return values.average_time_spent;
    }
    case "sponsorship": {
      const { quantity, average_time_spent } = values;
      return (
        (quantity * average_time_spent) /
        NUMBER_OF_WEEKS_IN_A_MONTH /
        number_of_hours_worked_per_day
      );
    }
    default:
      throw new Error(`${type} is not handled`);
  }
};

const findNumberOfDaysAvailableTextType = (
  number_of_days_available: number,
  number_of_hours_worked_per_day: number,
):
  | "hours"
  | "half_a_day"
  | "days"
  | "more_days_worked_than_days_available"
  | "perfectly_balanced" => {
  const hours_available =
    number_of_days_available * number_of_hours_worked_per_day;

  if (number_of_days_available < 0) {
    return "more_days_worked_than_days_available";
  }

  if (number_of_days_available < 1 && Math.round(hours_available) == 0) {
    return "perfectly_balanced";
  }

  if (hours_available < 3) {
    return "hours";
  }

  if (hours_available < 4) {
    return "half_a_day";
  }

  if (number_of_days_available < 1) {
    return "hours";
  }

  return "days";
};

export {
  computeAnnualTurnover,
  computeNumberOfDaysWorkedPerWeek,
  findNumberOfDaysAvailableTextType,
};
