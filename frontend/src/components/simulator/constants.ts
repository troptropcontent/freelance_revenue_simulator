import { BackgroundColor } from "../helper";

const ActivityKinds = [
  "freelancing",
  "entrepreneurial_project",
  "unbilled_activity",
] as const;

type ActivityKindsType = (typeof ActivityKinds)[number];

const ActivityKindColors = {
  entrepreneurial_project: "green.medium",
  freelancing: "blue.medium",
  unbilled_activity: "yellow.medium",
} as const satisfies Record<ActivityKindsType, BackgroundColor>;

const ActivityKindEmoji = {
  entrepreneurial_project: "🚀",
  freelancing: "🤝",
  unbilled_activity: "😎",
} as const satisfies Record<ActivityKindsType, string>;

type BaseActivity = {
  kind: ActivityKindsType;
};

type BaseActivityValues = {
  enjoyment_rate?: number;
};

const Frequencies = ["by_month", "by_year"] as const;

const NUMBER_OF_DAYS_IN_A_WEEK = 7;
const NUMBER_OF_WEEKS_PER_YEAR = 52;
const NUMBER_OF_MONTHS_IN_A_YEAR = 12;
const NUMBER_OF_WEEKS_IN_A_MONTH =
  NUMBER_OF_WEEKS_PER_YEAR / NUMBER_OF_MONTHS_IN_A_YEAR;
const DEFAULT_NUMBER_DAYS_WORKED_PER_WEEKS = 5;
const DEFAULT_NUMBER_OF_WEEKS_OF_PER_YEAR = 8;
const DEFAULT_NUMBER_OF_HOURS_SPENT_ON_ADMIN_TASKS_PER_WEEK = 0.5;
const DEFAULT_NUMBER_OF_HOURS_WORKED_PER_DAY = 7;
const MAX_RATE = 5;

type ActivitiesType = {
  freelance_daily_rate: BaseActivity & {
    initial_values: BaseActivityValues & {
      rate: number;
      quantity: number;
      enjoyment_rate: number;
    };
  };
  freelance_on_delivery: BaseActivity & {
    initial_values: BaseActivityValues & {
      rate: number;
      frequency_value: number;
      frequency_unit: (typeof Frequencies)[number];
      average_time_spent: number;
      enjoyment_rate: number;
    };
  };
  consulting: BaseActivity & {
    initial_values: BaseActivityValues & {
      rate: number;
      quantity: number;
      average_time_spent: number;
      enjoyment_rate: number;
    };
  };
  sponsorship: BaseActivity & {
    initial_values: BaseActivityValues & {
      rate: number;
      quantity: number;
      average_time_spent: number;
      enjoyment_rate: number;
    };
  };
  entrepreneurship: BaseActivity & {
    initial_values: BaseActivityValues & {
      name?: string;
      rate: number;
      quantity: number;
      average_time_spent: number;
      enjoyment_rate: number;
    };
  };
  side_project: BaseActivity & {
    initial_values: BaseActivityValues & {
      average_time_spent: number;
      enjoyment_rate: number;
    };
  };
  admin: BaseActivity & {
    initial_values: BaseActivityValues & {
      average_time_spent: number;
    };
  };
};

const Activities = {
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
      average_time_spent: 1,
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
    kind: "entrepreneurial_project",
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
      average_time_spent: 1,
      enjoyment_rate: 1,
    },
  },
  admin: {
    kind: "unbilled_activity",
    initial_values: {
      average_time_spent: 1,
    },
  },
} as const satisfies ActivitiesType;

type ActivitiesWithKind<V extends ActivityKindsType> = {
  [K in keyof typeof Activities]-?: (typeof Activities)[K]["kind"] extends V
    ? K
    : never;
}[keyof typeof Activities];

export {
  Activities,
  ActivityKinds,
  ActivityKindColors,
  ActivityKindEmoji,
  Frequencies,
  NUMBER_OF_DAYS_IN_A_WEEK,
  NUMBER_OF_MONTHS_IN_A_YEAR,
  NUMBER_OF_WEEKS_IN_A_MONTH,
  NUMBER_OF_WEEKS_PER_YEAR,
  DEFAULT_NUMBER_DAYS_WORKED_PER_WEEKS,
  DEFAULT_NUMBER_OF_WEEKS_OF_PER_YEAR,
  DEFAULT_NUMBER_OF_HOURS_SPENT_ON_ADMIN_TASKS_PER_WEEK,
  DEFAULT_NUMBER_OF_HOURS_WORKED_PER_DAY,
  MAX_RATE,
};

export type { ActivitiesWithKind, ActivitiesType };
