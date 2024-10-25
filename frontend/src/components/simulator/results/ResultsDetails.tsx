import { List } from "src/components/ui/List";
import {
  useTotalAnnualTurnover,
  useTotalNumberOfDaysAvailablePerWeek,
  useWeigthedAverageEnjoymentRate,
} from "./private/hooks";
import { Text } from "src/components/ui/Text";
import { useTranslation } from "react-i18next";
import { ReactNode } from "react";
import { NumberOfDaysAvailable } from "./private/NumberOfDaysAvailable";
import { RatingInput } from "src/components/ui/formik/primitives/RatingInput";
import { Formik } from "formik";
import { MAX_RATE } from "../constants";
import { Box } from "src/components/ui/Box";

const ResultsDetails = () => {
  const { t } = useTranslation();
  const total_annual_turnover = useTotalAnnualTurnover();
  const total_number_of_days_available_per_week =
    useTotalNumberOfDaysAvailablePerWeek();
  const average_enjoyment_rate = useWeigthedAverageEnjoymentRate();

  const results: Record<
    | "total_annual_turnover"
    | "total_number_of_days_available_per_week"
    | "average_enjoyment_rate",
    {
      value: number;
      formater: (value: number) => ReactNode;
    }
  > = {
    total_annual_turnover: {
      value: total_annual_turnover,
      formater: (value) => (
        <Text size="xl" align="center" style="heading" weight="bold">
          {t("common.currency.EUR", { value })}
        </Text>
      ),
    },
    total_number_of_days_available_per_week: {
      value: total_number_of_days_available_per_week,
      formater: (value) => (
        <NumberOfDaysAvailable number_of_days_available={value} />
      ),
    },
    average_enjoyment_rate: {
      value: average_enjoyment_rate,
      formater: (value) => {
        return (
          <Formik
            onSubmit={() => {}}
            initialValues={{ average_rating: Math.round(value) }}
            enableReinitialize
          >
            <Box flex flexDirection="column" alignItems="center">
              <RatingInput
                size="xl"
                disabled
                name="average_rating"
                max={MAX_RATE}
              />
            </Box>
          </Formik>
        );
      },
    },
  };

  return (
    <List.Root
      grow
      gap="lg"
      background="neutral.medium"
      borderRadius={{ bottomRight: "md", topRight: "md" }}
      padding="lg"
    >
      {Object.entries(results).map(([key, { value, formater }]) => (
        <List.Item flex flexDirection="column" key={key} gap="sm">
          <Text size="md" align="center" style="heading" weight="bold">
            {t(`simulator.results.details.${key}.label`)}
          </Text>
          {formater(value)}
        </List.Item>
      ))}
    </List.Root>
  );
};

export { ResultsDetails };
