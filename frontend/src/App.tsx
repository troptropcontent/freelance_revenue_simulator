import styled from "styled-components";
import { Heading } from "src/components/ui/Heading";
import { Text } from "src/components/ui/Text";
import { Box } from "src/components/ui/Box";
import Theme from "src/components/Theme";
import { Formik } from "formik";
import { ActivitiesAccordion } from "src/components/simulator/activities/ActivitiesAccordion";
import { Dialog } from "src/components/ui/Dialog";
import { Button } from "./components/ui/Button";

const StyledForm = styled.form`
  padding-inline: var(--spacing-medium);
  padding-block: var(--spacing-large);
  display: grid;
  gap: var(--spacing-large);
  grid-template-columns: 1fr 1fr;
`;

export type FormValues = {
  freelance_daily_rate?: {
    rate: number;
    quantity: number;
    enjoyment_rate: number;
  };
  freelance_on_delivery?: {
    rate: number;
    quantity: number;
    average_time_spent: number;
    enjoyment_rate: number;
  };
  consulting?: {
    rate: number;
    quantity: number;
    enjoyment_rate: number;
  };
  sponsorship?: {
    rate: number;
    quantity: number;
    average_time_spent: number;
    enjoyment_rate: number;
  };
  side_project?: {
    revenue: number;
    average_time_spent: number;
    enjoyment_rate: number;
  };
  training?: {
    rate: number;
    quantity: number;
    average_time_spent: number;
    enjoyment_rate: number;
  };
  digital_product?: {
    revenue: number;
    quantity: number;
    average_time_spent: number;
    enjoyment_rate: number;
  };
  admin?: {
    average_time_spent: number;
  };
};

const initialValues: FormValues = {
  freelance_daily_rate: { rate: 250, quantity: 1, enjoyment_rate: 5 },
  freelance_on_delivery: undefined,
  consulting: undefined,
  sponsorship: undefined,
  side_project: undefined,
  training: undefined,
  digital_product: undefined,
  admin: undefined,
};

function App() {
  return (
    <Theme>
      <Formik initialValues={initialValues} onSubmit={() => {}}>
        <StyledForm>
          <Heading as="h2" align="center" id="activities_title">
            Mes activités
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
            justifyContent="center"
            alignItems="center"
            gap="sm"
          >
            <ActivitiesAccordion />
            <Dialog
              title="Ajouter une activité"
              description="Ajouter une activité à la liste de vos activités pour determiner avec précision vos résultats annuels."
              trigger={<Button>Ajouter une activité</Button>}
            >
              {({ setOpen }) => (
                <Button onClick={() => setOpen(false)}>
                  Ajouter une activité
                </Button>
              )}
            </Dialog>
          </Box>
          <Box
            background="grey.light"
            borderRadius="md"
            flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Text>Résultats</Text>
          </Box>
        </StyledForm>
      </Formik>
    </Theme>
  );
}

export default App;
