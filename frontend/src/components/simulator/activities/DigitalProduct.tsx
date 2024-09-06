import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/BaseActivity";
import { EnjoymentRateInput } from "src/components/simulator/activities/private/EnjoymentRateInput";
import { useTranslation } from "react-i18next";

const DigitalProduct = () => {
  const { t } = useTranslation();
  return (
    <BaseActivity
      title={t("simulator.activities.digital_product.label")}
      identifier="digital_product"
      description={t("simulator.activities.digital_product.description")}
    >
      <Range
        name="activities.digital_product.rate"
        label={t("simulator.activities.digital_product.inputs.rate.label")}
        valueFormater={(value) => t("common.currency.EUR", { value })}
        min={0}
        max={10000}
        step={50}
      />
      <Range
        name="activities.digital_product.quantity"
        label={t("simulator.activities.digital_product.inputs.quantity.label")}
        valueFormater={(value) =>
          t("common.value_with_unit.per_month", { value })
        }
        min={0}
        max={1000}
        step={10}
      />
      <Range
        name="activities.digital_product.average_time_spent"
        label={t(
          "simulator.activities.digital_product.inputs.average_time_spent.label",
        )}
        valueFormater={(value) =>
          t("common.value_with_unit.number_of_days_per_week", { count: value })
        }
        min={0}
        max={20}
        step={0.5}
      />
      <EnjoymentRateInput name="activities.digital_product.enjoyment_rate" />
    </BaseActivity>
  );
};

export { DigitalProduct };
