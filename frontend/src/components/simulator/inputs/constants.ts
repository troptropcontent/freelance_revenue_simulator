import { Inputs } from "./types";

const ACTIVITY_TYPES = ["mission", "project"] as const;

const MISSION_KINDS = ["hourly_rate", "daily_rate", "flat rate"] as const;

const PROJECT_KINDS = ["paid", "free"] as const;

const DEFAULT_NUMBER_OF_HOURS_WORKED_PER_DAY = 7;
const DEFAULT_NUMBER_DAYS_WORKED_PER_WEEKS = 5;
const DEFAULT_NUMBER_OF_DAYS_OFF_PER_YEAR =
  8 * DEFAULT_NUMBER_DAYS_WORKED_PER_WEEKS;
const DEFAULT_NUMBER_OF_WEEKS_OFF_PER_YEAR = 5;
const DEFAULT_NUMBER_OF_DAYS_SPENT_ON_ADMIN_TASKS = 1;
const MONDAY = "0" as const;
const TUESDAY = "1" as const;
const WEDNESDAY = "2" as const;
const THIRSTDAY = "3" as const;
const FRIDAY = "4" as const;
const SATURDAY = "5" as const;
const SUNDAY = "6" as const;
const DEFAULT_WEEKDAYS_WORKED = [MONDAY, TUESDAY, WEDNESDAY, THIRSTDAY, FRIDAY];

const DEFAULT_MISSION_DAILY_RATE = {
  name: "Prestation freelance au jour",
  enabled: false,
  enjoyment_rate: 1,
  average_time_spent: 1,
  type: "mission",
  kind: "daily_rate",
  rate: 0,
} satisfies Inputs["activities"][number];

const DEFAULT_MISSION_HOURLY_RATE = {
  name: "Heures de conseil",
  enabled: false,
  enjoyment_rate: 1,
  average_time_spent: 1,
  type: "mission",
  kind: "hourly_rate",
  rate: 0,
  frequency: "monthly",
  quantity: 0,
} satisfies Inputs["activities"][number];

const DEFAULT_MISSION_FLAT_RATE = {
  name: "Prestation freelance au forfait",
  enabled: false,
  enjoyment_rate: 1,
  average_time_spent: 1,
  type: "mission",
  kind: "flat_rate",
  frequency: "monthly",
  quantity: 0,
  rate: 0,
} satisfies Inputs["activities"][number];

const DEFAULT_PROJECT_FREE = {
  type: "project",
  kind: "free",
  name: "",
  enabled: false,
  average_time_spent: 1,
  enjoyment_rate: 1,
} satisfies Inputs["activities"][number];

const DEFAULT_PROJECT_PAID = {
  type: "project",
  kind: "paid",
  name: "",
  enabled: false,
  average_time_spent: 1,
  estimated_months_billed: 0,
  estimated_monthly_revenue: 0,
  enjoyment_rate: 1,
} satisfies Inputs["activities"][number];

const DEFAULT_ACTIVITIES: Record<
  Inputs["activities"][number]["kind"],
  Inputs["activities"][number]
> = {
  daily_rate: DEFAULT_MISSION_DAILY_RATE,
  hourly_rate: DEFAULT_MISSION_HOURLY_RATE,
  flat_rate: DEFAULT_MISSION_FLAT_RATE,
  free: DEFAULT_PROJECT_FREE,
  paid: DEFAULT_PROJECT_PAID,
};

export {
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THIRSTDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY,
  DEFAULT_WEEKDAYS_WORKED,
  DEFAULT_ACTIVITIES,
  DEFAULT_MISSION_DAILY_RATE,
  DEFAULT_MISSION_HOURLY_RATE,
  DEFAULT_MISSION_FLAT_RATE,
  ACTIVITY_TYPES,
  MISSION_KINDS,
  PROJECT_KINDS,
  DEFAULT_NUMBER_OF_HOURS_WORKED_PER_DAY,
  DEFAULT_NUMBER_DAYS_WORKED_PER_WEEKS,
  DEFAULT_NUMBER_OF_DAYS_OFF_PER_YEAR,
  DEFAULT_NUMBER_OF_WEEKS_OFF_PER_YEAR,
  DEFAULT_NUMBER_OF_DAYS_SPENT_ON_ADMIN_TASKS,
};
