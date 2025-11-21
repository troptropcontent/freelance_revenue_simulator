import { useForm } from "react-hook-form";
import { Button } from "./components/ui/Button";
import { InputTabs } from "./components/simulator/inputs/InputTabs";
import { Inputs } from "./components/simulator/inputs/types";
import { useInitialValues } from "./components/simulator/inputs/shared/hooks";
import { ResultCard } from "./components/simulator/results/ResultsCard";

function App() {
  const initialValues = useInitialValues();
  const form = useForm<Inputs>({
    defaultValues: initialValues,
  });
  return (
    <form className="container grid grid-cols-3 gap-x-6 bg-orange-100">
      <div>Simulateur SoloPortfolio</div>
      <div>
        <Button>Partager</Button>
      </div>

      <InputTabs form={form} />
      <ResultCard form={form} />
    </form>
  );
}

export { App };
