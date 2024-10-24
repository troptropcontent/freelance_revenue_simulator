import {
  computeAnnualTurnover,
  computeNumberOfDaysWorkedPerWeek,
} from "./utils";

describe("computeAnnualTurnover", () => {
  const scenarios: {
    test_name: string;
    params: Parameters<typeof computeAnnualTurnover>;
    expected: ReturnType<typeof computeAnnualTurnover>;
  }[] = [
    {
      test_name:
        "when the type is freelance_daily_rate, it should be equal to rate * quantity * (NUMBER_OF_WEEKS_PER_YEAR - weeks_off)",
      params: [
        {
          type: "freelance_daily_rate",
          enabled: true,
          values: { quantity: 2, rate: 650, enjoyment_rate: 5 },
        },
        8,
      ],
      expected: 57200,
    },
    {
      test_name:
        "when the type is freelance_on_delivery and the frequency is by_month, it should be equal to rate * frequency_value * 12",
      params: [
        {
          type: "freelance_on_delivery",
          enabled: true,
          values: {
            frequency_unit: "by_month",
            frequency_value: 2,
            rate: 1000,
            enjoyment_rate: 5,
            average_time_spent: 1,
          },
        },
        8,
      ],
      expected: 20308,
    },
    {
      test_name:
        "when the type is freelance_on_delivery and the frequency is by_year, it should be equal to rate * frequency_value",
      params: [
        {
          type: "freelance_on_delivery",
          enabled: true,
          values: {
            frequency_unit: "by_year",
            frequency_value: 2,
            rate: 1000,
            enjoyment_rate: 5,
            average_time_spent: 1,
          },
        },
        8,
      ],
      expected: 2000,
    },
    {
      test_name:
        "when the type is consulting, it should be equal to rate * frequency_value * number of months worked",
      params: [
        {
          type: "consulting",
          enabled: true,
          values: {
            quantity: 2,
            rate: 100,
            enjoyment_rate: 5,
            average_time_spent: 1,
          },
        },
        8,
      ],
      expected: 2031,
    },
    {
      test_name:
        "when the type is sponsorship, it should be equal to rate * frequency_value * number of months worked",
      params: [
        {
          type: "sponsorship",
          enabled: true,
          values: {
            quantity: 3,
            rate: 200,
            enjoyment_rate: 5,
            average_time_spent: 1,
          },
        },
        8,
      ],
      expected: 6092,
    },
    {
      test_name:
        "when the type is entrepreneurship, it should be equal to rate * quantity",
      params: [
        {
          type: "entrepreneurship",
          enabled: true,
          values: {
            quantity: 1000,
            rate: 10,
            enjoyment_rate: 5,
            average_time_spent: 1,
          },
        },
        8,
      ],
      expected: 10000,
    },
    {
      test_name:
        "when the activity is either admin or side project, it return 0",
      params: [
        {
          type: "admin",
          enabled: true,
          values: {
            average_time_spent: 1,
          },
        },
        8,
      ],
      expected: 0,
    },
    {
      test_name: "when the activity have not been enabled, it return null",
      params: [
        {
          type: "entrepreneurship",
          enabled: false,
          values: {
            quantity: 1000,
            rate: 10,
            enjoyment_rate: 5,
            average_time_spent: 1,
          },
        },
        8,
      ],
      expected: null,
    },
  ];
  scenarios.forEach(({ test_name, params, expected }) => {
    it(test_name, () => {
      const result = computeAnnualTurnover(...params);
      const comparableResult = result == null ? result : Math.round(result);
      const comparableExpected =
        expected == null ? result : Math.round(expected);
      expect(comparableResult).toBe(comparableExpected);
    });
  });
});

describe("computeNumberOfDaysWorkedPerWeek", () => {
  const scenarios: {
    test_name: string;
    params: Parameters<typeof computeNumberOfDaysWorkedPerWeek>;
    expected: ReturnType<typeof computeNumberOfDaysWorkedPerWeek>;
  }[] = [
    {
      test_name:
        "when the type is freelance_daily_rate, it should be equal to quantity",
      params: [
        {
          type: "freelance_daily_rate",
          enabled: true,
          values: { quantity: 2, rate: 650, enjoyment_rate: 5 },
        },
        5,
      ],
      expected: 2,
    },
    {
      test_name:
        "when the type is freelance_on_delivery, it should be equal to average_time_spent",
      params: [
        {
          type: "freelance_on_delivery",
          enabled: true,
          values: {
            frequency_unit: "by_month",
            frequency_value: 2,
            rate: 1000,
            enjoyment_rate: 5,
            average_time_spent: 1,
          },
        },
        8,
      ],
      expected: 1,
    },
    {
      test_name:
        "when the type is consulting, it should be equal to (quantity * average_time_spent) / NUMBER_OF_WEEKS_IN_A_MONTH / number_of_hours_worked_per_day",
      params: [
        {
          type: "consulting",
          enabled: true,
          values: {
            quantity: 2,
            rate: 100,
            enjoyment_rate: 5,
            average_time_spent: 2,
          },
        },
        7,
      ],
      expected: 0.13,
    },
    {
      test_name:
        "when the type is sponsorship, it should be equal to (quantity * average_time_spent) / NUMBER_OF_WEEKS_IN_A_MONTH / number_of_hours_worked_per_day",
      params: [
        {
          type: "sponsorship",
          enabled: true,
          values: {
            quantity: 3,
            rate: 200,
            enjoyment_rate: 5,
            average_time_spent: 4,
          },
        },
        7,
      ],
      expected: 0.4,
    },
    {
      test_name:
        "when the type is entrepreneurship, it should be equal to average_time_spent",
      params: [
        {
          type: "entrepreneurship",
          enabled: true,
          values: {
            quantity: 1000,
            rate: 10,
            enjoyment_rate: 5,
            average_time_spent: 1,
          },
        },
        8,
      ],
      expected: 1,
    },
    {
      test_name:
        "when the activity is admin, it should return average time spent",
      params: [
        {
          type: "admin",
          enabled: true,
          values: {
            average_time_spent: 2,
          },
        },
        8,
      ],
      expected: 2,
    },
    {
      test_name:
        "when the activity is side_project, it should return average time spent",
      params: [
        {
          type: "side_project",
          enabled: true,
          values: {
            average_time_spent: 1,
            enjoyment_rate: 5,
          },
        },
        8,
      ],
      expected: 1,
    },
    {
      test_name: "when the activity have not been enabled, it return null",
      params: [
        {
          type: "entrepreneurship",
          enabled: false,
          values: {
            quantity: 1000,
            rate: 10,
            enjoyment_rate: 5,
            average_time_spent: 1,
          },
        },
        8,
      ],
      expected: null,
    },
  ];
  scenarios.forEach(({ test_name, params, expected }) => {
    it(test_name, () => {
      const result = computeNumberOfDaysWorkedPerWeek(...params);
      const comparableResult = result == null ? result : Math.round(result);
      const comparableExpected =
        expected == null ? result : Math.round(expected);
      expect(comparableResult).toBe(comparableExpected);
    });
  });
});
