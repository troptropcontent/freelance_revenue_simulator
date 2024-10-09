import styled from "styled-components";
import { Heading } from "src/components/ui/Heading";
import { Box } from "src/components/ui/Box";
import Theme from "src/components/Theme";
import { Formik } from "formik";
import { ActivitiesList } from "src/components/simulator/activities/ActivitiesList";
import {
  Activities,
  AverageWorkingConditions,
} from "./components/simulator/constants";
import { useTranslation } from "react-i18next";

const StyledForm = styled.form`
  padding-inline: var(--spacing-medium);
  padding-block: var(--spacing-large);
  display: grid;
  gap: var(--spacing-large);
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
      type: `${ActivityType}`;
    } & {
      values?: (typeof Activities)[ActivityType]["initial_values"];
    };
  }[keyof typeof Activities][];
  config: {
    weeks_off: number;
    time_spent_on_admin_tasks: number;
    side_projects?: {
      average_time_spent: number;
      enjoyment_rate: number;
    };
  };
};

const initialValues: FormValues = {
  activities: [
    {
      type: "freelance_daily_rate",
      values: Activities.freelance_daily_rate.initial_values,
    },
    {
      type: "freelance_on_delivery",
      values: Activities.freelance_on_delivery.initial_values,
    },
    {
      type: "consulting",
      values: Activities.consulting.initial_values,
    },
    {
      type: "sponsorship",
      values: Activities.sponsorship.initial_values,
    },
    {
      type: "entrepreneurship",
      values: Activities.entrepreneurship.initial_values,
    },
    {
      type: "side_project",
      values: Activities.side_project.initial_values,
    },
    {
      type: "admin",
      values: Activities.admin.initial_values,
    },
  ],
  config: {
    weeks_off: AverageWorkingConditions.weeksOffPerYear,
    time_spent_on_admin_tasks:
      AverageWorkingConditions.timeSpentOnAdminTasksPerWeek,
  },
};

function App() {
  const { t } = useTranslation();
  return (
    <Theme>
      <Formik
        initialValues={initialValues}
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
        </StyledForm>
      </Formik>
    </Theme>
  );
}

export default App;
