import { useTranslation } from "react-i18next";
import { BaseKind } from "./BaseKind";
import { Box } from "src/components/ui/Box";
import { useFormikContext } from "formik";
import { FormValues } from "src/App";
import { Activities } from "../../constants";
import { Entrepreneurship } from "../inputs/Entrepreneurship";
import { Button } from "src/components/ui/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const EntrepreneurialProject = ({
  color,
}: {
  color: React.ComponentProps<typeof Box>["background"];
}) => {
  const { values, setValues } = useFormikContext<FormValues>();
  const { t } = useTranslation();

  const addNewEntrepreunarialProject = () => {
    values.activities = [
      ...values.activities,
      {
        type: "entrepreneurship",
        values: Activities.entrepreneurship.initial_values,
      },
    ];
    setValues(values);
  };
  return (
    <BaseKind
      kind="entrepeunarial_project"
      color={color}
      title={t("simulator.activities.kinds.entrepreneurial_project.title")}
      description={t(
        "simulator.activities.kinds.entrepreneurial_project.description",
      )}
    >
      {values.activities.map((activity, i) => {
        if (Activities[activity.type].kind == "entrepeunarial_project") {
          return (
            <Entrepreneurship
              index={i}
              key={`entrepreneurship_activity_${i}`}
            />
          );
        } else {
          return null;
        }
      })}
      <Box flex flexDirection="row" justifyContent="center">
        <Button onClick={addNewEntrepreunarialProject} color="white">
          Ajouter un autre projet
          <AddCircleIcon fontSize="small" />
        </Button>
      </Box>
    </BaseKind>
  );
};

export { EntrepreneurialProject };
