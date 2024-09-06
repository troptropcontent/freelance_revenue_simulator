import { useFormikContext } from "formik";
import { FormValues } from "src/App";
import {
  Activities,
  AverageWorkingConditions,
} from "src/components/simulator/constants";
import { computeAnnualTurnover } from "./utils";

// TODO: use a useMemo here to avoid recomputing the values if the form values didn't change
const useRevenueAnalysis = () => {
  const {
    values: {
      general_informations: { weeks_off },
      activities: {
        consulting,
        freelance_daily_rate,
        freelance_on_delivery,
        sponsorship,
        side_project,
        training,
        digital_product,
      },
    },
  } = useFormikContext<FormValues>();
  const annualTurnoverPerActivities: {
    [key in keyof FormValues["activities"]]: number;
  } = {
    freelance_daily_rate: computeAnnualTurnover(
      freelance_daily_rate,
      weeks_off,
      true,
    ),
    freelance_on_delivery: computeAnnualTurnover(
      freelance_on_delivery,
      weeks_off,
    ),
    consulting: computeAnnualTurnover(consulting, weeks_off),
    sponsorship: computeAnnualTurnover(sponsorship, weeks_off),
    side_project: side_project ? side_project.revenue * 12 : 0,
    training: computeAnnualTurnover(training, weeks_off),
    digital_product: computeAnnualTurnover(digital_product, weeks_off),
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
      activities: {
        freelance_daily_rate,
        freelance_on_delivery,
        consulting,
        sponsorship,
        side_project,
        training,
        digital_product,
      },
      general_informations: { time_spent_on_admin_tasks },
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
    admin: time_spent_on_admin_tasks,
  };

  const daysWorkedPerWeek = Object.values(daysUsedPerWeek.activities).reduce(
    (acc, curr) => acc + curr,
    time_spent_on_admin_tasks,
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
