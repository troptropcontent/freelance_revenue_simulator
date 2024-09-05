import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/BaseActivity";
import { useTranslation } from "react-i18next";

const Admin = () => {
  const { t } = useTranslation();

  return (
    <BaseActivity
      title={t("simulator.activities.admin.label")}
      identifier="admin"
    >
      <Range
        name="admin.rate"
        label={t("simulator.activities.admin.inputs.rate.label")}
        valueFormater={(value) =>
          t("common.value_with_unit.number_of_days_per_week", { count: value })
        }
      />
    </BaseActivity>
  );
};

export { Admin };
