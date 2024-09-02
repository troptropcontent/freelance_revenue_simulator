import { List } from "src/components/ui/List";
import { useWorkedWeekAnalysis, useRevenueAnalysis } from "./hooks";
import { Text } from "src/components/ui/Text";

const ResultsDetails = () => {
  const { annualTurnover } = useRevenueAnalysis();
  const { daysWorkedPerWeek, daysAvailablePerWeek } = useWorkedWeekAnalysis();
  const data = [
    {
      label: "CA annuel total",
      value: annualTurnover.toLocaleString("fr-FR", {
        style: "currency",
        currency: "EUR",
      }),
    },
    {
      label: "CA mensuel",
      value: (annualTurnover / 12).toLocaleString("fr-FR", {
        style: "currency",
        currency: "EUR",
      }),
    },
    {
      label: "Temps consacré à mes activités par semaine",
      value:
        daysWorkedPerWeek.toLocaleString("fr-FR", {
          maximumFractionDigits: 1,
        }) + " jours",
    },
    {
      label: "Temps disponible par semaine",
      value:
        daysAvailablePerWeek.toLocaleString("fr-FR", {
          maximumFractionDigits: 1,
        }) + " jours",
    },
  ];

  return (
    <List.Root grow gap="sm">
      {data.map((item) => (
        <List.Item
          flex
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text>{item.label} :</Text>
          <Text size="md">
            <data>{item.value}</data>
          </Text>
        </List.Item>
      ))}
    </List.Root>
  );
};

export default ResultsDetails;
