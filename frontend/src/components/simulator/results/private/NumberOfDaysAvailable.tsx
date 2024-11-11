import { Text } from "src/components/ui/Text";
import { findNumberOfDaysAvailableTextType } from "./utils";
import { useTranslation } from "react-i18next";
import { Box } from "src/components/ui/Box";
import { useFormikContext } from "formik";
import { FormValues } from "src/App";
import { useTotalNumberOfDaysEffectivelyWorkedPerWeek } from "./hooks";

const NumberOfDaysAvailable = ({
  number_of_days_available,
  is_small_screen,
}: {
  number_of_days_available: number;
  is_small_screen?: boolean;
}) => {
  const { t } = useTranslation();
  const total_number_of_days_worked =
    useTotalNumberOfDaysEffectivelyWorkedPerWeek();
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
        style="biggest"
        size={is_small_screen ? "32px" : undefined}
        align="center"
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
      <Text
        color="primary.light"
        style="base"
        size={is_small_screen ? "12px" : undefined}
        align="center"
      >
        {t(
          [
            `simulator.results.details.total_number_of_days_available_per_week.${text_type}.sub_text`,
            `simulator.results.details.total_number_of_days_available_per_week.default_sub_text`,
          ],
          { count: Math.round(total_number_of_days_worked) },
        )}
      </Text>
    </Box>
  );
};

export { NumberOfDaysAvailable };
