import { useForm } from "react-hook-form";
import { Button } from "./components/ui/Button";
import { InputTabs } from "./components/simulator/inputs/InputTabs";
import { Inputs } from "./components/simulator/inputs/types";
import { useInitialValues } from "./components/simulator/inputs/shared/hooks";
import { ResultCard } from "./components/simulator/results/ResultsCard";
import { AdviceCard } from "./components/simulator/results/AdviceCard";
import { useState } from "react";
import { Models } from "./components/simulator/constants";
import { ModelCard } from "./components/simulator/results/ModelCard";

function App() {
  const initialValues = useInitialValues();
  const form = useForm<Inputs>({
    defaultValues: initialValues,
  });

  const [model, setModelState] = useState<keyof typeof Models | null>(null)
  const setModel = (model: keyof typeof Models) => {
    setModelState(model)
    form.reset(Models[model].inputs)
  }

  const emptyModelState = () => setModelState(null)
  const shouldDisplayModelCard = model && !form.formState.isDirty

  return (
    <form className="container grid grid-cols-3 gap-x-6 gap-y-6 bg-orange-100 p-24">
      <div>Simulateur SoloPortfolio</div>
      <div>
        <Button>Partager</Button>
      </div>

      <InputTabs form={form} />
      {shouldDisplayModelCard && <ModelCard model={model} onCloseArrowClick={emptyModelState} />}
      <ResultCard form={form} />
      <AdviceCard form={form} setModel={setModel} />
    </form>
  );
}

export { App };
