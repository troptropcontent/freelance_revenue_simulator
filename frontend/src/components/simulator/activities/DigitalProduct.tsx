import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "./BaseActivity";

const DigitalProduct = () => {
  return (
    <BaseActivity title="Produit numérique" identifier="digital_product">
      <Range name="digital_product.rate" label="Tarif" />
    </BaseActivity>
  );
};

export { DigitalProduct };
