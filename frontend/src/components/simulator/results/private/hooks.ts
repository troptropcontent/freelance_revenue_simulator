import { useFormikContext } from "formik";
import { FormValues } from "src/App";
import {
  Activities,
  AverageWorkingConditions,
} from "src/components/simulator/constants";
import { computeAnnualTurnover } from "./utils";

// TODO: use a useMemo here to avoid recomputing the values if the form values didn't change
const useRevenueAnalysis = () => {
  const { values } = useFormikContext<FormValues>();
  const annualTurnoverPerActivities: {
    [key in Exclude<keyof typeof Activities, "admin">]: number;
  } = {
    freelance_daily_rate: computeAnnualTurnover(
      values.freelance_daily_rate,
      values.general_info.weeks_off,
      true,
    ),
    freelance_on_delivery: computeAnnualTurnover(
      values.freelance_on_delivery,
      values.general_info.weeks_off,
    ),
    consulting: computeAnnualTurnover(
      values.consulting,
      values.general_info.weeks_off,
    ),
    sponsorship: computeAnnualTurnover(
      values.sponsorship,
      values.general_info.weeks_off,
    ),
    side_project: values.side_project ? values.side_project.revenue * 12 : 0,
    training: computeAnnualTurnover(
      values.training,
      values.general_info.weeks_off,
    ),
    digital_product: computeAnnualTurnover(
      values.digital_product,
      values.general_info.weeks_off,
    ),
  };

  const annualTurnover = Object.values(annualTurnoverPerActivities).reduce(
    (acc, curr) => acc + curr,
    0,
  );

  return { annualTurnoverPerActivities, annualTurnover };
};

// TODO: use a useMemo here to avoid recomputing the values if the form values didn't change
const useWorkedWeekAnalysis = () => {
  const {
    values: {
      freelance_daily_rate,
      freelance_on_delivery,
      consulting,
      sponsorship,
      side_project,
      training,
      digital_product,
      general_info,
    },
  } = useFormikContext<FormValues>();

  const daysUsedPerWeek: {
    activities: {
      [key in Exclude<keyof typeof Activities, "admin">]: number;
    };
    admin: number;
  } = {
    activities: {
      freelance_daily_rate: freelance_daily_rate
        ? freelance_daily_rate.quantity
        : 0,
      freelance_on_delivery: freelance_on_delivery
        ? freelance_on_delivery.average_time_spent *
          freelance_on_delivery.quantity *
          4
        : 0,
      consulting: consulting ? consulting.quantity / 4 / 7 : 0,
      sponsorship: sponsorship
        ? (sponsorship.quantity * sponsorship.average_time_spent) / 4
        : 0,
      side_project: side_project ? side_project.average_time_spent : 0,
      training: training ? training.quantity / 4 / 7 : 0,
      digital_product: digital_product ? digital_product.quantity / 4 / 7 : 0,
    },
    admin: general_info.time_spent_on_admin_tasks,
  };

  const daysWorkedPerWeek = Object.values(daysUsedPerWeek.activities).reduce(
    (acc, curr) => acc + curr,
    general_info.time_spent_on_admin_tasks,
  );

  const daysAvailablePerWeek =
    AverageWorkingConditions.daysWorkedPerWeek - daysWorkedPerWeek;

  return {
    daysUsedPerWeek,
    daysAvailablePerWeek,
    daysWorkedPerWeek,
  };
};

export { useRevenueAnalysis, useWorkedWeekAnalysis };
