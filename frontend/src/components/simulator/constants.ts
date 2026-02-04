import { BackgroundColor } from "../helper";
import {
  DEFAULT_INCOME_TAX,
  DEFAULT_MONTHLY_PROFESSIONAL_EXPENSE,
  DEFAULT_NUMBER_OF_WEEKS_OFF_PER_YEAR,
  DEFAULT_SOCIAL_CONTRIBUTIONS_RATE,
  DEFAULT_WEEKDAYS_WORKED,
  NUMBER_OF_HOURS_WORKED_PER_DAY,
} from "./inputs/constants";
import { Inputs } from "./inputs/types";
import Lucie from "src/assets/lucie.jpg";
import Tom from "src/assets/tom.jpg";
import Pierre from "src/assets/pierre.png";

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
const DEFAULT_NUMBER_OF_WEEKS_OF_PER_YEAR = 5;
const DEFAULT_NUMBER_OF_DAYS_OFF_PER_YEAR =
  8 * DEFAULT_NUMBER_DAYS_WORKED_PER_WEEKS;
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
      enjoyment_rate: number;
    };
  };
  time_off: BaseActivity & {
    initial_values: BaseActivityValues & {
      quantity: number;
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
      enjoyment_rate: 1,
    },
  },
  time_off: {
    kind: "unbilled_activity",
    initial_values: {
      quantity: 5,
    },
  },
} as const satisfies ActivitiesType;

type ActivitiesWithKind<V extends ActivityKindsType> = {
  [K in keyof typeof Activities]-?: (typeof Activities)[K]["kind"] extends V
    ? K
    : never;
}[keyof typeof Activities];

const Models = {
  pierre: {
    name: "Pierre Guilbaud",
    description: "Freelance Growth for Good",
    avatar: Pierre,
    inputs: {
      activities: [
        {
          name: "Prestation freelance au jour",
          enabled: true,
          enjoyment_rate: 1,
          average_time_spent: 1,
          type: "mission",
          kind: "daily_rate",
          rate: 600,
        },
      ],
      config: {
        number_of_days_spent_on_admin_tasks:
          DEFAULT_NUMBER_OF_HOURS_SPENT_ON_ADMIN_TASKS_PER_WEEK,
        number_of_weeks_off_per_year: DEFAULT_NUMBER_OF_WEEKS_OFF_PER_YEAR,
        weekdays_worked: DEFAULT_WEEKDAYS_WORKED,
        number_of_hours_worked_per_day: NUMBER_OF_HOURS_WORKED_PER_DAY,
        monthly_professional_expense: DEFAULT_MONTHLY_PROFESSIONAL_EXPENSE,
        social_contributions_rate: DEFAULT_SOCIAL_CONTRIBUTIONS_RATE,
        income_tax: DEFAULT_INCOME_TAX,
      },
    },
  },
  lucie: {
    name: "Lucie Sevaistre",
    description: "Designer freelance",
    avatar: Lucie,
    inputs: {
      activities: [
        {
          name: "Heures de conseil",
          enabled: true,
          enjoyment_rate: 1,
          average_time_spent: 1,
          type: "mission",
          kind: "hourly_rate",
          rate: 100,
          frequency: "monthly",
          quantity: 1,
        },
      ],
      config: {
        number_of_days_spent_on_admin_tasks:
          DEFAULT_NUMBER_OF_HOURS_SPENT_ON_ADMIN_TASKS_PER_WEEK,
        number_of_weeks_off_per_year: DEFAULT_NUMBER_OF_WEEKS_OFF_PER_YEAR,
        weekdays_worked: DEFAULT_WEEKDAYS_WORKED,
        number_of_hours_worked_per_day: NUMBER_OF_HOURS_WORKED_PER_DAY,
        monthly_professional_expense: DEFAULT_MONTHLY_PROFESSIONAL_EXPENSE,
        social_contributions_rate: DEFAULT_SOCIAL_CONTRIBUTIONS_RATE,
        income_tax: DEFAULT_INCOME_TAX,
      },
    },
  },
  tom: {
    name: "Tom Ecrepont",
    description: "Développeur freelance",
    avatar: Tom,
    inputs: {
      activities: [
        {
          name: "Prestation freelance au forfait",
          enabled: true,
          enjoyment_rate: 1,
          average_time_spent: 1,
          type: "mission",
          kind: "flat_rate",
          frequency: "monthly",
          quantity: 1,
          rate: 1000,
        },
      ],
      config: {
        number_of_days_spent_on_admin_tasks:
          DEFAULT_NUMBER_OF_HOURS_SPENT_ON_ADMIN_TASKS_PER_WEEK,
        number_of_weeks_off_per_year: DEFAULT_NUMBER_OF_WEEKS_OFF_PER_YEAR,
        weekdays_worked: DEFAULT_WEEKDAYS_WORKED,
        number_of_hours_worked_per_day: NUMBER_OF_HOURS_WORKED_PER_DAY,
        monthly_professional_expense: DEFAULT_MONTHLY_PROFESSIONAL_EXPENSE,
        social_contributions_rate: DEFAULT_SOCIAL_CONTRIBUTIONS_RATE,
        income_tax: DEFAULT_INCOME_TAX,
      },
    },
  },
} as const satisfies Record<
  string,
  { avatar: string; inputs: Inputs; name: string; description: string }
>;

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
  DEFAULT_NUMBER_OF_DAYS_OFF_PER_YEAR,
  DEFAULT_NUMBER_OF_HOURS_SPENT_ON_ADMIN_TASKS_PER_WEEK,
  DEFAULT_NUMBER_OF_HOURS_WORKED_PER_DAY,
  MAX_RATE,
  Models,
};

export type { ActivitiesWithKind, ActivitiesType };
