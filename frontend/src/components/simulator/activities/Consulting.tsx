import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "./BaseActivity";

const Consulting = () => {
  return (
    <BaseActivity title="Consulting" identifier="consulting">
      <Range name="consulting.rate" label="Tarif" />
    </BaseActivity>
  );
};

export { Consulting };
