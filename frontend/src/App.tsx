import styled from 'styled-components';
import './App.css'
import { Heading } from './components/ui/Heading'
import { List } from './components/ui/List';
import { Text } from './components/ui/Text';
import { Box } from './components/ui/Box';

const MainLayout = styled.div`
  display: grid;
  gap: var(--spacing-medium);
  padding-inline: var(--spacing-medium);
  grid-template-areas:
    "activities_title results_title"
    "activities_section results_section";

  #activities_section {
    grid-area: activities_section;
  }

  #results_section {
    grid-area: results_section;
  }

  #results_title {
    grid-area: results_title;
  }

  #activities_title {
    grid-area: activities_title;
  }

  #activities_list {
    max-height: calc(100vh - var(--main-nav-height)*4  );
    overflow-y: auto;
  }
`;

function App() {

  return (
    <MainLayout>
      <Heading as="h2" align="center" id="activities_title">Mes activités</Heading>
      <List.Root gap="large" id="activities_list" background='background' borderRadius={"medium"} padding={'medium'}>
        {[1, 2, 3, 4, 5].map((item) => (
          <List.Item key={item} padding={'large'} background='white'>
            <Text>
              Activité {item}
            </Text>
          </List.Item>
        ))}
      </List.Root>
      <Heading as="h2" align="center" id="results_title">Résultats</Heading>
      <Box background='background' borderRadius={"medium"} flex flexDirection="column" justifyContent="center" alignItems="center">
        <Text>
          Résultats
        </Text>
      </Box>
    </MainLayout>
  )
}

export default App
