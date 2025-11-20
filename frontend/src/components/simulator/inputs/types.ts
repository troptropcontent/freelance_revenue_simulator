/** Day of the week represented as a string number (0=Sunday, 6=Saturday) */
type Weekday = "0" | "1" | "2" | "3" | "4" | "5" | "6";

/** Base properties shared across all activity types */
type BaseActivity = {
  /** Display name of the activity */
  name: string;
  /** Whether this activity is currently active and should be included in calculations */
  enabled: boolean;
  /** Subjective enjoyment rating (0-10 scale) indicating how much you enjoy this activity */
  enjoyment_rate: number;
  /** Average number of days spent weekly per occurrence of this activity */
  average_time_spent: number;
};

/** Mission billed by hourly rate */
type MissionHourlyRate = BaseActivity & {
  type: "mission";
  kind: "hourly_rate";
  /** Hourly billing rate in currency units */
  rate: number;
  /** Number of hours per month */
  quantity: number;
  frequency: "monthly";
};

/** Mission billed by daily rate */
type MissionDailyRate = BaseActivity & {
  type: "mission";
  kind: "daily_rate";
  /** Daily billing rate in currency units */
  rate: number;
};

/** Mission with a flat monthly fee */
type MissionFlat = BaseActivity & {
  type: "mission";
  kind: "flat_rate";
  /** Monthly flat fee in currency units */
  rate: number;
  /** Number of occurrences per month */
  quantity: number;
  frequency: "monthly";
};

/** Paid project with defined revenue expectations */
type ProjectPaid = BaseActivity & {
  type: "project";
  kind: "paid";
  /** Expected revenue per month in currency units */
  estimated_monthly_revenue: number;
  /** Number of months this project will generate revenue */
  estimated_months_billed: number;
};

/** Unpaid project (e.g., open source, learning, portfolio work) */
type ProjectFree = BaseActivity & {
  type: "project";
  kind: "free";
};

/** Union type representing any possible activity */
type Activity =
  | MissionHourlyRate
  | MissionDailyRate
  | MissionFlat
  | ProjectPaid
  | ProjectFree;

/** Main input configuration for the freelance revenue simulator */
interface Inputs {
  /** List of all activities (missions and projects) */
  activities: Activity[];
  /** General working configuration parameters */
  config: {
    /** Number of days per month dedicated to administrative tasks (emails, invoicing, etc.) */
    number_of_days_spent_on_admin_tasks: number;
    /** Number of weeks of vacation/time off per year */
    number_of_weeks_off_per_year: number;
    /** Total working hours per day */
    number_of_hours_worked_per_day: number;
    /** Days of the week you work (e.g., Monday-Friday would be ["1", "2", "3", "4", "5"]) */
    weekdays_worked: Weekday[];
  };
}

export type { Inputs, MissionDailyRate };
