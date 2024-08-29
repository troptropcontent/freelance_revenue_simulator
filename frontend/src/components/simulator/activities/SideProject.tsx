import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "./BaseActivity";

const SideProject = () => {
  return (
    <BaseActivity title="Projet parallèle" identifier="side_project">
      <Range name="side_project.rate" label="Tarif" />
    </BaseActivity>
  );
};

export { SideProject };
