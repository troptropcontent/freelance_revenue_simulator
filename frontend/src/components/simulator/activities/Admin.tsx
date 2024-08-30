import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/BaseActivity";
import { Activities } from "src/components/simulator/constants";

const Admin = () => {
  return (
    <BaseActivity title={Activities.admin.label} identifier="admin">
      <Range name="admin.rate" label="Temps alloué" unit="jours / semaine" />
    </BaseActivity>
  );
};

export { Admin };
