import { useTranslation } from "react-i18next";
import { Box } from "src/components/ui/Box";
import { Text } from "src/components/ui/Text";
import {
  useTotalAnnualTurnover,
  useTotalNumberOfDaysAvailablePerWeek,
  useTotalNumberOfDaysEffectivelyWorkedPerWeek,
} from "./private/hooks";

const ChartsTitle = () => {
  const { t } = useTranslation();
  const total_annual_turnover = useTotalAnnualTurnover();
  const total_number_of_days_worked =
    useTotalNumberOfDaysEffectivelyWorkedPerWeek();
  const total_number_of_days_available_per_week =
    useTotalNumberOfDaysAvailablePerWeek();

  return (
    <Box flex flexDirection="column" alignItems="center" gap={11}>
      <Text style="subtitle_n1" align="center">
        {t("simulator.results.charts.title")}
      </Text>
      {total_annual_turnover == 0 && total_number_of_days_worked == 0 && (
        <Text align="center" color="error.medium">
          {t("simulator.results.charts.unstarted_description")}
        </Text>
      )}
      {Math.round(total_number_of_days_available_per_week) < 0 && (
        <Text align="center" color="error.medium">
          {t("simulator.results.charts.exceeded_description", {
            count: Math.round(total_number_of_days_worked),
          })}
        </Text>
      )}
    </Box>
  );
};

export { ChartsTitle };
