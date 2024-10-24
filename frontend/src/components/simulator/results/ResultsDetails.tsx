import { List } from "src/components/ui/List";
import {
  useTotalAnnualTurnover,
  useTotalNumberOfDaysAvailablePerWeek,
  useWeigthedAverageEnjoymentRate,
} from "./private/hooks";
import { Text } from "src/components/ui/Text";
import { useTranslation } from "react-i18next";

const ResultsDetails = () => {
  const { t } = useTranslation();
  const total_annual_turnover = useTotalAnnualTurnover();
  const total_number_of_days_available_per_week =
    useTotalNumberOfDaysAvailablePerWeek();
  const average_enjoyment_rate = useWeigthedAverageEnjoymentRate();

  const results = {
    total_annual_turnover,
    total_number_of_days_available_per_week,
    average_enjoyment_rate,
  };

  return (
    <List.Root
      grow
      gap="sm"
      background="neutral.medium"
      borderRadius={{ bottomRight: "md", topRight: "md" }}
      padding="lg"
    >
      {Object.entries(results).map(([key, value]) => (
        <List.Item flex flexDirection="column" key={key}>
          <Text size="md" align="center">
            {t(`simulator.results.details.${key}.label`)}
          </Text>
          <Text size="xl" align="center">
            <data>{value}</data>
          </Text>
        </List.Item>
      ))}
    </List.Root>
  );
};

export { ResultsDetails };
