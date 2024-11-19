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
        <Text style="results" align="center">
          {t("common.currency.EUR_NO_DIGITS", { value })}
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
            initialValues={{ average_enjoyment_rate: Math.round(value) }}
            enableReinitialize
          >
            <Box
              flex
              flexDirection="column"
              alignItems="center"
              padding={{ block: "sm" }}
              gap={15}
            >
              <RatingInput
                size="lg"
                disabled
                name="average_enjoyment_rate"
                max={MAX_RATE}
              />
              <Text color="primary.light" align="center">
                {t([
                  `simulator.results.details.average_enjoyment_rate.sub_text.${Math.round(value)}/5`,
                ])}
              </Text>
            </Box>
          </Formik>
        );
      },
    },
  };

  return (
    <List.Root gap={40}>
      {Object.entries(results).map(([key, { value, formater }]) => (
        <List.Item flex flexDirection="column" key={key}>
          <Text style="subtitle_n1" align="center">
            {t(`simulator.results.details.${key}.label`)}
          </Text>
          {formater(value)}
        </List.Item>
      ))}
    </List.Root>
  );
};

export { ResultsDetails };
