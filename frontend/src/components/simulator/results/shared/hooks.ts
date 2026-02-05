import { Inputs } from "../../inputs/types";
import { UseFormReturn } from "react-hook-form";

/**
 * NEW APPROACH (more intuitive for users)
 *
 * This approach treats "available time" as the time allocation for activities.
 * Admin and vacation are efficiency factors applied separately (not direct subtractions).
 * Result: With no activities, available time = total working time
 *
 * Formula: Available = Working hours - Activities
 * (Admin and vacation should be applied later when calculating actual output/revenue)
 */
function useAvailableDaysPerWeek(form: UseFormReturn<Inputs>) {
  const { config, activities } = form.watch();

  // 1. Calculate working days per week
  const workingDaysPerWeek = config.weekdays_worked.length;

  // 2. Calculate total working hours per week (baseline)
  const totalHoursPerWeek =
    workingDaysPerWeek * config.number_of_hours_worked_per_day;

  // 3. Calculate time spent on activities per week
  const activityTimePerWeek = activities
    .filter((activity) => activity.enabled)
    .reduce((total, activity) => {
      // average_time_spent is in days per week
      const hoursForActivity =
        activity.average_time_spent * config.number_of_hours_worked_per_day;
      return total + hoursForActivity;
    }, 0);

  // 4. Calculate net available time
  // Simply subtract activities from total working hours
  const netAvailableTimeHours = totalHoursPerWeek - activityTimePerWeek;

  // Convert to days per week
  const netAvailableTime =
    netAvailableTimeHours / config.number_of_hours_worked_per_day;

  return netAvailableTime;
}

/**
 * Calculates the weighted average enjoyment rate across all enabled activities.
 * Each activity's enjoyment_rate is weighted by its average_time_spent.
 *
 * Formula: Σ(enjoyment_rate × time_spent) / Σ(time_spent)
 *
 * @returns The weighted average enjoyment rate (0-5 scale), or 0 if no activities are enabled
 */
function useAverageEnjoymentRate(form: UseFormReturn<Inputs>) {
  const { activities } = form.watch();

  const enabledActivities = activities.filter((activity) => activity.enabled);

  // If no activities are enabled, return 0
  if (enabledActivities.length === 0) {
    return 0;
  }

  // Calculate weighted sum and total weight
  const { weightedSum, totalWeight } = enabledActivities.reduce(
    (acc, activity) => {
      const weight = activity.average_time_spent;
      const weightedValue = activity.enjoyment_rate * weight;
      return {
        weightedSum: acc.weightedSum + weightedValue,
        totalWeight: acc.totalWeight + weight,
      };
    },
    { weightedSum: 0, totalWeight: 0 },
  );

  // Avoid division by zero (though this shouldn't happen if there are enabled activities)
  if (totalWeight === 0) {
    return 0;
  }

  return weightedSum / totalWeight;
}

/**
 * Calculates the estimated gross annual revenue from missions only.
 * Takes into account vacation time to provide a realistic annual projection.
 * Projects are excluded as they are handled separately (often already net).
 *
 * Revenue calculation by mission type:
 * - MissionHourlyRate: (rate × quantity) × 12 months
 * - MissionDailyRate: (rate × days_per_week × weeks_per_year)
 * - MissionFlat: (rate × quantity) × 12 months
 *
 * @returns Estimated gross annual mission revenue in currency units
 */
function useEstimatedGrossAnnualRevenue(form: UseFormReturn<Inputs>) {
  const { config, activities } = form.watch();

  const enabledActivities = activities.filter((activity) => activity.enabled);

  // Calculate weeks worked per year (accounting for vacation)
  const weeksWorkedPerYear = 52 - config.number_of_weeks_off_per_year;

  const annualMissionRevenue = enabledActivities.reduce((total, activity) => {
    // Only process missions, skip projects
    if (activity.type !== "mission") {
      return total;
    }

    let activityRevenue = 0;

    switch (activity.kind) {
      case "hourly_rate":
        // Hourly rate: rate × hours per month × 12 months
        activityRevenue = activity.rate * activity.quantity * 12;
        break;

      case "daily_rate":
        // Daily rate: rate × days per week × weeks worked per year
        activityRevenue =
          activity.rate * activity.average_time_spent * weeksWorkedPerYear;
        break;

      case "flat_rate":
        // Flat monthly rate: rate × quantity × 12 months

        activityRevenue =
          activity.rate *
          (activity.frequency == "yearly"
            ? activity.quantity
            : activity.quantity * 12);
        break;
    }

    return total + activityRevenue;
  }, 0);

  return annualMissionRevenue;
}

/**
 * Calculates the estimated annual revenue from paid projects only.
 * Project revenue is typically net (after client-side deductions).
 *
 * @returns Estimated annual project revenue in currency units
 */
function useEstimatedAnnualProjectRevenue(form: UseFormReturn<Inputs>) {
  const { activities } = form.watch();

  const enabledActivities = activities.filter((activity) => activity.enabled);

  const annualProjectRevenue = enabledActivities.reduce((total, activity) => {
    // Only process paid projects
    if (activity.type === "project" && activity.kind === "paid") {
      const projectRevenue =
        activity.estimated_monthly_revenue * activity.estimated_months_billed;
      return total + projectRevenue;
    }
    return total;
  }, 0);

  return annualProjectRevenue;
}

/**
 * Calculates the estimated net monthly income after all deductions.
 *
 * Calculation flow:
 * 1. Missions (gross):
 *    - Start with gross annual mission revenue (from useEstimatedGrossAnnualRevenue)
 *    - Convert to monthly: gross_annual / 12
 *    - Subtract professional expenses: monthly_gross - monthly_professional_expense
 *    - Subtract social contributions: remaining * (1 - social_contributions_rate/100)
 *    - Subtract income tax: remaining * (1 - income_tax/100)
 * 2. Projects (net):
 *    - Get annual project revenue (from useEstimatedAnnualProjectRevenue)
 *    - Convert to monthly: annual_projects / 12
 *    - Add directly (no deductions, already net)
 * 3. Total: net_missions + net_projects
 *
 * @returns Estimated net monthly income in currency units
 */
function useEstimatedNetMonthlyIncome(form: UseFormReturn<Inputs>) {
  const { config } = form.watch();

  // 1. Calculate net income from missions (subject to deductions)
  const grossAnnualMissionRevenue = useEstimatedGrossAnnualRevenue(form);
  const grossMonthlyMissionRevenue = grossAnnualMissionRevenue / 12;

  // Subtract professional expenses from missions
  const afterExpenses =
    grossMonthlyMissionRevenue - config.monthly_professional_expense;

  // Apply social contributions (as a percentage deduction)
  const afterSocialContributions =
    afterExpenses * (1 - config.social_contributions_rate / 100);

  // Apply income tax (as a percentage deduction)
  const netMonthlyMissionIncome =
    afterSocialContributions * (1 - config.income_tax / 100);

  // 2. Calculate net income from projects (already net, no deductions)
  const annualProjectRevenue = useEstimatedAnnualProjectRevenue(form);
  const monthlyProjectRevenue = annualProjectRevenue / 12;

  // 3. Combine both income sources
  const totalNetMonthlyIncome = netMonthlyMissionIncome + monthlyProjectRevenue;

  console.log({
    totalNetMonthlyIncome,
    exp: config.monthly_professional_expense,
  });

  return Math.max(0, totalNetMonthlyIncome); // Ensure non-negative
}

export {
  useAvailableDaysPerWeek,
  useAverageEnjoymentRate,
  useEstimatedGrossAnnualRevenue,
  useEstimatedNetMonthlyIncome,
};
