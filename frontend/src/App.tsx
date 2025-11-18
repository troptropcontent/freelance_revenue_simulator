import { useForm } from "react-hook-form";
import { Button } from "./components/ui/Button";
import { InputTabs } from "./components/simulator/inputs/InputTabs";
import { Inputs } from "./components/simulator/inputs/types";
import { useInitialValues } from "./components/simulator/inputs/shared/hooks";

function App() {
  const initialValues = useInitialValues();
  const form = useForm<Inputs>({
    defaultValues: initialValues,
  });
  return (
    <form className="container grid grid-cols-3 gap-x-6">
      <div>Simulateur SoloPortfolio</div>
      <div>
        <Button>Partager</Button>
      </div>

      <InputTabs form={form} />
      <div>Results</div>
    </form>
  );
}

export { App };
