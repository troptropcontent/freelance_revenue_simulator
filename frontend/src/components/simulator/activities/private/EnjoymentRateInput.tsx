import { useTranslation } from "react-i18next";
import { Rating } from "src/components/ui/formik/Rating";

const EnjoymentRateInput = ({ name }: { name: string }) => {
  const { t } = useTranslation();

  return (
    <Rating
      label={t("simulator.activities.shared_inputs.enjoyment_rate.label")}
      name={name}
      max={5}
    />
  );
};

export { EnjoymentRateInput };
