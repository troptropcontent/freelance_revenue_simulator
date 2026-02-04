import { FieldPath, FieldPathValue, UseFormReturn } from "react-hook-form";
import { Inputs } from "../types";
import { FormInputs } from "src/components/ui/form/inputs";
import { twMerge } from "tailwind-merge";

function InputGroupWithRange<TFieldName extends FieldPath<Inputs>>({
  label,
  hint,
  inputName,
  form,
  rangeMin,
  rangeMax,
  step = 1,
  className,
}: {
  label: string;
  hint: string | ((currentValue: FieldPathValue<Inputs, TFieldName>) => string);
  inputName: TFieldName;
  form: UseFormReturn<Inputs>;
  rangeMin: number;
  rangeMax: number;
  step?: number;
  className?: string;
}) {
  const currentValue = form.watch(inputName);

  return (
    <div className={twMerge("flex flex-col gap-4", className)}>
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
