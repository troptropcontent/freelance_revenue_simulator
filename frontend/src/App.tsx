import styled from "styled-components";
import { Heading } from "src/components/ui/Heading";
import { Box } from "src/components/ui/Box";
import Theme from "src/components/Theme";
import { Formik } from "formik";
import { ActivitiesAccordion } from "src/components/simulator/activities/ActivitiesAccordion";
import { ActivitiesModal } from "src/components/simulator/activities/ActivitiesModal";
import {
  Activities,
  AverageWorkingConditions,
} from "./components/simulator/constants";
import ResultsDetails from "./components/simulator/results/ResultsDetails";
import { ResultsCharts } from "./components/simulator/results/ResultsCharts";

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
    grid-template-areas:
      "activities_title results_title"
      "activities results"
  }
`;

export type FormValues = {
  [key in keyof typeof Activities]?: (typeof Activities)[key]["defaultValue"];
} & {
  weeks_off: number;
};

const initialValues: FormValues = {
  freelance_daily_rate: Activities.freelance_daily_rate.displayInInitialValues
    ? Activities.freelance_daily_rate.defaultValue
    : undefined,
  freelance_on_delivery: Activities.freelance_on_delivery.displayInInitialValues
    ? Activities.freelance_on_delivery.defaultValue
    : undefined,
  consulting: Activities.consulting.displayInInitialValues
    ? Activities.consulting.defaultValue
    : undefined,
  sponsorship: Activities.sponsorship.displayInInitialValues
    ? Activities.sponsorship.defaultValue
    : undefined,
  side_project: Activities.side_project.displayInInitialValues
    ? Activities.side_project.defaultValue
    : undefined,
  training: Activities.training.displayInInitialValues
    ? Activities.training.defaultValue
    : undefined,
  digital_product: Activities.digital_product.displayInInitialValues
    ? Activities.digital_product.defaultValue
    : undefined,
  admin: Activities.admin.displayInInitialValues
    ? Activities.admin.defaultValue
    : undefined,
  weeks_off: AverageWorkingConditions.weeksOffPerYear,
};

function App() {
  return (
    <Theme>
      <Formik
        initialValues={initialValues}
        onSubmit={() => {}}
        enableReinitialize
      >
        <StyledForm>
          <Heading as="h2" align="center" id="activities_title">
            Mon portfolio d'activités
          </Heading>
          <Heading as="h2" align="center" id="results_title">
            Résultats
          </Heading>
          <Box
            background="grey.light"
            padding="lg"
            borderRadius="md"
            flex
            flexDirection="column"
            gap="md"
            id="activities"
          >
            <ActivitiesAccordion />
            <Box flex flexDirection="column-reverse" grow>
              <ActivitiesModal />
            </Box>
          </Box>
          <Box
            background="grey.light"
            borderRadius="md"
            padding="lg"
            flex
            flexDirection="column"
            gap="lg"
            id="results"
          >
            <ResultsCharts />
            <ResultsDetails />
          </Box>
        </StyledForm>
      </Formik>
    </Theme>
  );
}

export default App;
