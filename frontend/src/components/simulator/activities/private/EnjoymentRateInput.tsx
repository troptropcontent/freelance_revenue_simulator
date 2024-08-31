import { Range } from "src/components/ui/formik/Range";

const EnjoymentRateInput = ({ name }: { name: string }) => {
  return <Range name={name} label="Niveau de kiff" max={5} unit="/ 5" />;
};

export { EnjoymentRateInput };
