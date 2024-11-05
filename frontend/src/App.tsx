import styled from "styled-components";
import { Box } from "src/components/ui/Box";
import { Theme } from "src/components/Theme";
import { Formik } from "formik";
import { ActivitiesList } from "src/components/simulator/activities/ActivitiesList";
import { Activities, ActivitiesType } from "./components/simulator/constants";
import { useTranslation } from "react-i18next";
import { ResultsDetails } from "./components/simulator/results/ResultsDetails";
import { useFormInitialValues } from "./shared/hooks";
import { Text } from "./components/ui/Text";

const StyledForm = styled.form`
  margin-inline: auto;
  padding-inline: var(--spacing-medium);
  padding-block: var(--spacing-large);
  position: relative;

  & > div {
    color: var(--midnight-blue);
    align-items: flex-start;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
  }

  & > div > div:last-child {
    width: 50%;
    height: auto;
    position: sticky;
    top: 130px;
  }
  & > div > div:first-child {
    flex-direction: column;
    align-items: center;
    width: 50%;
    display: flex;
  }
`;

export type ActivityTypes = keyof typeof Activities;

export type FormValues = {
  activities: {
    [ActivityType in ActivityTypes]: {
      enabled: boolean;
      name?: string;
    } & {
      type: `${ActivityType}`;
      values?: ActivitiesType[ActivityType]["initial_values"];
    };
  }[keyof typeof Activities][];
  config: {
    number_of_days_off_per_year: number;
    number_of_days_worked_per_week: number;
    number_of_hours_worked_per_day: number;
  };
};

function App() {
  const { t } = useTranslation();
  const initial_values = useFormInitialValues();

  return (
    <Theme>
      <Formik
        initialValues={initial_values}
        onSubmit={() => {}}
        enableReinitialize
      >
        <StyledForm>
          <Box>
            <Box>
              <Box
                padding={{
                  inline: 20,
                  block: 20,
                  bottom: 35,
                }}
              >
                <Text align="center" style="title_1">
                  {t("simulator.activities.title")}
                </Text>
              </Box>
              <Box flex flexDirection="column" gap="md" id="activities">
                <ActivitiesList />
              </Box>
            </Box>
            <Box>
              <Box
                padding={{
                  inline: 20,
                  block: 20,
                  bottom: 35,
                }}
              >
                <Text align="center" style="title_1">
                  {t("simulator.results.title")}
                </Text>
              </Box>
              <Box
                flex
                flexDirection="column"
                gap="md"
                id="results"
                background="neutral.medium"
                borderRadius={{ bottomRight: "md", topRight: "md" }}
                padding={80}
              >
                <ResultsDetails />
                {/* <Separator color="grey.light" margin={{ block: "lg" }} />
                <ResultsCharts /> */}
              </Box>
            </Box>
          </Box>
        </StyledForm>
      </Formik>
    </Theme>
  );
}

export { App };
