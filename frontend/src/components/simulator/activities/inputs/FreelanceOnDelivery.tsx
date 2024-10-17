import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/inputs/BaseActivity";
import { EnjoymentRateInput } from "src/components/simulator/activities/private/EnjoymentRateInput";
import { useTranslation } from "react-i18next";
import { CurrencyInput } from "src/components/ui/formik/CurrencyInput";
import { FrequencyInput } from "src/components/ui/formik/FrequencyInput";

const FreelanceOnDelivery = ({ index }: { index: number }) => {
  const { t } = useTranslation();

  return (
    <BaseActivity
      title={t("simulator.activities.freelance_on_delivery.label")}
      identifier="freelance_on_delivery"
      description={t("simulator.activities.freelance_on_delivery.description")}
    >
      <CurrencyInput
        name={`activities[${index}].values.rate`}
        label={t(
          "simulator.activities.freelance_on_delivery.inputs.rate.label",
        )}
      />
      <FrequencyInput
        name={`activities[${index}].values.frequency`}
        label={t(
          "simulator.activities.freelance_on_delivery.inputs.frequency.label",
        )}
      />
      <Range
        name={`activities[${index}].values.average_time_spent`}
        label={t(
          "simulator.activities.freelance_on_delivery.inputs.average_time_spent.label",
        )}
        min={0}
        max={20}
        step={0.5}
      />
      <EnjoymentRateInput name={`activities[${index}].values.enjoyment_rate`} />
    </BaseActivity>
  );
};

export { FreelanceOnDelivery };
