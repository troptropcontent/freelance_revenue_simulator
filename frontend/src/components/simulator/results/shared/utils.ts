import { Inputs } from "../../inputs/types";

const MINIMUM_RANGE_WIDTH = 1 as const;
/**
 * Computes the width and color for the available time per week bar
 * Based on how booked the week is:
 * - Purple: Partially booked (availableDaysPerWeek > 0)
 * - Green: Perfectly booked (availableDaysPerWeek = 0)
 * - Red: Overbooked (availableDaysPerWeek < 0)
 */
export function computeRangeWidthAndColor(
  availableDaysPerWeek: number,
  daysWorkedPerWeek: number,
): { rangeWidth: number; barColor: string } {
  // Calculate how full the week is (can be > 1 if overbooked)
  const weekCompletionPercentage =
    daysWorkedPerWeek > 0 ? 1 - availableDaysPerWeek / daysWorkedPerWeek : 0;

  const rangeWidth = Math.min(
    100,
    Math.max(MINIMUM_RANGE_WIDTH, weekCompletionPercentage * 100),
  );

  // Determine color based on available days
  let barColor: string;
  if (availableDaysPerWeek < 0) {
    barColor = "bg-red-500"; // Overbooked
  } else if (availableDaysPerWeek === 0) {
    barColor = "bg-emerald-300"; // Perfectly booked
  } else {
    barColor = "bg-purple-900"; // Partially booked
  }

  return { rangeWidth, barColor };
}

type RepartitionItem = {
  name: string;
  kind: string;
  value: number;
};

type ActivityTypeBreakdown = {
  total: number;
  repartition: RepartitionItem[];
};

type NetRevenueByActivityType = {
  total: number;
  mission: ActivityTypeBreakdown;
  project: ActivityTypeBreakdown;
};

/**
 * Computes annual net revenue split by activity type (mission vs project),
 * with detailed breakdown per activity.
 *
 * - Missions: gross revenue → expenses → social contributions → income tax
 * - Projects: already net (no deductions applied)
 */
export function computeNetRevenueByActivityType(
  values: Inputs,
): NetRevenueByActivityType {
  const { config, activities } = values;

  const enabledActivities = activities.filter((activity) => activity.enabled);
  const weeksWorkedPerYear = 52 - config.number_of_weeks_off_per_year;

  // 1. Calculate gross revenue for each mission
  const missionGrossRevenues = enabledActivities
    .filter((activity) => activity.type === "mission")
    .map((activity) => {
      let grossRevenue = 0;

      switch (activity.kind) {
        case "hourly_rate":
          grossRevenue = activity.rate * activity.quantity * 12;
          break;
        case "daily_rate":
          grossRevenue =
            activity.rate * activity.average_time_spent * weeksWorkedPerYear;
          break;
        case "flat_rate":
          grossRevenue = activity.rate * activity.quantity * 12;
          break;
      }

      return { name: activity.name, kind: activity.kind, grossRevenue };
    });

  // 2. Calculate total gross and net mission revenue
  const totalGrossMission = missionGrossRevenues.reduce(
    (sum, m) => sum + m.grossRevenue,
    0,
  );

  const grossMonthlyMission = totalGrossMission / 12;
  const afterExpenses =
    grossMonthlyMission - config.monthly_professional_expense;
  const afterSocial =
    afterExpenses * (1 - config.social_contributions_rate / 100);
  const netMonthlyMission = afterSocial * (1 - config.income_tax / 100);
  const totalNetMission = Math.max(0, netMonthlyMission * 12);

  // 3. Apply deduction ratio to each mission proportionally
  const deductionRatio =
    totalGrossMission > 0 ? totalNetMission / totalGrossMission : 0;

  const missionRepartition: RepartitionItem[] = missionGrossRevenues.map(
    ({ name, kind, grossRevenue }) => ({
      name,
      kind,
      value: grossRevenue * deductionRatio,
    }),
  );

  // 4. Calculate project revenues (already net)
  const projectRepartition: RepartitionItem[] = enabledActivities
    .filter((activity) => activity.type === "project" && activity.kind === "paid")
    .map((activity) => ({
      name: activity.name,
      kind: activity.kind,
      value:
        activity.estimated_monthly_revenue * activity.estimated_months_billed,
    }));

  const totalNetProject = projectRepartition.reduce(
    (sum, p) => sum + p.value,
    0,
  );

  return {
    total: totalNetMission + totalNetProject,
    mission: {
      total: totalNetMission,
      repartition: missionRepartition,
    },
    project: {
      total: totalNetProject,
      repartition: projectRepartition,
    },
  };
}

export type { NetRevenueByActivityType, ActivityTypeBreakdown, RepartitionItem };
