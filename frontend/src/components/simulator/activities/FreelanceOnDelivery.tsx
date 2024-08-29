import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "./BaseActivity";

const FreelanceOnDelivery = () => {
  return (
    <BaseActivity
      title="Mission de freelance facturée à la livraison"
      identifier="freelance_on_delivery"
    >
      <Range name="freelance_on_delivery.rate" label="Tarif" />
    </BaseActivity>
  );
};

export { FreelanceOnDelivery };
