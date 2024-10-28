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
import { useTranslation } from "react-i18next";
import { ColorValueHex } from "src/components/tokens";
import {
  AverageWeekChartBaseColors,
  RevenueByActivityChartBaseColors,
  RevenueByKindChartBaseColors,
} from "./constants";
import { useMemo } from "react";
import {
  RATED_COLOR,
  UNRATED_COLOR,
} from "src/components/ui/formik/primitives/constants";

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
  const number_of_days_worked_per_week_per_activity =
    useNumberOfDaysWorkedPerWeekPerActivity();

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

    for (
      let index = 0;
      index < number_of_days_worked_per_week_per_activity.length;
      index++
    ) {
      const activity = number_of_days_worked_per_week_per_activity[index];
      if (
        activity.daysWorkedPerWeek == null ||
        activity.daysWorkedPerWeek == 0
      ) {
        continue;
      }

      result.total = result.total + activity.daysWorkedPerWeek;

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
              AverageWeekChartBaseColors[Activities[activity.type]["kind"]],
            label: t(
              `simulator.activities.kinds.${Activities[activity.type]["kind"]}.title`,
            ),
            value: activity.daysWorkedPerWeek,
          },
        ];
      } else {
        const data_already_recorded =
          result.details[data_already_recorded_index];
        const updated_data = {
          ...data_already_recorded,
          value: data_already_recorded.value + activity.daysWorkedPerWeek,
        };
        updated_details = result.details;
        updated_details[data_already_recorded_index] = updated_data;
      }

      result.details = updated_details;
    }

    return result;
  };

  return useMemo(buildData, [t, number_of_days_worked_per_week_per_activity]);
};

const useEnjoymentChartData = () => {
  const enjoyment_rates = useWeightedEnjoymentRates();

  const buildData = () => {
    const initial_value: {
      label: string;
      color: string;
      value: number;
    }[] = [];
    return enjoyment_rates.reduce((prev, current, i) => {
      if (current == 0) {
        return prev;
      } else {
        const threshold_percentage =
          (1 - (i + 1) / enjoyment_rates.length) * 100;
        return [
          ...prev,
          {
            label: `${i + 1}/${enjoyment_rates.length}`,
            color: `linear-gradient( ${UNRATED_COLOR} ${threshold_percentage}%, ${RATED_COLOR} ${threshold_percentage}%);`,
            value: current,
          },
        ];
      }
    }, initial_value);
  };

  return useMemo(buildData, [enjoyment_rates]);
};

export {
  useRevenueByActivityChartData,
  useRevenueByKindChartData,
  useAverageWeekChartData,
  useEnjoymentChartData,
};
