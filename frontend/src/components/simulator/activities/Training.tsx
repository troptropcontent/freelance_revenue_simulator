import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "./BaseActivity";

const Training = () => {
  return (
    <BaseActivity title="Training" identifier="training">
      <Range name="training.rate" label="Tarif" />
    </BaseActivity>
  );
};

export { Training };
