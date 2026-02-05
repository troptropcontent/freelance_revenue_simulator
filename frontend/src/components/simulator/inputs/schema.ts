import { z } from "zod";

/** Day of the week represented as a string number (0=Sunday, 6=Saturday) */
const WeekdaySchema = z.enum(["0", "1", "2", "3", "4", "5", "6"]);

/** Base properties shared across all activity types */
const BaseActivitySchema = z.object({
  name: z.string(),
  enabled: z.boolean(),
  enjoyment_rate: z.number(),
  average_time_spent: z.number(),
});

/** Mission billed by hourly rate */
const MissionHourlyRateSchema = BaseActivitySchema.extend({
  type: z.literal("mission"),
  kind: z.literal("hourly_rate"),
  rate: z.number(),
  quantity: z.number(),
  frequency: z.enum(["monthly", "yearly"]),
});

/** Mission billed by daily rate */
const MissionDailyRateSchema = BaseActivitySchema.extend({
  type: z.literal("mission"),
  kind: z.literal("daily_rate"),
  rate: z.number(),
});

/** Mission with a flat monthly fee */
const MissionFlatSchema = BaseActivitySchema.extend({
  type: z.literal("mission"),
  kind: z.literal("flat_rate"),
  rate: z.number(),
  quantity: z.number(),
  frequency: z.enum(["monthly", "yearly"]),
});

/** Paid project with defined revenue expectations */
const ProjectPaidSchema = BaseActivitySchema.extend({
  type: z.literal("project"),
  kind: z.literal("paid"),
  estimated_monthly_revenue: z.number(),
  estimated_months_billed: z.number(),
});

/** Unpaid project (e.g., open source, learning, portfolio work) */
const ProjectFreeSchema = BaseActivitySchema.extend({
  type: z.literal("project"),
  kind: z.literal("free"),
});

/** Union type representing any possible activity */
const ActivitySchema = z.discriminatedUnion("kind", [
  MissionHourlyRateSchema,
  MissionDailyRateSchema,
  MissionFlatSchema,
  ProjectPaidSchema,
  ProjectFreeSchema,
]);

/** Main input configuration for the freelance revenue simulator */
const InputsSchema = z.object({
  activities: z.array(ActivitySchema),
  config: z.object({
    number_of_days_spent_on_admin_tasks: z.number(),
    number_of_weeks_off_per_year: z.number(),
    number_of_hours_worked_per_day: z.number(),
    weekdays_worked: z.array(WeekdaySchema),
    monthly_professional_expense: z.number(),
    social_contributions_rate: z.number(),
    income_tax: z.number(),
  }),
});

export { InputsSchema, ActivitySchema };
