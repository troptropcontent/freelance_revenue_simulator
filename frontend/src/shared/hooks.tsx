import { useTranslation } from "react-i18next";
import { FormValues } from "src/App";
import {
  Activities,
  DEFAULT_NUMBER_DAYS_WORKED_PER_WEEKS,
  DEFAULT_NUMBER_OF_HOURS_WORKED_PER_DAY,
  DEFAULT_NUMBER_OF_WEEKS_OF_PER_YEAR,
} from "src/components/simulator/constants";

const useFormInitialValues = (): FormValues => {
  const { t } = useTranslation();
  return {
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
        name: t("simulator.activities.entrepreneurial_project.label", {
          index: 1,
        }),
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
};

export { useFormInitialValues };
