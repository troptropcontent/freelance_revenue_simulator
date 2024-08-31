import { AverageWorkingConditions } from "../constants";

const computeAnnualTurnover = (
  input_values:
    | {
        rate: number;
        quantity: number;
      }
    | undefined,
  weeks_off: number,
) => {
  return input_values === undefined
    ? 0
    : input_values.rate *
        input_values.quantity *
        ((AverageWorkingConditions.weeksPerYear - weeks_off) /
          AverageWorkingConditions.averageWorkedDaysPerWeek);
};

export { computeAnnualTurnover };
