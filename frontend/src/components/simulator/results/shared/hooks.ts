import { Inputs } from "../../inputs/types";
import { UseFormReturn } from "react-hook-form";

/**
 * OLD APPROACH (kept for reference)
 *
 * This approach treats admin time and vacation as direct subtractions from available time.
 * Result: Even with no activities, available time < total working time
 *
 * Formula: Available = (Working hours - Admin) × Vacation factor - Activities
 */
function useAvailableDaysPerWeek_Old(form: UseFormReturn<Inputs>) {
  console.log({ inputs: form.watch() });
  const { config, activities } = form.watch();

  // 1. Calculate working days per week
  const workingDaysPerWeek = config.weekdays_worked.length;

  // 2. Calculate total working hours per week (baseline)
  const totalHoursPerWeek =
    workingDaysPerWeek * config.number_of_hours_worked_per_day;

  // 3. Calculate admin overhead per week
  // Convert monthly admin days to weekly (divide by ~4.33 weeks/month)
  const adminDaysPerWeek = config.number_of_days_spent_on_admin_tasks / 4.33;
  const adminHoursPerWeek =
    adminDaysPerWeek * config.number_of_hours_worked_per_day;

  // 4. Calculate vacation impact
  // Weeks worked per year = 52 - weeks off
  const weeksWorkedPerYear = 52 - config.number_of_weeks_off_per_year;
  const vacationAdjustmentFactor = weeksWorkedPerYear / 52;

  // 5. Calculate time spent on activities per week
  const activityTimePerWeek = activities
    .filter((activity) => activity.enabled)
    .reduce((total, activity) => {
      // average_time_spent is in days per week
      const hoursForActivity =
        activity.average_time_spent * config.number_of_hours_worked_per_day;
      return total + hoursForActivity;
    }, 0);

  // 6. Calculate net available time
  const availableBeforeActivities =
    (totalHoursPerWeek - adminHoursPerWeek) * vacationAdjustmentFactor;
  const netAvailableTimeHours = availableBeforeActivities - activityTimePerWeek;

  // Convert to days per week
  const netAvailableTime =
    netAvailableTimeHours / config.number_of_hours_worked_per_day;

  return netAvailableTime;
}

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
  console.log({ inputs: form.watch() });
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

export {
  useAvailableDaysPerWeek,
  useAvailableDaysPerWeek_Old,
  useAverageEnjoymentRate,
};
