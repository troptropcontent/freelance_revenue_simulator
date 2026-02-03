import { Inputs } from "src/components/simulator/inputs/types";

const getAverageEnjoymentRate = (activities: Inputs["activities"]): number => {
  let averageEnjoyment = 0;
  if (activities.length > 0) {
    const totalEnjoyment = activities.reduce(
      (sum, activity) => sum + (activity.enjoyment_rate || 0),
      0,
    );
    averageEnjoyment = totalEnjoyment / activities.length;
  }
  return averageEnjoyment;
};

export { getAverageEnjoymentRate };
