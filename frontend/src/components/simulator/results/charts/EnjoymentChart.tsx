import { Formik, useFormikContext } from "formik";
import { FormValues } from "src/App";
import { Box } from "src/components/ui/Box";
import { WeekChart } from "src/components/ui/WeekChart";
import { useEnjoymentChartData } from "./private/hooks";
import { Text } from "src/components/ui/Text";
import { useTranslation } from "react-i18next";
import { MAX_RATE } from "../../constants";
import { RatingInput } from "src/components/ui/formik/primitives/RatingInput";

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
          <Box flex alignItems="center" gap="sm">
            <Text weight="bold">{t("common.days", { count: value })}</Text>
            <Text>
              {t("simulator.results.charts.enjoyment_ventilation.label", {
                label,
              })}
            </Text>
            <Formik
              onSubmit={() => {}}
              initialValues={{
                [`average_enjoyment_rate_${Math.round(value)}`]:
                  Math.round(value),
              }}
              enableReinitialize
            >
              <Box
                flex
                flexDirection="column"
                alignItems="center"
                padding={{ block: "sm" }}
              >
                <RatingInput
                  size="sm"
                  disabled
                  name={`average_enjoyment_rate_${Math.round(value)}`}
                  max={MAX_RATE}
                />
              </Box>
            </Formik>
          </Box>
        )}
        remainingLabelFormater={() => null}
      />
    </Box>
  );
};

export { EnjoymentChart };
