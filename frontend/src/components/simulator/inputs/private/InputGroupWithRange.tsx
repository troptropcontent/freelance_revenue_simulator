import { FieldPath, FieldPathValue, UseFormReturn } from "react-hook-form";
import { Inputs } from "../types";
import { FormInputs } from "src/components/ui/form/inputs";

function InputGroupWithRange<TFieldName extends FieldPath<Inputs>>({
  label,
  hint,
  inputName,
  form,
  rangeMin,
  rangeMax,
  step = 1,
}: {
  label: string;
  hint: string | ((currentValue: FieldPathValue<Inputs, TFieldName>) => string);
  inputName: TFieldName;
  form: UseFormReturn<Inputs>;
  rangeMin: number;
  rangeMax: number;
  step?: number;
}) {
  const currentValue = form.watch(inputName);

  return (
    <div className="flex p-4 flex-col gap-4">
      <div className="flex justify-between">
        <label htmlFor={"prout"} className="my-auto">
          {label}
        </label>
        <p className="text-sm font-bold text-gray-500 my-auto grow text-end">
          {typeof hint === "string" ? hint : hint(currentValue)}
        </p>
      </div>
      <FormInputs.Range<Inputs>
        form={form}
        min={rangeMin}
        max={rangeMax}
        name={inputName}
        step={step}
      />
    </div>
  );
}

export { InputGroupWithRange };
