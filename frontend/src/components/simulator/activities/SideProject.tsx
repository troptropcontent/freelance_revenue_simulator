import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/BaseActivity";
import { EnjoymentRateInput } from "src/components/simulator/activities/private/EnjoymentRateInput";
import { useTranslation } from "react-i18next";

const SideProject = () => {
  const { t } = useTranslation();

  return (
    <BaseActivity
      title={t("simulator.activities.side_project.label")}
      identifier="side_project"
      description={t("simulator.activities.side_project.description")}
    >
      <Range
        name="activities.side_project.revenue"
        label={t("simulator.activities.side_project.inputs.revenue.label")}
        valueFormater={(value) =>
          t("simulator.activities.side_project.inputs.revenue.unit", { value })
        }
      />
      <Range
        name="activities.side_project.average_time_spent"
        label={t(
          "simulator.activities.side_project.inputs.average_time_spent.label",
        )}
        valueFormater={(value) =>
          t("common.value_with_unit.number_of_days_per_week", { count: value })
        }
        min={0}
        max={20}
        step={0.5}
      />
      <EnjoymentRateInput name="activities.side_project.enjoyment_rate" />
    </BaseActivity>
  );
};

export { SideProject };
