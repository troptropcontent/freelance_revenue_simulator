import { useTranslation } from "react-i18next";
import { useAnnualTurnoverPerActivity } from "../private/hooks";
import { Activities, ActivityKindColors, ActivityKinds } from "../../constants";
import { Box } from "src/components/ui/Box";
import { PieChart } from "src/components/ui/PieChart";

const RevenueByKindsChart = () => {
  const { t } = useTranslation();
  const annual_turnover_per_activity = useAnnualTurnoverPerActivity();
  const initial_value: {
    total: number;
    details: Record<(typeof ActivityKinds)[number], number>;
  } = {
    total: 0,
    details: {
      entrepreneurial_project: 0,
      freelancing: 0,
      unbilled_activity: 0,
    },
  };
  const data = annual_turnover_per_activity.reduce(
    (acc, { type, annualTurnover }) => {
      const kind = Activities[type].kind;
      const turnover = annualTurnover ? annualTurnover : 0;
      acc.details[kind] = acc.details[kind] + turnover;
      acc.total = acc.total + turnover;
      return acc;
    },
    initial_value,
  );

  const pieData = Object.entries(data.details).map(([k, v]) => {
    return {
      color: ActivityKindColors[k as (typeof ActivityKinds)[number]],
      label: t(`simulator.activities.kinds.${k}.title`),
      value: v,
    };
  });

  console.log({ total: data.total });

  return data.total != 0 ? (
    <Box background="white" padding="md" borderRadius="md">
      <PieChart data={pieData} />
    </Box>
  ) : null;
};

export { RevenueByKindsChart };
