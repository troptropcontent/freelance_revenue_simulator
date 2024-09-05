import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/BaseActivity";
import { EnjoymentRateInput } from "src/components/simulator/activities/private/EnjoymentRateInput";
import { useTranslation } from "react-i18next";

const Sponsorship = () => {
  const { t } = useTranslation();
  return (
    <BaseActivity
      title={t("simulator.activities.sponsorship.label")}
      identifier="sponsorship"
      description={t("simulator.activities.sponsorship.description")}
    >
      <Range
        name="sponsorship.rate"
        label={t("simulator.activities.sponsorship.inputs.rate.label")}
        valueFormater={(value) =>
          t("simulator.activities.sponsorship.inputs.rate.unit", { value })
        }
        min={100}
        max={10000}
        step={50}
      />
      <Range
        name="sponsorship.quantity"
        label={t("simulator.activities.sponsorship.inputs.quantity.label")}
        valueFormater={(value) =>
          t("common.value_with_unit.per_month", { value })
        }
      />
      <Range
        name="sponsorship.average_time_spent"
        label={t(
          "simulator.activities.sponsorship.inputs.average_time_spent.label",
        )}
        min={0}
        max={10}
        step={0.5}
        valueFormater={(value) =>
          t("common.value_with_unit.number_of_days", {
            count: value,
          })
        }
      />
      <EnjoymentRateInput name="sponsorship.enjoyment_rate" />
    </BaseActivity>
  );
};

export { Sponsorship };
