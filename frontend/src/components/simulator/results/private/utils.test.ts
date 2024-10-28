import {
  computeAnnualTurnover,
  computeNumberOfDaysWorkedPerWeek,
  findNumberOfDaysAvailableTextType,
} from "./utils";

//eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnitTestScenario<T extends (...args: any) => any> = {
  name: string;
  parameters: Parameters<T>;
  expected: ReturnType<T>;
};

describe("computeAnnualTurnover", () => {
  const scenarios: UnitTestScenario<typeof computeAnnualTurnover>[] = [
    {
      name: "when the type is freelance_daily_rate, it should be equal to rate * quantity * (NUMBER_OF_WEEKS_PER_YEAR - weeks_off)",
      parameters: [
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
      name: "when the type is freelance_on_delivery and the frequency is by_month, it should be equal to rate * frequency_value * 12",
      parameters: [
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
      name: "when the type is freelance_on_delivery and the frequency is by_year, it should be equal to rate * frequency_value",
      parameters: [
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
      name: "when the type is consulting, it should be equal to rate * frequency_value * number of months worked",
      parameters: [
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
      name: "when the type is sponsorship, it should be equal to rate * frequency_value * number of months worked",
      parameters: [
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
      name: "when the type is entrepreneurship, it should be equal to rate * quantity",
      parameters: [
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
      name: "when the activity is either admin or side project, it return 0",
      parameters: [
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
      name: "when the activity have not been enabled, it return null",
      parameters: [
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
  scenarios.forEach(({ name, parameters, expected }) => {
    it(name, () => {
      const result = computeAnnualTurnover(...parameters);
      const comparableResult = result == null ? result : Math.round(result);
      const comparableExpected =
        expected == null ? result : Math.round(expected);
      expect(comparableResult).toBe(comparableExpected);
    });
  });
});

describe("computeNumberOfDaysWorkedPerWeek", () => {
  const scenarios: UnitTestScenario<typeof computeNumberOfDaysWorkedPerWeek>[] =
    [
      {
        name: "when the type is freelance_daily_rate, it should be equal to quantity",
        parameters: [
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
        name: "when the type is freelance_on_delivery, it should be equal to average_time_spent",
        parameters: [
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
        name: "when the type is consulting, it should be equal to (quantity * average_time_spent) / NUMBER_OF_WEEKS_IN_A_MONTH / number_of_hours_worked_per_day",
        parameters: [
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
        name: "when the type is sponsorship, it should be equal to (quantity * average_time_spent) / NUMBER_OF_WEEKS_IN_A_MONTH / number_of_hours_worked_per_day",
        parameters: [
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
        name: "when the type is entrepreneurship, it should be equal to average_time_spent",
        parameters: [
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
        name: "when the activity is admin, it should return average time spent",
        parameters: [
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
        name: "when the activity is side_project, it should return average time spent",
        parameters: [
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
        name: "when the activity have not been enabled, it return null",
        parameters: [
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
  scenarios.forEach(({ name, parameters, expected }) => {
    it(name, () => {
      const result = computeNumberOfDaysWorkedPerWeek(...parameters);
      const comparableResult = result == null ? result : Math.round(result);
      const comparableExpected =
        expected == null ? result : Math.round(expected);
      expect(comparableResult).toBe(comparableExpected);
    });
  });
});

describe("findNumberOfDaysAvailableTextType", () => {
  const number_of_hours_worked_per_day = 7;
  const scenarios: UnitTestScenario<
    typeof findNumberOfDaysAvailableTextType
  >[] = [
    {
      name: "When the number of days available is below zero, it should return 'more_days_worked_than_days_available'",
      parameters: [-2, number_of_hours_worked_per_day],
      expected: "more_days_worked_than_days_available",
    },
    {
      name: "When the number is zero, it should return 'perfectly_balanced'",
      parameters: [0, number_of_hours_worked_per_day],
      expected: "perfectly_balanced",
    },
    {
      name: "When the number is above zero but below 3 hours, it should return 'hours'",
      parameters: [
        2.5 / number_of_hours_worked_per_day,
        number_of_hours_worked_per_day,
      ],
      expected: "hours",
    },
    {
      name: "When the number is above 3 hours but below 4 hours, it should return 'half_a_day'",
      parameters: [
        3.5 / number_of_hours_worked_per_day,
        number_of_hours_worked_per_day,
      ],
      expected: "half_a_day",
    },
    {
      name: "When the number of days available is above 4 hours but below 1 day, it should return 'hours'",
      parameters: [
        5 / number_of_hours_worked_per_day,
        number_of_hours_worked_per_day,
      ],
      expected: "hours",
    },
    {
      name: "When the number of days available is above or equal to 1 day, it should return 'days'",
      parameters: [1.2, number_of_hours_worked_per_day],
      expected: "days",
    },
  ];

  scenarios.forEach(({ name, parameters, expected }) => {
    it(name, () => {
      expect(findNumberOfDaysAvailableTextType(...parameters)).toBe(expected);
    });
  });
});
