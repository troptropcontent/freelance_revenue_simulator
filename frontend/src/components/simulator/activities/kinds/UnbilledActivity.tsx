import { useTranslation } from "react-i18next";
import { BaseKind } from "./BaseKind";
import { Box } from "src/components/ui/Box";
import { useFormikContext } from "formik";
import { FormValues } from "src/App";
import { Activities, ActivitiesWithKind } from "../../constants";
import { Admin } from "../inputs/Admin";
import { SideProject } from "../inputs/SideProject";
import { TimeOff } from "../inputs/TimeOff";

const ActivityInputComponents: Record<
  ActivitiesWithKind<"unbilled_activity">,
  React.FC<{
    index: number;
  }>
> = {
  admin: Admin,
  side_project: SideProject,
  time_off: TimeOff,
} as const;

const UnbilledActivty = ({
  color,
}: {
  color: React.ComponentProps<typeof Box>["background"];
}) => {
  const { t } = useTranslation();
  const { values } = useFormikContext<FormValues>();

  return (
    <BaseKind
      kind="unbilled_activity"
      color={color}
      title={t("simulator.activities.kinds.unbilled_activity.title")}
      description={t(
        "simulator.activities.kinds.unbilled_activity.description",
      )}
    >
      {values.activities.map((activity, i) => {
        if (Activities[activity.type].kind == "unbilled_activity") {
          const InputComponent =
            ActivityInputComponents[
              activity.type as ActivitiesWithKind<"unbilled_activity">
            ];
          return <InputComponent index={i} key={`unbilled_activity_${i}`} />;
        } else {
          return null;
        }
      })}
    </BaseKind>
  );
};

export { UnbilledActivty };
