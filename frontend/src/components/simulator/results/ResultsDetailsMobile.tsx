import { List } from "src/components/ui/List";
import {
  useTotalAnnualTurnover,
  useTotalNumberOfDaysAvailablePerWeek,
  useWeigthedAverageEnjoymentRate,
} from "./private/hooks";
import { Text } from "src/components/ui/Text";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { NumberOfDaysAvailable } from "./private/NumberOfDaysAvailable";
import { RatingInput } from "src/components/ui/formik/primitives/RatingInput";
import { Formik } from "formik";
import { MAX_RATE } from "../constants";
import { Box } from "src/components/ui/Box";
import { Collapsible } from "src/components/ui/Collapsible";
import { Button } from "src/components/ui/Button";

const ResultsDetailsMobile = () => {
  const { t } = useTranslation();
  const total_annual_turnover = useTotalAnnualTurnover();
  const total_number_of_days_available_per_week =
    useTotalNumberOfDaysAvailablePerWeek();
  const average_enjoyment_rate = useWeigthedAverageEnjoymentRate();
  const [is_collapsible_open, set_is_collapsible_open] = useState(false);

  return (
    <List.Root gap={20} padding={{ inline: 30, block: 20 }}>
      <List.Item flex flexDirection="column">
        <Text style="subtitle_n1" align="center">
          {t(`simulator.results.details.total_annual_turnover.label`)}
        </Text>
        <Text style="results" align="center">
          {t("common.currency.EUR_NO_DIGITS", { value: total_annual_turnover })}
        </Text>
      </List.Item>
      <Collapsible.Root
        open={is_collapsible_open}
        onOpenChange={(open) => set_is_collapsible_open(open)}
      >
        <Collapsible.Content $display="flex" $flexDirection="column" $gap={22}>
          <List.Item flex flexDirection="column">
            <Text style="subtitle_n1" align="center">
              {t(
                `simulator.results.details.total_number_of_days_available_per_week.label`,
              )}
            </Text>
            <NumberOfDaysAvailable
              is_small_screen
              number_of_days_available={total_number_of_days_available_per_week}
            />
          </List.Item>
          <List.Item flex flexDirection="column" padding={{ bottom: 22 }}>
            <Text style="subtitle_n1" align="center">
              {t(`simulator.results.details.average_enjoyment_rate.label`)}
            </Text>
            <Formik
              onSubmit={() => {}}
              initialValues={{
                average_rating: Math.round(average_enjoyment_rate),
              }}
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
                  name="average_rating"
                  max={MAX_RATE}
                />
                <Text color="primary.light" align="center">
                  {t([
                    `simulator.results.details.average_enjoyment_rate.sub_text.${Math.round(average_enjoyment_rate)}/5`,
                  ])}
                </Text>
              </Box>
            </Formik>
          </List.Item>
        </Collapsible.Content>
        <Collapsible.Trigger asChild>
          <Box>
            <Box flex justifyContent="center">
              <Button
                onClick={() => set_is_collapsible_open(!is_collapsible_open)}
                color="neutral"
              >
                <Text style="call_to_action">
                  {t(
                    `simulator.results.details.${is_collapsible_open ? "collapse" : "expand"}`,
                  )}
                </Text>
                {is_collapsible_open ? (
                  <ExpandLessRoundedIcon />
                ) : (
                  <ExpandMoreRoundedIcon />
                )}
              </Button>
            </Box>
          </Box>
        </Collapsible.Trigger>
      </Collapsible.Root>
    </List.Root>
  );
};

export { ResultsDetailsMobile };
