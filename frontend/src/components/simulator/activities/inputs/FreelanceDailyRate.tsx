import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/inputs/BaseActivity";
import { EnjoymentRateInput } from "src/components/simulator/activities/private/EnjoymentRateInput";
import { useTranslation } from "react-i18next";
import { CurrencyInput } from "src/components/ui/formik/CurrencyInput";
import { useFormikContext } from "formik";
import { FormValues } from "src/App";

const FreelanceDailyRate = ({ index }: { index: number }) => {
  const { t } = useTranslation();
  const { values } = useFormikContext<FormValues>();
  console.log({ values });
  return (
    <BaseActivity
      title={t("simulator.activities.freelance_daily_rate.label")}
      description={t("simulator.activities.freelance_daily_rate.description")}
      identifier="freelance_daily_rate"
    >
      <CurrencyInput
        name={`activities[${index}].values.rate`}
        label="Taux Journalier Moyen (TJM)"
      />
      <Range
        name="activities.freelance_daily_rate.quantity"
        label={t(
          "simulator.activities.freelance_daily_rate.inputs.quantity.label",
        )}
        min={0}
        max={5}
        step={0.5}
        valueFormater={(value) =>
          t("simulator.activities.freelance_daily_rate.inputs.quantity.unit", {
            value,
          })
        }
      />
      <EnjoymentRateInput name={`activities[${index}].values.enjoyment_rate`} />
    </BaseActivity>
  );
};

export { FreelanceDailyRate };
