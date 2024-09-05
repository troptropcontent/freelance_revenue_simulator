import { AverageWorkingConditions } from "../../constants";

const computeAnnualTurnover = (
  input_values:
    | {
        rate: number;
        quantity: number;
      }
    | undefined,
  weeks_off: number,
  isQuantityPerWeek: boolean = false,
) => {
  if (input_values === undefined) {
    return 0;
  }

  return isQuantityPerWeek
    ? input_values.rate *
        input_values.quantity *
        (AverageWorkingConditions.weeksPerYear - weeks_off)
    : input_values.rate *
        input_values.quantity *
        ((AverageWorkingConditions.weeksPerYear - weeks_off) /
          AverageWorkingConditions.averageWorkedDaysPerWeek);
};

export { computeAnnualTurnover };
