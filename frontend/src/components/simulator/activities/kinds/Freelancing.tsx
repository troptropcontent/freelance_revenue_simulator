import { Box } from "src/components/ui/Box";
import { BaseKind } from "./BaseKind";
import { useTranslation } from "react-i18next";
import { Accordion } from "src/components/ui";
import { CurrencyInput } from "src/components/ui/formik/CurrencyInput";
import { useFormikContext } from "formik";
import { FormValues } from "src/App";
import { Activities } from "../../constants";
import { FreelanceDailyRate } from "../inputs/FreelanceDailyRate";
import { FreelanceOnDelivery } from "../inputs/FreelanceOnDelivery";
import { Consulting } from "../inputs/Consulting";
import { Sponsorship } from "../inputs/Sponsorship";

const ActivityInputComponents: Record<
  keyof typeof Activities,
  React.FC<{
    index: number;
  }>
> = {
  freelance_daily_rate: FreelanceDailyRate,
  freelance_on_delivery: FreelanceOnDelivery,
  consulting: Consulting,
  sponsorship: Sponsorship,
} as const;

const Freelancing = ({
  color,
}: {
  color: React.ComponentProps<typeof Box>["background"];
}) => {
  const { values } = useFormikContext<FormValues>();
  const { t } = useTranslation();

  return (
    <BaseKind
      kind="freelancing"
      color={color}
      title={t("simulator.activities.kinds.freelancing.title")}
      description={t("simulator.activities.kinds.freelancing.description")}
    >
      {values.activities.map((activity, i) => {
        if (Activities[activity.type].kind == "freelancing") {
          const InputComponent = ActivityInputComponents[activity.type];
          return <InputComponent index={i} />;
        } else {
          return null;
        }
      })}
    </BaseKind>
  );
};

export { Freelancing };
