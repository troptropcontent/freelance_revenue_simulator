import { useTranslation } from "react-i18next";
import { BaseKind } from "./BaseKind";
import { Box } from "src/components/ui/Box";

const EntrepreneurialProject = ({
  color,
}: {
  color: React.ComponentProps<typeof Box>["background"];
}) => {
  const { t } = useTranslation();
  return (
    <BaseKind
      kind="entrepeunarial_project"
      color={color}
      title={t("simulator.activities.kinds.entrepreneurial_project.title")}
      description={t(
        "simulator.activities.kinds.entrepreneurial_project.description",
      )}
    >
      EntrepreneurialProject
    </BaseKind>
  );
};

export { EntrepreneurialProject };
