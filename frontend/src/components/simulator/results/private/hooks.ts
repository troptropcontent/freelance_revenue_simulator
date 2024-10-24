import { useFormikContext } from "formik";
import { FormValues } from "src/App";
import { ActivitiesType, MAX_RATE } from "src/components/simulator/constants";
import {
  computeAnnualTurnover,
  computeNumberOfDaysWorkedPerWeek,
} from "./utils";
import { useMemo } from "react";

const useAnnualTurnoverPerActivity = (): {
  name?: string;
  type: keyof ActivitiesType;
  annualTurnover: number | null;
}[] => {
  const {
    values: {
      activities,
      config: { weeks_off },
    },
  } = useFormikContext<FormValues>();

  const computeResult = () =>
    activities.map((activity) => {
      return {
        name: activity.name,
        type: activity.type,
        annualTurnover: computeAnnualTurnover(activity, weeks_off),
      };
    });

  return useMemo(computeResult, [activities, weeks_off]);
};

const useTotalAnnualTurnover = (): number => {
  const annual_turnover_per_activity = useAnnualTurnoverPerActivity();
  return useMemo(
    () =>
      annual_turnover_per_activity.reduce(
        (acc, { annualTurnover }) =>
          annualTurnover ? acc + annualTurnover : acc,
        0,
      ),
    [annual_turnover_per_activity],
  );
};

const useNumberOfDaysWorkedPerWeekPerActivity = (): {
  name?: string;
  type: keyof ActivitiesType;
  daysWorkedPerWeek: number | null;
}[] => {
  const {
    values: {
      activities,
      config: { number_of_hours_worked_per_day },
    },
  } = useFormikContext<FormValues>();

  const computeResult = () =>
    activities.map((activity) => {
      return {
        name: activity.name,
        type: activity.type,
        daysWorkedPerWeek: computeNumberOfDaysWorkedPerWeek(
          activity,
          number_of_hours_worked_per_day,
        ),
      };
    });

  return useMemo(computeResult, [activities, number_of_hours_worked_per_day]);
};

const useTotalNumberOfDaysAvailablePerWeek = (): number => {
  const {
    values: {
      config: { number_of_days_worked_per_week },
    },
  } = useFormikContext<FormValues>();
  const number_of_days_worked_per_week_activity =
    useNumberOfDaysWorkedPerWeekPerActivity();

  return useMemo(() => {
    return (
      number_of_days_worked_per_week -
      number_of_days_worked_per_week_activity.reduce(
        (acc, { daysWorkedPerWeek }) =>
          daysWorkedPerWeek ? acc + daysWorkedPerWeek : acc,
        0,
      )
    );
  }, [number_of_days_worked_per_week_activity, number_of_days_worked_per_week]);
};

const useWeightedEnjoymentRates = (): number[] => {
  const {
    values: { activities },
  } = useFormikContext<FormValues>();
  const number_of_days_worked_per_week_activity =
    useNumberOfDaysWorkedPerWeekPerActivity();

  const computation = () => {
    const result = Array<number>(MAX_RATE).fill(0);
    activities.forEach((activity, i) => {
      const { daysWorkedPerWeek } = number_of_days_worked_per_week_activity[i];
      if (
        !activity.enabled ||
        activity.values == undefined ||
        activity.values.enjoyment_rate == undefined ||
        daysWorkedPerWeek == null
      ) {
        return;
      }

      const current_weight_for_this_enjoyment_rate =
        result[activity.values.enjoyment_rate - 1];

      return (result[activity.values.enjoyment_rate - 1] =
        current_weight_for_this_enjoyment_rate + daysWorkedPerWeek);
    });
    return result;
  };

  return useMemo(computation, [
    activities,
    number_of_days_worked_per_week_activity,
  ]);
};

const useWeigthedAverageEnjoymentRate = (): number => {
  const weights = useWeightedEnjoymentRates();
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      const enjoyment_rate = i + 1;
      acc[0] = acc[0] + enjoyment_rate * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0],
  );
  return sum == 0 ? sum : sum / weightSum;
};

export {
  useAnnualTurnoverPerActivity,
  useTotalAnnualTurnover,
  useTotalNumberOfDaysAvailablePerWeek,
  useWeigthedAverageEnjoymentRate,
  useNumberOfDaysWorkedPerWeekPerActivity,
  useWeightedEnjoymentRates,
};
