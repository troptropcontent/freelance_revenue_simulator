import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/BaseActivity";
import { useTranslation } from "react-i18next";
import { AverageWorkingConditions } from "../constants";

const GeneralInfo = () => {
  const { t } = useTranslation();

  return (
    <BaseActivity
      title={t("simulator.activities.general_info.label")}
      description={t("simulator.activities.general_info.description")}
      identifier="general_informations"
    >
      <Range
        name="general_informations.weeks_off"
        label={t("simulator.activities.general_info.inputs.weeks_off.label")}
        valueFormater={(value) =>
          t("simulator.activities.general_info.inputs.weeks_off.unit", {
            count: value,
          })
        }
        max={AverageWorkingConditions.weeksPerYear}
      />
      <Range
        name="general_informations.time_spent_on_admin_tasks"
        label={t(
          "simulator.activities.general_info.inputs.time_spent_on_admin_tasks.label",
        )}
        valueFormater={(value) =>
          t("common.value_with_unit.number_of_days_per_week", { count: value })
        }
        max={AverageWorkingConditions.daysWorkedPerWeek}
      />
    </BaseActivity>
  );
};

export { GeneralInfo };
