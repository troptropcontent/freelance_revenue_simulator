import { useTranslation } from "react-i18next";
import { BaseKind } from "./BaseKind";
import { Box } from "src/components/ui/Box";

const UnbilledActivty = ({
  color,
}: {
  color: React.ComponentProps<typeof Box>["background"];
}) => {
  const { t } = useTranslation();
  return (
    <BaseKind
      kind="unbilled_activity"
      color={color}
      title={t("simulator.activities.kinds.unbilled_activity.title")}
      description={t(
        "simulator.activities.kinds.unbilled_activity.description",
      )}
    >
      UnbilledActivty
    </BaseKind>
  );
};

export { UnbilledActivty };
