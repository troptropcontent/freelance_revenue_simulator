import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/inputs/BaseActivity";
import { EnjoymentRateInput } from "src/components/simulator/activities/private/EnjoymentRateInput";
import { useTranslation } from "react-i18next";

const FreelanceDailyRate = ({index}:{index: number}) => {
  const { t } = useTranslation();

  return (
    <BaseActivity
      title={t("simulator.activities.freelance_daily_rate.label")}
      description={t("simulator.activities.freelance_daily_rate.description")}
      identifier="freelance_daily_rate"
    >
      <Range
        name="activities.freelance_daily_rate.rate"
        label={t("simulator.activities.freelance_daily_rate.inputs.rate.label")}
        hint={t("simulator.activities.freelance_daily_rate.inputs.rate.hint")}
        valueFormater={(value) =>
          t("common.currency.EUR", {
            value,
          })
        }
        min={100}
        max={2000}
        step={50}
      />
      <Range
        name="activities.freelance_daily_rate.quantity"
        label={t(
          "simulator.activities.freelance_daily_rate.inputs.quantity.label",
        )}
        min={0}
        max={5}
        step={0.5}
        valueFormater={(value) =>
          t("simulator.activities.freelance_daily_rate.inputs.quantity.unit", {
            value,
          })
        }
      />
      <EnjoymentRateInput name="activities.freelance_daily_rate.enjoyment_rate" />
    </BaseActivity>
  );
};

export { FreelanceDailyRate };
