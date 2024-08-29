import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "./BaseActivity";

const Admin = () => {
  return (
    <BaseActivity title="Admin" identifier="admin">
      <Range name="admin.rate" label="Temps par semaine alloué" />
    </BaseActivity>
  );
};

export { Admin };
