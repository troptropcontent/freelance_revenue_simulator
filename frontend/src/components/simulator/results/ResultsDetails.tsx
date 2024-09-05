import { List } from "src/components/ui/List";
import { useWorkedWeekAnalysis, useRevenueAnalysis } from "./private/hooks";
import { Text } from "src/components/ui/Text";
import { useTranslation } from "react-i18next";

const ResultsDetails = () => {
  const { annualTurnover } = useRevenueAnalysis();
  const { daysWorkedPerWeek, daysAvailablePerWeek } = useWorkedWeekAnalysis();
  const { t } = useTranslation();

  const data = [
    {
      label: t("simulator.results.details.total_annual_earnings.label"),
      value: t("common.currency.EUR", {
        value: annualTurnover,
      }),
    },
    {
      label: t("simulator.results.details.total_monthly_earnings.label"),
      value: t("common.currency.EUR", {
        value: annualTurnover / 12,
      }),
    },
    {
      label: t("simulator.results.details.worked_days_per_weeks.label"),
      value: t("common.value_with_unit.number_of_days", {
        count: daysWorkedPerWeek,
      }),
    },
    {
      label: t("simulator.results.details.available_days_per_week.label"),
      value: t("common.value_with_unit.number_of_days", {
        count: daysAvailablePerWeek < 0 ? 0 : daysAvailablePerWeek,
      }),
    },
  ];

  return (
    <List.Root
      grow
      gap="sm"
      background="grey.light"
      borderRadius="md"
      padding="lg"
    >
      {data.map((item) => (
        <List.Item
          flex
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          key={item.label}
        >
          <Text>{item.label}</Text>
          <Text size="md">
            <data>{item.value}</data>
          </Text>
        </List.Item>
      ))}
    </List.Root>
  );
};

export default ResultsDetails;
