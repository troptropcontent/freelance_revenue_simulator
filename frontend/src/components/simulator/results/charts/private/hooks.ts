import {
  useAnnualTurnoverPerActivity,
  useNumberOfDaysWorkedPerWeekPerActivity,
  useWeightedEnjoymentRates,
} from "../../private/hooks";
import {
  Activities,
  ActivityKindEmoji,
  ActivityKinds,
} from "src/components/simulator/constants";
import { brightenColor } from "./utils";
import { useTranslation, Trans } from "react-i18next";
import { ColorValueHex } from "src/components/tokens";
import {
  AverageWeekChartBaseColors,
  RevenueByActivityChartBaseColors,
  RevenueByKindChartBaseColors,
} from "./constants";
import { ReactNode, useMemo } from "react";
import {
  RATED_COLOR,
  UNRATED_COLOR,
} from "src/components/ui/formik/primitives/constants";
import { useFormikContext } from "formik";
import { FormValues } from "src/App";
import { WeekChartData } from "src/components/ui/WeekChart";

const REMAINING_COLOR = "#ECEBEB" as const;

const useRevenueByActivityChartData = () => {
  const annual_turnover_per_activities = useAnnualTurnoverPerActivity();
  const { t } = useTranslation();

  return useMemo(() => {
    const result: {
      total: number;
      details: {
        label: string;
        kind: (typeof ActivityKinds)[number];
        value: number;
        color: ColorValueHex;
      }[];
    } = {
      total: 0,
      details: [],
    };

    for (
      let index = 0;
      index < annual_turnover_per_activities.length;
      index++
    ) {
      const { annualTurnover, type, name } =
        annual_turnover_per_activities[index];

      if (annualTurnover == 0 || annualTurnover == null) {
        continue;
      }

      const kind = Activities[type]["kind"];

      const last_activity_of_this_kind = result.details
        .reverse()
        .find((element) => element.kind == kind);

      const label = name ? name : t(`simulator.activities.${type}.label`);

      const new_element = last_activity_of_this_kind
        ? {
            color: brightenColor(last_activity_of_this_kind.color),
            kind,
            label,
            value: annualTurnover,
          }
        : {
            color: RevenueByActivityChartBaseColors[kind],
            kind,
            label,
            value: annualTurnover,
          };

      result.total = result.total + annualTurnover;
      result.details = [...result.details, new_element];
    }

    return result;
  }, [annual_turnover_per_activities, t]);
};

const useRevenueByKindChartData = () => {
  const { t } = useTranslation();
  const annual_turnover_per_activity = useAnnualTurnoverPerActivity();

  const buildData = () => {
    const result: {
      total: number;
      details: {
        type: (typeof ActivityKinds)[number];
        value: number;
        color: ColorValueHex;
        label: string;
      }[];
    } = {
      total: 0,
      details: [],
    };

    for (let index = 0; index < annual_turnover_per_activity.length; index++) {
      const activity = annual_turnover_per_activity[index];
      if (activity.annualTurnover == null || activity.annualTurnover == 0) {
        continue;
      }

      result.total = result.total + activity.annualTurnover;

      const data_already_recorded_index = result.details.findIndex(
        (row) => row.type == Activities[activity.type]["kind"],
      );

      let updated_details: typeof result.details;

      if (data_already_recorded_index == -1) {
        updated_details = [
          ...result.details,
          {
            type: Activities[activity.type]["kind"],
            color:
              RevenueByKindChartBaseColors[Activities[activity.type]["kind"]],
            label:
              ActivityKindEmoji[Activities[activity.type]["kind"]] +
              t(
                `simulator.activities.kinds.${Activities[activity.type]["kind"]}.title`,
              ),
            value: activity.annualTurnover,
          },
        ];
      } else {
        const data_already_recorded =
          result.details[data_already_recorded_index];
        const updated_data = {
          ...data_already_recorded,
          value: data_already_recorded.value + activity.annualTurnover,
        };
        updated_details = result.details;
        updated_details[data_already_recorded_index] = updated_data;
      }

      result.details = updated_details;
    }

    return result;
  };

  return useMemo(buildData, [t, annual_turnover_per_activity]);
};

const useAverageWeekChartData = () => {
  const { t } = useTranslation();
  const {
    values: {
      config: { number_of_days_worked_per_week },
    },
  } = useFormikContext<FormValues>();
  const activities = useNumberOfDaysWorkedPerWeekPerActivity();

  const buildBaseData = () => {
    const result = {
      total: 0,
      base_data: [] as {type: typeof ActivityKinds[number] | "remaining", color: string, value: number}[],
    };

    // Track activity kinds we've already processed
    const processedKinds = new Map<string, number>();

    // Process each activity
    for (const activity of activities) {
      if (!activity.daysWorkedPerWeek) continue;

      const activityKind = Activities[activity.type]["kind"];
      result.total += activity.daysWorkedPerWeek;

      // Either update existing kind or add new one
      if (processedKinds.has(activityKind)) {
        const index = processedKinds.get(activityKind)!;
        result.base_data[index].value += activity.daysWorkedPerWeek;
      } else {
        processedKinds.set(activityKind, result.base_data.length);
        result.base_data.push({
          type: activityKind,
          color: AverageWeekChartBaseColors[activityKind],
          value: activity.daysWorkedPerWeek,
        });
      }
    }
    
    const remainingDays = number_of_days_worked_per_week - result.total;
    if (remainingDays > 0) {
      result.base_data.push({
        type: "remaining",
        color: REMAINING_COLOR,
        value: Math.round(remainingDays)
      });
    }

    // Add remaining available days if any

    return result;
  };

  return useMemo(buildBaseData, [t, activities, number_of_days_worked_per_week]);
};

const useEnjoymentChartData = () => {
  const enjoyment_rates = useWeightedEnjoymentRates();
  const {
    values: {
      config: { number_of_days_worked_per_week },
    },
  } = useFormikContext<FormValues>();
  
  const buildData = () => {
    const initial_value: {
      rate: string;
      color: string;
      value: number;
    }[] = [];
    
    let remaining_days = number_of_days_worked_per_week

    let base_data = enjoyment_rates.reduce((prev, current, i) => {
      remaining_days -= current

      if (current == 0) {
        return prev;
      } else {
        const threshold_percentage =
          (1 - (i + 1) / enjoyment_rates.length) * 100;
        return [
          ...prev,
          {
            rate: `${i + 1}/${enjoyment_rates.length}`,
            color: `linear-gradient( ${UNRATED_COLOR} ${threshold_percentage}%, ${RATED_COLOR} ${threshold_percentage}%);`,
            value: current,
          },
        ];
      }
    }, initial_value);

    if (Math.round(remaining_days) > 0) {
      base_data = [
        ...base_data,
        {
          rate: "remaining",
          color: REMAINING_COLOR,
          value: remaining_days
        }
      ]
    }

    return base_data
  };

  return useMemo(buildData, [enjoyment_rates]);
};

export {
  useRevenueByActivityChartData,
  useRevenueByKindChartData,
  useAverageWeekChartData,
  useEnjoymentChartData,
};
