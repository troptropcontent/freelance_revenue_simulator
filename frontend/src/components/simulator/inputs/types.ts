type Weekday = "0" | "1" | "2" | "3" | "4" | "5" | "6";

type BaseActivity = {
  name: string;
  enabled: boolean;
  enjoyment_rate: number;
  average_time_spent: number;
};

type MissionHourlyRate = BaseActivity & {
  type: "mission";
  kind: "hourly_rate";
  rate: number;
  quantity: number;
  frequency: "monthly";
};

type MissionDailyRate = BaseActivity & {
  type: "mission";
  kind: "daily_rate";
  rate: number;
};

type MissionFlat = BaseActivity & {
  type: "mission";
  kind: "flat_rate";
  rate: number;
  quantity: number;
  frequency: "monthly";
};

type ProjectPaid = BaseActivity & {
  type: "project";
  kind: "paid";
  estimated_monthly_revenue: number;
  estimated_months_billed: number;
};

type ProjectFree = BaseActivity & {
  type: "project";
  kind: "free";
};

type Activity =
  | MissionHourlyRate
  | MissionDailyRate
  | MissionFlat
  | ProjectPaid
  | ProjectFree;

interface Inputs {
  activities: Activity[];
  config: {
    number_of_days_spent_on_admin_tasks: number;
    number_of_weeks_off_per_year: number;
    weekdays_worked: Weekday[];
  };
}

export type { Inputs, MissionDailyRate };
