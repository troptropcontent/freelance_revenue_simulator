import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/inputs/BaseActivity";
import { EnjoymentRateInput } from "src/components/simulator/activities/private/EnjoymentRateInput";
import { useTranslation } from "react-i18next";
import { CurrencyInputGroup } from "src/components/ui/formik/groups/CurrencyInputGroup";
import { NumberInputGroup } from "src/components/ui/formik/groups/NumberInput";

const Sponsorship = ({ index }: { index: number }) => {
  const { t } = useTranslation();

  return (
    <BaseActivity
      title={t("simulator.activities.sponsorship.label")}
      index={index}
      description={t("simulator.activities.sponsorship.description")}
    >
      <CurrencyInputGroup
        name={`activities[${index}].values.rate`}
        label={t("simulator.activities.sponsorship.inputs.rate.label")}
      />
      <NumberInputGroup
        name={`activities[${index}].values.quantity`}
        label={t("simulator.activities.sponsorship.inputs.quantity.label")}
      />
      <Range
        name={`activities[${index}].values.average_time_spent`}
        label={t(
          "simulator.activities.sponsorship.inputs.average_time_spent.label",
        )}
        min={0}
        max={20}
        step={0.5}
      />
      <EnjoymentRateInput name={`activities[${index}].values.enjoyment_rate`} />
    </BaseActivity>
  );
};

export { Sponsorship };
