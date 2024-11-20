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
import { ChartsTitle } from "./components/simulator/results/ChartsTitle";
import { mediaQueries } from "./components/helper";
import { useEffect, useRef, useState } from "react";

const StyledForm = styled.form`
  margin-inline: auto;
  position: relative;
  background-color: white;

  #scrollable {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

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
    padding-block: 30px;

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
      box-shadow: 0px -2px 20px #00000030;

      z-index: 99999999;
      width: 100%;
      background: white;
    }
  }

  #charts {
    padding-block: 30px;
    padding-inline: 40px;
  }

  ${mediaQueries("md")`
    #result_title {
      display: flex;
    }

    & > #titles {
      max-width: 1200px;
    }

    & > #container {
      display: flex;
      align-items: flex-start;
      padding-block-start: 70px;
      padding-block-end: 80px;
      padding-inline: 60px;
      max-width: 1200px;
      margin-left: auto;
      margin-right: auto;

      & > #results-large-screens {
        display: flex;
        flex-direction: column;
        gap: 25px;
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

    #charts {
      padding-inline: 60px;
      padding-block-start: 70px;
      padding-block-end: 80px;
    }
    `}
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
  const title_ref = useRef<HTMLLabelElement | HTMLParagraphElement | null>(null);
  const [title_height, set_title_height] = useState<number | undefined>(undefined);

  useEffect(() => {
    // The layout of the page should be as follow:
    // |--------------------------|
    // | ---Title1---|---Title2---|
    // |--------------------------|
    // | ---inputs---|----Charts--|
    // |--------------------------|
    // Title1 and Title2 should have the same height
    // We need to wait for the Title1 to be rendered to get its height to apply it to Title2 
    // (it is only 1 line so always less height than the Title1)
    set_title_height(title_ref.current?.clientHeight);
  }, [title_ref.current?.clientHeight]);

  return (
    <Theme>
      <Formik
        initialValues={initial_values}
        onSubmit={() => {}}
        enableReinitialize
      >
        <StyledForm>
          <Box id="container">
            <Box id="scrollable">
              <Box
                flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Text align="center" style="title_n1" ref={title_ref}>
                  {t("simulator.activities.title")}
                </Text>
              </Box>
              <Box flex flexDirection="column" gap="md" id="activities">
                <ActivitiesList />
              </Box>
            </Box>
            <Box id="results-large-screens" >
              <Box
                height={title_height}
                flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                id="result_title"
              >
                <Text align="center" style="title_n1">
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
            background="neutral.medium"
            flex
            flexDirection="column"
            alignItems="center"
            gap="lg"
          >
            <ChartsTitle />
            <ResultsCharts />
            <Box flex flexDirection="column" alignItems="center" gap={20}>
              <Text style="text_section" align="center">
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
                  <Text style="call_to_action">
                    {t("simulator.results.charts.link_to_inputs.cta")}
                  </Text>
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
