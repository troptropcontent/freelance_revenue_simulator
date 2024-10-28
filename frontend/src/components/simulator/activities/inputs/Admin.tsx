import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/inputs/BaseActivity";
import { useTranslation } from "react-i18next";

const Admin = ({ index }: { index: number }) => {
  const { t } = useTranslation();

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
        max={20}
        step={0.5}
      />
    </BaseActivity>
  );
};

export { Admin };
