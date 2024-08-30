import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/BaseActivity";
import { Activities } from "src/components/simulator/constants";

const DigitalProduct = () => {
  return (
    <BaseActivity
      title={Activities.digital_product.label}
      identifier="digital_product"
    >
      <Range name="digital_product.rate" label="Tarif par produit" unit="€" />
      <Range
        name="digital_product.quantity"
        label="Nombre de produits digitaux vendus"
        unit="/ mois"
      />
      <Range
        name="digital_product.average_time_spent"
        label="Temps alloué"
        unit="jours / semaine"
      />
      <Range
        name="digital_product.enjoyment_rate"
        label="Niveau de kiff"
        max={5}
        unit="/ 5"
      />
    </BaseActivity>
  );
};

export { DigitalProduct };
