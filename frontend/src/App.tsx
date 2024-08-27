import styled from "styled-components";
import { Heading } from "./components/ui/Heading";
import { List } from "./components/ui/List";
import { Text } from "./components/ui/Text";
import { Box } from "./components/ui/Box";
import Theme from "./components/Theme";
import { Formik } from "formik";

const StyledForm = styled.form`
  padding-inline: var(--spacing-medium);
  padding-block: var(--spacing-large);
  display: grid;
  gap: var(--spacing-large);
  grid-template-columns: 1fr 1fr;
`;

type FormValues = {
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
  freelance_daily_rate: { rate: 0, quantity: 0, enjoyment_rate: 0 },
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
          <List.Root
            gap="lg"
            id="activities_list"
            background="grey.light"
            borderRadius="md"
            padding="md"
          >
            <List.Item
              key={1}
              padding="lg"
              background="white"
              borderRadius="sm"
            >
              <Text>Activité A</Text>
            </List.Item>
          </List.Root>
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
