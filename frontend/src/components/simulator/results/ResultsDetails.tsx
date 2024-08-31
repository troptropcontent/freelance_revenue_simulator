import { List } from "src/components/ui/List";
import { useAnnualTurnover, useAvailableTimePerWeek } from "./hooks";
import { Text } from "src/components/ui/Text";
import { AverageWorkingConditions } from "../constants";

const ResultsDetails = () => {
  const annualTurnover = useAnnualTurnover();
  const availableTimePerWeek = useAvailableTimePerWeek();
  return (
    <List.Root>
      <List.Item flex flexDirection="row" justifyContent="space-between">
        <Text>CA annuel total :</Text>
        <data>{Math.round(annualTurnover)} €</data>
      </List.Item>
      <List.Item flex flexDirection="row" justifyContent="space-between">
        <Text>CA mensuel :</Text>
        <data>{Math.round(annualTurnover / 12)} €</data>
      </List.Item>
      <List.Item flex flexDirection="row" justifyContent="space-between">
        <Text>Temps consacré à mes activités par semaine :</Text>
        <data>
          {Math.round(
            (AverageWorkingConditions.daysWorkedPerWeek -
              availableTimePerWeek) *
              10,
          ) / 10}
          jours
        </data>
      </List.Item>
      <List.Item flex flexDirection="row" justifyContent="space-between">
        <Text>Temps disponible par semaine :</Text>
        <data>{Math.round(availableTimePerWeek * 10) / 10} jours</data>
      </List.Item>
    </List.Root>
  );
};

export default ResultsDetails;
