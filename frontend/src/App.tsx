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
import { ResultsCharts } from "./components/simulator/results/ResultsCharts";
import { ResultsDetailsMobile } from "./components/simulator/results/ResultsDetailsMobile";
import { Button } from "./components/ui/Button";

const StyledForm = styled.form`
  margin-inline: auto;
  position: relative;
  background-color: white;

  & > #titles {
    display: flex;
    align-items: center;

    & > div {
      flex: 1 1 0px;
    }
  }

  & #result_title {
    display: none;
  }

  & > #container {
    position: relative;

    // Here we need to update the style for mobile

    & > #results-large-screens {
      display: none;
    }

    & > #results-small-screens {
      position: fixed;
      bottom: 0%;
      top: auto;
      left: 0%;
      right: 0%;

      z-index: 99999999;
      width: 100%;
      background: white;
    }
  }

  @media only screen and (min-width: 600px) {
    padding-inline: var(--spacing-medium);

    #result_title {
      display: block;
    }

    & > #titles {
      max-width: 1200px;
    }

    & > #container {
      display: flex;
      align-items: flex-start;
      padding-block-end: var(--spacing-large);
      padding-inline: var(--spacing-xs);
      max-width: 1200px;
      margin-left: auto;
      margin-right: auto;

      & > #results-large-screens {
        display: block;
        flex: 1 1 0px;
        height: auto;
        position: sticky;
        top: 130px;
      }

      & > #results-small-screens {
        display: none;
      }

      & > #scrollable {
        flex: 1 1 0px;
      }
    }
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
          <Box id="container" padding={{ bottom: "lg" }}>
            <Box id="scrollable">
              <Box
                padding={{
                  inline: 20,
                  block: 35,
                }}
                flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Text align="center" style="title_1">
                  {t("simulator.activities.title")}
                </Text>
              </Box>
              <Box flex flexDirection="column" gap="md" id="activities">
                <ActivitiesList />
              </Box>
            </Box>
            <Box id="results-large-screens">
              <Box
                padding={{
                  inline: 20,
                  block: 35,
                }}
                flex
                flexDirection="column"
                alignItems="center"
                id="result_title"
              >
                <Text align="center" style="title_1">
                  {t("simulator.results.title")}
                </Text>
              </Box>
              <Box
                flex
                flexDirection="column"
                gap="md"
                border={{ color: "neutral.dark", size: "sm" }}
                borderRadius="md"
                padding={{ inline: 60, block: 80 }}
              >
                <ResultsDetails />
              </Box>
            </Box>
            <Box id="results-small-screens">
              <ResultsDetailsMobile />
            </Box>
          </Box>
          <Box
            id="charts"
            background="neutral.light"
            flex
            flexDirection="column"
            gap="lg"
            padding="lg"
          >
            <Text style="title_1" align="center">
              {t("simulator.results.charts.title")}
            </Text>
            <ResultsCharts />
            <Box flex flexDirection="column" alignItems="center" gap={20}>
              <Text style="title_3" align="center">
                {t("simulator.results.charts.link_to_inputs.text")}
              </Text>
              <Box>
                <Button
                  color="brand"
                  onClick={() => {
                    const url = location.href;
                    location.href = "#root";
                    history.replaceState(null, "", url);
                  }}
                >
                  {t("simulator.results.charts.link_to_inputs.cta")}
                </Button>
              </Box>
            </Box>
          </Box>
        </StyledForm>
      </Formik>
    </Theme>
  );
}

export { App };
