type DefaultActivity = {
  displayInInitialValues: boolean;
  defaultValue: object;
};

const Activities: {
  freelance_daily_rate: DefaultActivity & {
    defaultValue: {
      rate: number;
      quantity: number;
      enjoyment_rate: number;
    };
  };
  freelance_on_delivery: DefaultActivity & {
    defaultValue: {
      rate: number;
      quantity: number;
      average_time_spent: number;
      enjoyment_rate: number;
    };
  };
  consulting: DefaultActivity & {
    defaultValue: {
      rate: number;
      quantity: number;
      enjoyment_rate: number;
    };
  };
  sponsorship: DefaultActivity & {
    defaultValue: {
      rate: number;
      quantity: number;
      average_time_spent: number;
      enjoyment_rate: number;
    };
  };
  side_project: DefaultActivity & {
    defaultValue: {
      revenue: number;
      average_time_spent: number;
      enjoyment_rate: number;
    };
  };
  training: DefaultActivity & {
    defaultValue: {
      rate: number;
      quantity: number;
      average_time_spent: number;
      enjoyment_rate: number;
    };
  };
  digital_product: DefaultActivity & {
    defaultValue: {
      rate: number;
      quantity: number;
      average_time_spent: number;
      enjoyment_rate: number;
    };
  };
} = {
  freelance_daily_rate: {
    defaultValue: {
      rate: 150,
      quantity: 1,
      enjoyment_rate: 1,
    },
    displayInInitialValues: true,
  },
  freelance_on_delivery: {
    defaultValue: {
      rate: 100,
      quantity: 1,
      average_time_spent: 1,
      enjoyment_rate: 1,
    },
    displayInInitialValues: false,
  },
  consulting: {
    defaultValue: {
      rate: 100,
      quantity: 1,
      enjoyment_rate: 1,
    },
    displayInInitialValues: false,
  },
  sponsorship: {
    defaultValue: {
      rate: 100,
      quantity: 1,
      average_time_spent: 1,
      enjoyment_rate: 1,
    },
    displayInInitialValues: false,
  },
  side_project: {
    defaultValue: {
      revenue: 100,
      average_time_spent: 1,
      enjoyment_rate: 1,
    },
    displayInInitialValues: false,
  },
  training: {
    defaultValue: {
      rate: 100,
      quantity: 1,
      average_time_spent: 1,
      enjoyment_rate: 1,
    },
    displayInInitialValues: false,
  },
  digital_product: {
    defaultValue: {
      rate: 100,
      quantity: 1,
      average_time_spent: 1,
      enjoyment_rate: 1,
    },
    displayInInitialValues: false,
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

export { Activities, AverageWorkingConditions };
