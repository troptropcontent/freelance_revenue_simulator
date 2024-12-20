import { useTranslation } from "react-i18next";
import { BaseActivity } from "./BaseActivity";
import { Range } from "src/components/ui/formik/Range";
import { EnjoymentRateInput } from "../private/EnjoymentRateInput";
import { useFormikContext } from "formik";
import { FormValues } from "src/App";

const SideProject = ({ index }: { index: number }) => {
  const { t } = useTranslation();
  const {
    values: {
      config: { number_of_days_worked_per_week },
    },
  } = useFormikContext<FormValues>();
  return (
    <BaseActivity
      title={t("simulator.activities.side_project.label")}
      index={index}
      description={t("simulator.activities.side_project.description")}
    >
      <Range
        name={`activities[${index}].values.average_time_spent`}
        label={t(
          "simulator.activities.side_project.inputs.average_time_spent.label",
        )}
        min={0}
        max={number_of_days_worked_per_week}
        step={0.5}
      />
      <EnjoymentRateInput name={`activities[${index}].values.enjoyment_rate`} />
    </BaseActivity>
  );
};

export { SideProject };
