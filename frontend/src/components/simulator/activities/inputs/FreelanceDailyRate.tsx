import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/inputs/BaseActivity";
import { EnjoymentRateInput } from "src/components/simulator/activities/private/EnjoymentRateInput";
import { useTranslation } from "react-i18next";
import { CurrencyInputGroup } from "src/components/ui/formik/groups/CurrencyInputGroup";

const FreelanceDailyRate = ({ index }: { index: number }) => {
  const { t } = useTranslation();

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
        max={5}
        step={0.5}
      />
      <EnjoymentRateInput name={`activities[${index}].values.enjoyment_rate`} />
    </BaseActivity>
  );
};

export { FreelanceDailyRate };
