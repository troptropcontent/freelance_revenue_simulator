import styled from "styled-components";
import { Heading } from "src/components/ui/Heading";
import { Box } from "src/components/ui/Box";
import Theme from "src/components/Theme";
import { Formik } from "formik";
import { ActivitiesList } from "src/components/simulator/activities/ActivitiesList";
import {
  Activities,
  ActivitiesType,
  DEFAULT_NUMBER_DAYS_WORKED_PER_WEEKS,
  DEFAULT_NUMBER_OF_HOURS_SPENT_ON_ADMIN_TASKS_PER_WEEK,
  DEFAULT_NUMBER_OF_HOURS_WORKED_PER_DAY,
  DEFAULT_NUMBER_OF_WEEKS_OF_PER_YEAR,
} from "./components/simulator/constants";
import { useTranslation } from "react-i18next";
import { ResultsDetails } from "./components/simulator/results/ResultsDetails";
import { cssVariable } from "./components/helper";

const StyledForm = styled.form`
  padding-inline: var(--spacing-medium);
  padding-block: var(--spacing-large);
  display: grid;
  row-gap: ${cssVariable("spacing.md")};
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
    weeks_off: number;
    number_of_days_worked_per_week: number;
    number_of_hours_worked_per_day: number;
  };
};

const InitialValues: FormValues = {
  activities: [
    {
      type: "freelance_daily_rate",
      values: Activities.freelance_daily_rate.initial_values,
      enabled: false,
    },
    {
      type: "freelance_on_delivery",
      values: Activities.freelance_on_delivery.initial_values,
      enabled: false,
    },
    {
      type: "consulting",
      values: Activities.consulting.initial_values,
      enabled: false,
    },
    {
      type: "sponsorship",
      values: Activities.sponsorship.initial_values,
      enabled: false,
    },
    {
      type: "entrepreneurship",
      values: Activities.entrepreneurship.initial_values,
      enabled: false,
    },
    {
      type: "side_project",
      values: Activities.side_project.initial_values,
      enabled: false,
    },
    {
      type: "admin",
      values: Activities.admin.initial_values,
      enabled: false,
    },
  ],
  config: {
    weeks_off: DEFAULT_NUMBER_OF_WEEKS_OF_PER_YEAR,
    number_of_days_worked_per_week: DEFAULT_NUMBER_DAYS_WORKED_PER_WEEKS,
    number_of_hours_worked_per_day: DEFAULT_NUMBER_OF_HOURS_WORKED_PER_DAY,
  },
};

function App() {
  const { t } = useTranslation();
  return (
    <Theme>
      <Formik
        initialValues={InitialValues}
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
          <Box flex flexDirection="column" gap="md" id="results">
            <ResultsDetails />
          </Box>
        </StyledForm>
      </Formik>
    </Theme>
  );
}

export { App, InitialValues };
