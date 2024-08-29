import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "./BaseActivity";

const Sponsorship = () => {
  return (
    <BaseActivity title="Sponsoring" identifier="sponsorship">
      <Range name="sponsorship.rate" label="Tarif" />
    </BaseActivity>
  );
};

export { Sponsorship };
