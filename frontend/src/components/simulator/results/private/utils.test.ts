import { computeAnnualTurnover } from "./utils";
import { AverageWorkingConditions } from "../../constants";

describe("computeAnnualTurnover", () => {
  [
    {
      test_name:
        "when quantity is not per week, should be equal to rate * quantity * (number of weeks in a year - number of weeks off per year)",
      values: {
        input_values: {
          rate: 100,
          quantity: 20,
          enjoyment_rate: 0.8,
        },
        weeks_off: 2,
        isQuantityPerWeek: false,
      },
      expected:
        100 *
        20 *
        ((AverageWorkingConditions.weeksPerYear - 2) /
          AverageWorkingConditions.averageWorkedDaysPerWeek),
    },
    {
      test_name:
        "when quantity is per week, should be equal to rate * quantity * (number of weeks in a year - number of weeks off per year)",
      values: {
        input_values: {
          rate: 1000,
          quantity: 2,
          enjoyment_rate: 0.8,
        },
        weeks_off: 2,
        isQuantityPerWeek: true,
      },
      expected: 1000 * 2 * (AverageWorkingConditions.weeksPerYear - 2),
    },
    {
      test_name: "should return 0 if the freelance daily rate is undefined",
      values: {
        input_values: undefined,
        weeks_off: 2,
        isQuantityPerWeek: false,
      },
      expected: 0,
    },
  ].forEach(({ test_name, values, expected }) => {
    it(test_name, () => {
      expect(
        computeAnnualTurnover(
          values?.input_values,
          values?.weeks_off,
          values?.isQuantityPerWeek,
        ),
      ).toBe(expected);
    });
  });
});
