import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/BaseActivity";
import { Activities } from "src/components/simulator/constants";
import { EnjoymentRateInput } from "src/components/simulator/activities/private/EnjoymentRateInput";

const DigitalProduct = () => {
  return (
    <BaseActivity
      title={Activities.digital_product.label}
      identifier="digital_product"
      description={Activities.digital_product.description}
    >
      <Range
        name="digital_product.rate"
        label="Tarif du produit"
        unit="€"
        min={0}
        max={10000}
        step={50}
      />
      <Range
        name="digital_product.quantity"
        label="Nombre de produits digitaux vendus"
        unit="/ mois"
        min={0}
        max={1000}
        step={10}
      />
      <Range
        name="digital_product.average_time_spent"
        label="Temps alloué"
        unit="jours / semaine"
        min={0}
        max={20}
        step={0.5}
      />
      <EnjoymentRateInput name="digital_product.enjoyment_rate" />
    </BaseActivity>
  );
};

export { DigitalProduct };
