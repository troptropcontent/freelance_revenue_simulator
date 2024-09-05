import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/BaseActivity";
import { EnjoymentRateInput } from "src/components/simulator/activities/private/EnjoymentRateInput";
import { useTranslation } from "react-i18next";

const Training = () => {
  const { t } = useTranslation();

  return (
    <BaseActivity
      title={t("simulator.activities.training.label")}
      identifier="training"
      description={t("simulator.activities.training.description")}
    >
      <Range
        name="activities.training.rate"
        label={t("simulator.activities.training.inputs.rate.label")}
        valueFormater={(value) =>
          t("simulator.activities.training.inputs.rate.unit", { value })
        }
        min={0}
        max={10000}
        step={50}
      />
      <Range
        name="activities.training.quantity"
        label={t("simulator.activities.training.inputs.quantity.label")}
        valueFormater={(value) =>
          t("simulator.activities.training.inputs.quantity.unit", { value })
        }
        min={0}
        max={100}
      />
      <Range
        name="activities.training.average_time_spent"
        label={t(
          "simulator.activities.training.inputs.average_time_spent.label",
        )}
        valueFormater={(value) =>
          t("common.value_with_unit.number_of_days_per_week", {
            count: value,
          })
        }
        min={0}
        max={20}
        step={0.5}
      />
      <EnjoymentRateInput name="activities.training.enjoyment_rate" />
    </BaseActivity>
  );
};

export { Training };
