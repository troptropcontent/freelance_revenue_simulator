import styled from "styled-components";
import { Heading } from "src/components/ui/Heading";
import { Box } from "src/components/ui/Box";
import { Theme } from "src/components/Theme";
import { Formik } from "formik";
import { ActivitiesList } from "src/components/simulator/activities/ActivitiesList";
import { Activities, ActivitiesType } from "./components/simulator/constants";
import { useTranslation } from "react-i18next";
import { ResultsDetails } from "./components/simulator/results/ResultsDetails";
import { cssVariable } from "./components/helper";
import { ResultsCharts } from "./components/simulator/results/ResultsCharts";
import { Separator } from "./components/ui/Separator";
import { useFormInitialValues } from "./shared/hooks";

const StyledForm = styled.form`
  margin-inline: auto;
  padding-inline: var(--spacing-medium);
  padding-block: var(--spacing-large);
  display: grid;
  row-gap: ${cssVariable("spacing.md")};
  max-width: 1320px;
  grid-template-areas:
    "activities_title"
    "activities"
    "results_title"
    "results";

  #activities_title {
    grid-area: activities_title;
  }

  #results_title {
    grid-area: results_title;
  }

  #activities {
    grid-area: activities;
  }

  #results {
    grid-area: results;
  }

  @media only screen and (min-width: 600px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-areas:
      "activities_title results_title"
      "activities results";
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
          <Heading as="h2" align="center" id="activities_title">
            {t("simulator.activities.title")}
          </Heading>
          <Heading as="h2" align="center" id="results_title">
            {t("simulator.results.title")}
          </Heading>
          <Box flex flexDirection="column" gap="md" id="activities">
            <ActivitiesList />
          </Box>
          <Box
            flex
            flexDirection="column"
            gap="md"
            id="results"
            background="neutral.medium"
            borderRadius={{ bottomRight: "md", topRight: "md" }}
            padding="lg"
          >
            <ResultsDetails />
            <Separator color="grey.light" />
            <ResultsCharts />
          </Box>
        </StyledForm>
      </Formik>
    </Theme>
  );
}

export { App };
