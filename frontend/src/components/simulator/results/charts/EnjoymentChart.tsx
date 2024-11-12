import { useFormikContext } from "formik";
import { FormValues } from "src/App";
import { Box } from "src/components/ui/Box";
import { WeekChart } from "src/components/ui/WeekChart";
import { useEnjoymentChartData } from "./private/hooks";
import { Text } from "src/components/ui/Text";
import { useTranslation } from "react-i18next";

const EnjoymentChart = () => {
  const {
    values: {
      config: { number_of_days_worked_per_week },
    },
  } = useFormikContext<FormValues>();
  const { t } = useTranslation();
  const chart_data = useEnjoymentChartData();

  return (
    <Box background="white" padding="md" borderRadius="md">
      <WeekChart
        number_of_days={number_of_days_worked_per_week}
        data={chart_data}
        labelFormater={({ value, label }) => (
          <Box flex gap="sm">
            <Text weight="bold">{t("common.days", { count: value })}</Text>
            <Text>
              {t("simulator.results.charts.enjoyment_ventilation.label", {
                label,
              })}
            </Text>
          </Box>
        )}
        remainingLabelFormater={() => null}
      />
    </Box>
  );
};

export { EnjoymentChart };
