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
