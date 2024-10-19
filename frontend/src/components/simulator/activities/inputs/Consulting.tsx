import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/inputs/BaseActivity";
import { EnjoymentRateInput } from "src/components/simulator/activities/private/EnjoymentRateInput";
import { useTranslation } from "react-i18next";
import { CurrencyInputGroup } from "src/components/ui/formik/groups/CurrencyInputGroup";
import { FrequencyInputGroup } from "src/components/ui/formik/groups/FrequencyInputGroup";

const Consulting = ({ index }: { index: number }) => {
  const { t } = useTranslation();

  return (
    <BaseActivity
      title={t("simulator.activities.consulting.label")}
      index={index}
      description={t("simulator.activities.consulting.description")}
    >
      <CurrencyInputGroup
        name={`activities[${index}].values.rate`}
        label={t("simulator.activities.consulting.inputs.rate.label")}
      />
      <FrequencyInputGroup
        name={`activities[${index}].values.frequency`}
        label={t("simulator.activities.consulting.inputs.frequency.label")}
      />
      <Range
        name={`activities[${index}].values.average_time_spent`}
        label={t(
          "simulator.activities.consulting.inputs.average_time_spent.label",
        )}
        min={0}
        max={5}
        step={0.5}
      />
      <EnjoymentRateInput name={`activities[${index}].values.enjoyment_rate`} />
    </BaseActivity>
  );
};

export { Consulting };
