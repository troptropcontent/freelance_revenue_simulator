import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/inputs/BaseActivity";
import { useTranslation } from "react-i18next";

const TimeOff = ({ index }: { index: number }) => {
  const { t } = useTranslation();

  return (
    <BaseActivity
      title={t("simulator.activities.time_off.label")}
      index={index}
      description={t("simulator.activities.time_off.description")}
    >
      <Range
        name={`activities[${index}].values.quantity`}
        label={t("simulator.activities.time_off.inputs.quantity.label")}
        min={0}
        max={25}
        step={0.5}
      />
    </BaseActivity>
  );
};

export { TimeOff };
