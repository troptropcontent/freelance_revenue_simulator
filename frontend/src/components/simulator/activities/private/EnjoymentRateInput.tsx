import { useTranslation } from "react-i18next";
import { Range } from "src/components/ui/formik/Range";

const EnjoymentRateInput = ({ name }: { name: string }) => {
  const { t } = useTranslation();

  return (
    <Range
      name={name}
      label={t("simulator.activities.shared_inputs.enjoyment_rate.label")}
      hint={t("simulator.activities.shared_inputs.enjoyment_rate.hint")}
      max={5}
      valueFormater={(value) => `${value} / 5`}
    />
  );
};

export { EnjoymentRateInput };
