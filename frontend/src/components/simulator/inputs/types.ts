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

type ProjectPaid = {
  name: string;
  enabled: boolean;
  type: "project";
  kind: "paid";
  estimated_monthly_revenue: number;
  estilated_months_billed: number;
};

type ProjectFree = {
  name: string;
  enabled: boolean;
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
    number_of_days_off_per_year: number;
    number_of_days_worked_per_week: number;
    number_of_hours_worked_per_day: number;
  };
}

export type { Inputs, MissionDailyRate };
