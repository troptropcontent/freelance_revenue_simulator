import { Box } from "src/components/ui/Box";
import { BaseKind } from "./BaseKind";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "formik";
import { FormValues } from "src/App";
import { Activities, ActivitiesWithKind } from "../../constants";
import { FreelanceDailyRate } from "../inputs/FreelanceDailyRate";
import { FreelanceOnDelivery } from "../inputs/FreelanceOnDelivery";
import { Consulting } from "../inputs/Consulting";
import { Sponsorship } from "../inputs/Sponsorship";

const ActivityInputComponents: Record<
  ActivitiesWithKind<"freelancing">,
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
          const InputComponent =
            ActivityInputComponents[
              activity.type as ActivitiesWithKind<"freelancing">
            ];
          return <InputComponent index={i} key={`activity_${i}`} />;
        } else {
          return null;
        }
      })}
    </BaseKind>
  );
};

export { Freelancing };
