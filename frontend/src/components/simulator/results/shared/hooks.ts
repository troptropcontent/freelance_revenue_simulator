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

export { useAvailableDaysPerWeek, useAvailableDaysPerWeek_Old };
