import { EuroIcon } from "lucide-react";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

function Currency<T extends FieldValues>({
  form,
  name,
  min,
  max,
}: {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  min: number;
  max: number;
}) {
  return (
    <label className="flex relative">
      <input
        type="number"
        className="input w-[120px]"
        min={min}
        max={max}
        {...form.register(name)}
      />
      <EuroIcon size={16} className="absolute right-5 top-0 h-full z-10 " />
    </label>
  );
}

function Number<T extends FieldValues>({
  form,
  name,
  min,
  max,
  className,
}: {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  min: number;
  max: number;
  className?: string;
}) {
  return (
    <input
      type="number"
      className={`input ${className ? className : ""}`}
      min={min}
      max={max}
      {...form.register(name)}
    />
  );
}

function Select<T extends FieldValues>({
  form,
  name,
  options,
  className,
}: {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  options: { value: string; label: string }[];
  className?: string;
}) {
  return (
    <select
      className={`select ${className ? className : ""}`}
      {...form.register(name)}
    >
      {options.map((option) => (
        <option value={option.value}>{option.label}</option>
      ))}
    </select>
  );
}

const FormInputs = { Currency, Number, Select };

export { FormInputs };
