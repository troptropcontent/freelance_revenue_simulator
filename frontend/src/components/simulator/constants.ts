const ActivityKinds = [
  "freelancing",
  "entrepeunarial_project",
  "unbilled_activity",
] as const;

type BaseActivity = {
  kind: (typeof ActivityKinds)[number];
};

const Frequencies = ["by_month", "by_year"] as const;

const Activities: {
  freelance_daily_rate: BaseActivity & {
    initial_values: {
      rate: number;
      quantity: number;
      enjoyment_rate: number;
    };
  };
  freelance_on_delivery: BaseActivity & {
    initial_values: {
      rate: number;
      frequency_value: number;
      frequency_unit: (typeof Frequencies)[number];
      average_time_spent: number;
      enjoyment_rate: number;
    };
  };
  consulting: BaseActivity & {
    initial_values: {
      rate: number;
      quantity: number;
      enjoyment_rate: number;
    };
  };
  sponsorship: BaseActivity & {
    initial_values: {
      rate: number;
      quantity: number;
      average_time_spent: number;
      enjoyment_rate: number;
    };
  };
  entrepreneurship: BaseActivity & {
    initial_values: {
      rate: number;
      quantity: number;
      average_time_spent: number;
      enjoyment_rate: number;
    };
  };
  side_project: BaseActivity & {
    initial_values: {
      revenue: number;
      average_time_spent: number;
      enjoyment_rate: number;
    };
  };
  admin: BaseActivity & {
    initial_values: {
      average_time_spent: number;
    };
  };
} = {
  freelance_daily_rate: {
    kind: "freelancing",
    initial_values: {
      rate: 150,
      quantity: 1,
      enjoyment_rate: 1,
    },
  },
  freelance_on_delivery: {
    kind: "freelancing",
    initial_values: {
      rate: 100,
      frequency_value: 1,
      frequency_unit: "by_month",
      average_time_spent: 1,
      enjoyment_rate: 1,
    },
  },
  consulting: {
    kind: "freelancing",
    initial_values: {
      rate: 100,
      quantity: 1,
      enjoyment_rate: 1,
    },
  },
  sponsorship: {
    kind: "freelancing",
    initial_values: {
      rate: 100,
      quantity: 1,
      average_time_spent: 1,
      enjoyment_rate: 1,
    },
  },
  entrepreneurship: {
    kind: "entrepeunarial_project",
    initial_values: {
      rate: 100,
      quantity: 1,
      average_time_spent: 1,
      enjoyment_rate: 1,
    },
  },
  side_project: {
    kind: "unbilled_activity",
    initial_values: {
      revenue: 100,
      average_time_spent: 1,
      enjoyment_rate: 1,
    },
  },
  admin: {
    kind: "unbilled_activity",
    initial_values: {
      average_time_spent: 0,
    },
  },
} as const;

const AverageWorkingConditions = {
  weeksPerYear: 52,
  weeksOffPerYear: 0,
  daysOffPerWeek: 2,
  daysWorkedPerWeek: 5,
  hoursWorkedPerDay: 7,
  averageWorkedDaysPerWeek: 4.33,
  timeSpentOnAdminTasksPerWeek: 0.5,
} as const;

export { Activities, ActivityKinds, AverageWorkingConditions, Frequencies };
