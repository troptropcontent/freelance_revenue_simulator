import { useTranslation } from "react-i18next";
import { RatingInputGroup } from "src/components/ui/formik/groups/RatingInputGroup";
import { MAX_RATE } from "../../constants";

const EnjoymentRateInput = ({ name }: { name: string }) => {
  const { t } = useTranslation();

  return (
    <RatingInputGroup
      label={t("simulator.activities.shared_inputs.enjoyment_rate.label")}
      name={name}
      max={MAX_RATE}
    />
  );
};

export { EnjoymentRateInput };
