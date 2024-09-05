import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { FormValues } from "src/App";
import {
  useRevenueAnalysis,
  useWorkedWeekAnalysis,
} from "src/components/simulator/results/private/hooks";

const useRevenueChartData = (): {
  id: string;
  value: number;
  name: string;
}[] => {
  const { t } = useTranslation();
  const { annualTurnoverPerActivities } = useRevenueAnalysis();
  const { values: { activities } } = useFormikContext<FormValues>();
  const data: {
    id: string;
    value: number;
    name: string;
  }[] = [];

  return Object.entries(annualTurnoverPerActivities).reduce(
    (previousValue, [id, value]) => {
      return activities[id as keyof typeof activities] === undefined
        ? previousValue
        : [
            ...previousValue,
            {
              id,
              value,
              name:
                t(`simulator.activities.${id}.label`) +
                ` (${t("common.currency.EUR", { value })})`,
            },
          ];
    },
    data,
  );
};

const useTimeChartData = (): {
  id: string;
  value: number;
  name: string;
}[] => {
  const { t } = useTranslation();
  const { daysUsedPerWeek, daysAvailablePerWeek } = useWorkedWeekAnalysis();
  const { values: { activities } } = useFormikContext<FormValues>();

  let baseData: {
    id: string;
    value: number;
    name: string;
  }[] = [
    {
      id: "admin",
      value: daysUsedPerWeek.admin,
      name:
        t(
          `simulator.activities.general_info.inputs.time_spent_on_admin_tasks.label`,
        ) +
        ` (${t("common.value_with_unit.number_of_days", {
          count: daysUsedPerWeek.admin,
        })})`,
    },
  ];

  baseData = Object.entries(daysUsedPerWeek.activities).reduce(
    (previousValue, [id, value]) => {
      const key = id as keyof typeof daysUsedPerWeek.activities;
      return activities[key] === undefined
        ? previousValue
        : [
            ...previousValue,
            {
              id,
              value,
              name:
                t(`simulator.activities.${id}.label`) +
                ` (${t("common.value_with_unit.number_of_days", {
                  count: value,
                })})`,
            },
          ];
    },
    baseData,
  );

  return daysAvailablePerWeek > 0
    ? [
        ...baseData,
        {
          id: "available",
          value: daysAvailablePerWeek,
          name:
            t(`simulator.activities.available_time.label`) +
            ` (${t("common.value_with_unit.number_of_days", {
              count: daysAvailablePerWeek,
            })})`,
        },
      ]
    : baseData;
};

export { useRevenueChartData, useTimeChartData };
