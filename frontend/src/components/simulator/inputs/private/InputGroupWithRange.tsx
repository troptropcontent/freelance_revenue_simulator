import { FieldPath, FieldPathValue, UseFormReturn, Controller } from "react-hook-form";
import { Inputs } from "../types";
import { FormInputs } from "src/components/ui/form/inputs";
import { twMerge } from "tailwind-merge";

function InputGroupWithRange<TFieldName extends FieldPath<Inputs>>({
  label,
  hint,
  unit,
  inputName,
  form,
  rangeMin,
  rangeMax,
  step = 1,
  className,
}: {
  label: string;
  hint?: string | ((currentValue: FieldPathValue<Inputs, TFieldName>) => string);
  unit?: string;
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
        <label className="my-auto">
          {label}
        </label>
        {hint != null ? (
          <p className="text-sm font-bold text-gray-500 my-auto grow text-end">
            {typeof hint === "string" ? hint : hint(currentValue)}
          </p>
        ) : unit != null ? (
          <Controller
            name={inputName}
            control={form.control}
            render={({ field }) => (
              <label className="flex relative">
                <input
                  type="number"
                  min={rangeMin}
                  max={rangeMax}
                  step={step}
                  value={Number(field.value)}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  className="input w-[120px]"
                />
                <span className="absolute right-5 top-0 h-full flex items-center text-sm text-gray-400 pointer-events-none z-10">
                  {unit}
                </span>
              </label>
            )}
          />
        ) : null}
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
