import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/BaseActivity";
import { EnjoymentRateInput } from "src/components/simulator/activities/private/EnjoymentRateInput";
import { useTranslation } from "react-i18next";

const Consulting = () => {
  const { t } = useTranslation();

  return (
    <BaseActivity
      title={t("simulator.activities.consulting.label")}
      identifier="consulting"
      description={t("simulator.activities.consulting.description")}
    >
      <Range
        name="activities.consulting.rate"
        label={t("simulator.activities.consulting.inputs.rate.label")}
        valueFormater={(value) =>
          t("simulator.activities.consulting.inputs.rate.unit", { value })
        }
        min={0}
        max={1000}
        step={50}
      />
      <Range
        name="activities.consulting.quantity"
        label={t("simulator.activities.consulting.inputs.quantity.label")}
        valueFormater={(value) =>
          t("common.value_with_unit.per_month", { value })
        }
      />
      <EnjoymentRateInput name="activities.consulting.enjoyment_rate" />
    </BaseActivity>
  );
};

export { Consulting };
