import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/inputs/BaseActivity";
import { EnjoymentRateInput } from "src/components/simulator/activities/private/EnjoymentRateInput";
import { useTranslation } from "react-i18next";
import { CurrencyInputGroup } from "src/components/ui/formik/groups/CurrencyInputGroup";
import { useFormikContext } from "formik";
import { FormValues } from "src/App";

const FreelanceDailyRate = ({ index }: { index: number }) => {
  const { t } = useTranslation();
  const {
    values: {
      config: { number_of_days_worked_per_week },
    },
  } = useFormikContext<FormValues>();

  return (
    <BaseActivity
      title={t("simulator.activities.freelance_daily_rate.label")}
      description={t("simulator.activities.freelance_daily_rate.description")}
      index={index}
    >
      <CurrencyInputGroup
        name={`activities[${index}].values.rate`}
        label="Taux Journalier Moyen (TJM)"
      />
      <Range
        name={`activities[${index}].values.quantity`}
        label={t(
          "simulator.activities.freelance_daily_rate.inputs.quantity.label",
        )}
        min={0}
        max={number_of_days_worked_per_week}
        step={0.5}
      />
      <EnjoymentRateInput name={`activities[${index}].values.enjoyment_rate`} />
    </BaseActivity>
  );
};

export { FreelanceDailyRate };
