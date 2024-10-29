import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/inputs/BaseActivity";
import { EnjoymentRateInput } from "src/components/simulator/activities/private/EnjoymentRateInput";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "formik";
import { FormValues } from "src/App";
import { CurrencyInputGroup } from "src/components/ui/formik/groups/CurrencyInputGroup";
import { useMemo } from "react";

const Entrepreneurship = ({ index }: { index: number }) => {
  const { t } = useTranslation();
  const {
    getFieldMeta,
    values: {
      activities,
      config: { number_of_days_worked_per_week },
    },
  } = useFormikContext<FormValues>();
  const base_name = `activities[${index}]`;

  const { value: name } = getFieldMeta<string>(`${base_name}.name`);

  const computeIsDeletable = () => {
    const index_of_the_first_entrepreneurship_activity = activities.findIndex(
      (activity) => activity.type == "entrepreneurship",
    );
    return index_of_the_first_entrepreneurship_activity != index;
  };

  const isDeletable = useMemo(computeIsDeletable, [activities, index]);

  return (
    <BaseActivity title={name} index={index} editable deletable={isDeletable}>
      <CurrencyInputGroup
        name={`${base_name}.values.rate`}
        label={t(
          "simulator.activities.entrepreneurial_project.inputs.rate.label",
        )}
      />
      <Range
        name={`${base_name}.values.quantity`}
        label={t(
          "simulator.activities.entrepreneurial_project.inputs.quantity.label",
        )}
        min={0}
        max={1000}
        step={10}
      />
      <Range
        name={`${base_name}.values.average_time_spent`}
        label={t(
          "simulator.activities.entrepreneurial_project.inputs.average_time_spent.label",
        )}
        min={0}
        max={number_of_days_worked_per_week}
        step={0.5}
      />
      <EnjoymentRateInput name={`${base_name}.values.enjoyment_rate`} />
    </BaseActivity>
  );
};

export { Entrepreneurship };
