import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/inputs/BaseActivity";
import { EnjoymentRateInput } from "src/components/simulator/activities/private/EnjoymentRateInput";
import { useTranslation } from "react-i18next";

const FreelanceOnDelivery = ({ index }: { index: number }) => {
  const { t } = useTranslation();

  return (
    <BaseActivity
      title={t("simulator.activities.freelance_on_delivery.label")}
      identifier="freelance_on_delivery"
      description={t("simulator.activities.freelance_on_delivery.description")}
    >
      <Range
        name="activities.freelance_on_delivery.rate"
        label={t(
          "simulator.activities.freelance_on_delivery.inputs.rate.label",
        )}
        valueFormater={(value) =>
          t("simulator.activities.freelance_on_delivery.inputs.rate.unit", {
            value,
          })
        }
        min={100}
        max={50000}
        step={50}
      />
      <Range
        name="activities.freelance_on_delivery.quantity"
        label={t(
          "simulator.activities.freelance_on_delivery.inputs.quantity.label",
        )}
        min={0}
        max={50}
        valueFormater={(value) =>
          t("common.value_with_unit.per_month", { value })
        }
      />
      <Range
        name="activities.freelance_on_delivery.average_time_spent"
        label={t(
          "simulator.activities.freelance_on_delivery.inputs.average_time_spent.label",
        )}
        min={0}
        max={20}
        step={0.5}
        valueFormater={(value) =>
          t("common.value_with_unit.number_of_days", { count: value })
        }
      />
      <EnjoymentRateInput name="activities.freelance_on_delivery.enjoyment_rate" />
    </BaseActivity>
  );
};

export { FreelanceOnDelivery };
