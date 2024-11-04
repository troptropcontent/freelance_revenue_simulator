import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/inputs/BaseActivity";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "formik";
import { FormValues } from "src/App";
import { EnjoymentRateInput } from "../private/EnjoymentRateInput";

const Admin = ({ index }: { index: number }) => {
  const { t } = useTranslation();
  const {
    values: {
      config: { number_of_days_worked_per_week },
    },
  } = useFormikContext<FormValues>();

  return (
    <BaseActivity
      title={t("simulator.activities.admin.label")}
      index={index}
      description={t("simulator.activities.admin.description")}
    >
      <Range
        name={`activities[${index}].values.average_time_spent`}
        label={t("simulator.activities.admin.inputs.average_time_spent.label")}
        min={0}
        max={number_of_days_worked_per_week}
        step={0.5}
      />
      <EnjoymentRateInput name={`activities[${index}].values.enjoyment_rate`} />
    </BaseActivity>
  );
};

export { Admin };
