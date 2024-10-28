import { Text } from "src/components/ui/Text";
import { findNumberOfDaysAvailableTextType } from "./utils";
import { useTranslation } from "react-i18next";
import { Box } from "src/components/ui/Box";
import { useFormikContext } from "formik";
import { FormValues } from "src/App";

const NumberOfDaysAvailable = ({
  number_of_days_available,
}: {
  number_of_days_available: number;
}) => {
  const { t } = useTranslation();
  const {
    values: {
      config: { number_of_hours_worked_per_day },
    },
  } = useFormikContext<FormValues>();

  const text_type = findNumberOfDaysAvailableTextType(
    number_of_days_available,
    number_of_hours_worked_per_day,
  );

  return (
    <Box
      flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text
        size="xl"
        align="center"
        style="heading"
        weight="bold"
        color={
          text_type == "more_days_worked_than_days_available"
            ? "error.medium"
            : undefined
        }
      >
        {t(
          `simulator.results.details.total_number_of_days_available_per_week.${text_type}.text`,
          {
            count:
              text_type == "hours"
                ? Math.round(number_of_days_available * 7)
                : Math.round(number_of_days_available * 2) / 2,
          },
        )}
      </Text>
      <Text color="muted.medium" size="xs" align="center">
        {t([
          `simulator.results.details.total_number_of_days_available_per_week.${text_type}.sub_text`,
          `simulator.results.details.total_number_of_days_available_per_week.default_sub_text`,
        ])}
      </Text>
    </Box>
  );
};

export { NumberOfDaysAvailable };
