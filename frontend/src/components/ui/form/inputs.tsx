import { EuroIcon } from "lucide-react";
import {
  Controller,
  FieldPath,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";

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
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

function Rating<T extends FieldValues>({
  form,
  name,
  max,
  mask,
}: {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  max: number;
  mask: "heart" | "star";
  className?: string;
}) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <div className="flex gap-6">
          <div className="rating gap-3">
            {Array.from(Array(max), (_, i) => {
              const ratingValue = i + 1;
              return (
                <input
                  type="radio"
                  key={`${name}-${i}`}
                  name={field.name}
                  value={ratingValue}
                  className={`mask bg-amber-300 ${mask == "heart" ? "mask-heart" : ""} ${mask == "star" ? "mask-star" : ""}`}
                  aria-label={`${ratingValue} ${mask}`}
                  checked={ratingValue === field.value}
                  onChange={() => field.onChange(ratingValue)}
                />
              );
            })}
          </div>
          <p className="text-sm font-bold text-gray-500 my-auto w-[31px] text-end">
            {Math.round(field.value)} / {max}
          </p>
        </div>
      )}
    />
  );
}

function Range<T extends FieldValues>({
  form,
  name,
  min,
  max,
  step = 1,
}: {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  max: number;
  min: number;
  step?: number;
}) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          {...field}
          value={field.value ?? min}
          onChange={(e) => field.onChange(parseFloat(e.target.value))}
          className="range w-full text-blue-400 [--range-bg:var(--color-gray-200)] [--range-thumb:white]"
        />
      )}
    />
  );
}

const FormInputs = { Currency, Number, Select, Rating, Range };

export { FormInputs };
