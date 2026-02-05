const MISSION_ACTIVITY_COLOR = "#BFDBFE" as const;
const MISSION_ACTIVITY_COLOR_DARK = "#3B82F6" as const;
const PROJECT_ACTIVITY_COLOR = "#D9F99D" as const;
const PROJECT_ACTIVITY_COLOR_DARK = "#65A30D" as const;
const DISABLED_COLOR = "#E5E7EB" as const;

type StatusDefaults = {
  social_contributions_rate: number;
  income_tax: number;
  monthly_professional_expense: number;
};

const STATUS_CONFIG_DEFAULTS = {
  bnc: {
    social_contributions_rate: 26.1,
    income_tax: 8,
    monthly_professional_expense: 500,
  },
  bic: {
    social_contributions_rate: 21.2,
    income_tax: 8,
    monthly_professional_expense: 500,
  },
  eurl: {
    social_contributions_rate: 40,
    income_tax: 15,
    monthly_professional_expense: 1000,
  },
  sasu: {
    social_contributions_rate: 40,
    income_tax: 30,
    monthly_professional_expense: 1000,
  },
  artist: {
    social_contributions_rate: 26,
    income_tax: 8,
    monthly_professional_expense: 200,
  },
} as const;

type CompanyStatus = keyof typeof STATUS_CONFIG_DEFAULTS;

const COMPANY_STATUSES = Object.keys(STATUS_CONFIG_DEFAULTS) as CompanyStatus[];

export {
  MISSION_ACTIVITY_COLOR,
  PROJECT_ACTIVITY_COLOR,
  DISABLED_COLOR,
  MISSION_ACTIVITY_COLOR_DARK,
  PROJECT_ACTIVITY_COLOR_DARK,
  STATUS_CONFIG_DEFAULTS,
  COMPANY_STATUSES,
};

export type { StatusDefaults, CompanyStatus };
