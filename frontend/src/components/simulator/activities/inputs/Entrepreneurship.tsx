import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/inputs/BaseActivity";
import { EnjoymentRateInput } from "src/components/simulator/activities/private/EnjoymentRateInput";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "formik";
import { FormValues } from "src/App";
import { ActivitiesType } from "../../constants";
import { CurrencyInputGroup } from "src/components/ui/formik/groups/CurrencyInputGroup";

const Entrepreneurship = ({ index }: { index: number }) => {
  const { t } = useTranslation();
  const { values, getFieldMeta } = useFormikContext<FormValues>();
  const base_name = `activities[${index}].values`;

  const { value: label } = getFieldMeta<
    ActivitiesType["entrepreneurship"]["initial_values"]["name"]
  >(`${base_name}.name`);

  const loadLabel = () => {
    if (label) {
      return label;
    }

    let entrepreuneurial_project_index = 0;

    values.activities.some((activity, i) => {
      if (activity.type == "entrepreneurship") {
        entrepreuneurial_project_index++;
      }
      return i == index;
    });

    return t("simulator.activities.entrepreneurial_project.label", {
      index: entrepreuneurial_project_index,
    });
  };

  return (
    <BaseActivity title={loadLabel()} index={index}>
      <CurrencyInputGroup
        name={`activities[${index}].values.rate`}
        label={t(
          "simulator.activities.entrepreneurial_project.inputs.rate.label",
        )}
      />
      <Range
        name={`${base_name}.quantity`}
        label={t(
          "simulator.activities.entrepreneurial_project.inputs.quantity.label",
        )}
        min={0}
        max={1000}
        step={10}
      />
      <Range
        name={`${base_name}.average_time_spent`}
        label={t(
          "simulator.activities.entrepreneurial_project.inputs.average_time_spent.label",
        )}
        min={0}
        max={20}
        step={0.5}
      />
      <EnjoymentRateInput name={`${base_name}.enjoyment_rate`} />
    </BaseActivity>
  );
};

export { Entrepreneurship };
