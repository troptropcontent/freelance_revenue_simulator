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

  const copyPresetUrlToClipBoard = () => {
    const inputs = form.getValues()
    const url = new URL(window.location.href)
    url.searchParams.set("presets", JSON.stringify(inputs))
    navigator.clipboard.writeText(url.toString())
  }

  const emptyModelState = () => setModelState(null)
  const shouldDisplayModelCard = model && !form.formState.isDirty

  return (
    <form className="container grid grid-cols-3 gap-x-6 gap-y-6 bg-orange-100 p-24">
      <div className="col-span-2 text-4xl font-bold">Simulateur SoloPortfolio</div>
      <div className="flex flex-row-reverse">
        <button type="button" onClick={copyPresetUrlToClipBoard} className="btn">
          Partager
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 1.60059C4.21204 1.60068 4.41549 1.68502 4.56543 1.83496C4.71536 1.98494 4.79975 2.18833 4.7998 2.40039C4.7998 2.61243 4.71528 2.81582 4.56543 2.96582C4.41549 3.11576 4.21204 3.2001 4 3.2002H1.59961V9.60059H8V7.2002C8.0001 6.98816 8.08444 6.7847 8.23438 6.63477C8.38438 6.48491 8.58776 6.40039 8.7998 6.40039C9.01186 6.40044 9.21526 6.48485 9.36523 6.63477C9.51517 6.7847 9.59951 6.98816 9.59961 7.2002V9.60059C9.59961 10.0249 9.43092 10.4324 9.13086 10.7324C8.83092 11.0322 8.42407 11.2001 8 11.2002H1.59961C1.1755 11.2002 0.768757 11.0322 0.46875 10.7324C0.168692 10.4324 0 10.0249 0 9.60059V3.2002C0.000103446 2.77599 0.168784 2.3693 0.46875 2.06934C0.768785 1.7694 1.17536 1.60059 1.59961 1.60059H4ZM10.3994 0C10.6116 0 10.8158 0.0843459 10.9658 0.234375C11.1158 0.384401 11.1992 0.588621 11.1992 0.800781V4.80078C11.1991 5.01274 11.1156 5.21627 10.9658 5.36621C10.8158 5.51624 10.6116 5.60059 10.3994 5.60059C10.1873 5.60052 9.98395 5.51617 9.83398 5.36621C9.68402 5.21625 9.59969 5.01285 9.59961 4.80078V2.73145L4.56543 7.76562C4.49166 7.84201 4.40323 7.90339 4.30566 7.94531C4.20815 7.9872 4.10319 8.00978 3.99707 8.01074C3.89085 8.01167 3.78484 7.9914 3.68652 7.95117C3.58828 7.91095 3.4989 7.85143 3.42383 7.77637C3.34877 7.70131 3.28925 7.6119 3.24902 7.51367C3.2088 7.41535 3.18853 7.30935 3.18945 7.20312C3.19041 7.09698 3.21299 6.99206 3.25488 6.89453C3.29678 6.79703 3.35729 6.70851 3.43359 6.63477L8.46875 1.60059H6.39941C6.18734 1.60052 5.98396 1.51617 5.83398 1.36621C5.68402 1.21625 5.59969 1.01285 5.59961 0.800781C5.59961 0.588608 5.68396 0.384404 5.83398 0.234375C5.98394 0.0845413 6.18743 6.23526e-05 6.39941 0H10.3994Z" fill="#111827" />
          </svg>
        </button>
      </div>

      <InputTabs form={form} />
      {shouldDisplayModelCard && <ModelCard model={model} onCloseArrowClick={emptyModelState} />}
      <ResultCard form={form} />
      <AdviceCard form={form} setModel={setModel} />
    </form>
  );
}

export { App };
