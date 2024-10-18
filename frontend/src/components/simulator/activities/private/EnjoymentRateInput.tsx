import { useTranslation } from "react-i18next";
import { RatingInputGroup } from "src/components/ui/formik/groups/RatingInputGroup";

const EnjoymentRateInput = ({ name }: { name: string }) => {
  const { t } = useTranslation();

  return (
    <RatingInputGroup
      label={t("simulator.activities.shared_inputs.enjoyment_rate.label")}
      name={name}
      max={5}
    />
  );
};

export { EnjoymentRateInput };
