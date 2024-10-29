import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/inputs/BaseActivity";
import { EnjoymentRateInput } from "src/components/simulator/activities/private/EnjoymentRateInput";
import { useTranslation } from "react-i18next";
import { CurrencyInputGroup } from "src/components/ui/formik/groups/CurrencyInputGroup";
import { NumberInputGroup } from "src/components/ui/formik/groups/NumberInput";
import { useFormikContext } from "formik";
import { FormValues } from "src/App";

const Consulting = ({ index }: { index: number }) => {
  const { t } = useTranslation();
  const {
    values: {
      config: { number_of_days_worked_per_week },
    },
  } = useFormikContext<FormValues>();

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
      <NumberInputGroup
        name={`activities[${index}].values.quantity`}
        label={t("simulator.activities.consulting.inputs.quantity.label")}
      />
      <Range
        name={`activities[${index}].values.average_time_spent`}
        label={t(
          "simulator.activities.consulting.inputs.average_time_spent.label",
        )}
        min={0}
        max={number_of_days_worked_per_week}
        step={0.5}
      />
      <EnjoymentRateInput name={`activities[${index}].values.enjoyment_rate`} />
    </BaseActivity>
  );
};

export { Consulting };
