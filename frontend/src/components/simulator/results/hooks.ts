import { useFormikContext } from "formik";
import { FormValues } from "src/App";
import {
  Activities,
  AverageWorkingConditions,
} from "src/components/simulator/constants";
import { computeAnnualTurnover } from "./utils";

const useAnnualTurnover = () => {
  const { values } = useFormikContext<FormValues>();
  const annualTurnoverPerActivities: {
    [key in Exclude<keyof typeof Activities, "admin">]: number;
  } = {
    freelance_daily_rate: computeAnnualTurnover(
      values.freelance_daily_rate,
      values.weeks_off,
    ),
    freelance_on_delivery: computeAnnualTurnover(
      values.freelance_on_delivery,
      values.weeks_off,
    ),
    consulting: computeAnnualTurnover(values.consulting, values.weeks_off),
    sponsorship: computeAnnualTurnover(values.sponsorship, values.weeks_off),
    side_project: values.side_project ? values.side_project.revenue * 12 : 0,
    training: computeAnnualTurnover(values.training, values.weeks_off),
    digital_product: computeAnnualTurnover(
      values.digital_product,
      values.weeks_off,
    ),
  };

  return Object.values(annualTurnoverPerActivities).reduce((acc, value) => {
    acc += value;
    return acc;
  }, 0);
};

const useAvailableTimePerWeek = () => {
  const {
    values: {
      freelance_daily_rate,
      freelance_on_delivery,
      consulting,
      sponsorship,
      side_project,
      training,
      digital_product,
      admin,
    },
  } = useFormikContext<FormValues>();
  const daysUsedPerWeekPerActivities: {
    [key in keyof typeof Activities]: number;
  } = {
    freelance_daily_rate: freelance_daily_rate
      ? freelance_daily_rate.quantity / 4
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
    admin: admin ? admin.average_time_spent : 0,
  };

  return Object.values(daysUsedPerWeekPerActivities).reduce((acc, value) => {
    acc -= value;
    return acc;
  }, AverageWorkingConditions.daysWorkedPerWeek);
};

export { useAnnualTurnover, useAvailableTimePerWeek };
