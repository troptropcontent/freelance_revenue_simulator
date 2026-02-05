import { UseFieldArrayRemove, UseFormReturn } from "react-hook-form";
import { Inputs } from "../types";
import {
  Trash2,
  Save,
  Pencil,
  Clock,
  CalendarDays,
  Briefcase,
  HeartHandshake,
  FolderOpen,
} from "lucide-react";
import { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormInputs } from "src/components/ui/form/inputs";
import { twMerge } from "tailwind-merge";

const ActivityKindIcons = {
  hourly_rate: Clock,
  daily_rate: CalendarDays,
  flat_rate: FolderOpen,
  paid: Briefcase,
  free: HeartHandshake,
};

function ActivityName({
  activityIndex,
  form,
}: {
  activityIndex: number;
  form: UseFormReturn<Inputs>;
}) {
  const activity = form.watch(`activities.${activityIndex}`);
  const [isEditing, setIsEditing] = useState(false);
  const toggleIsEditing = () => setIsEditing(!isEditing);
  const ActivityIcon = ActivityKindIcons[activity.kind] ?? Briefcase;
  const EditIcon = isEditing ? Save : Pencil;
  return (
    <div className="flex-1 flex gap-3">
      <div className="flex flex-col justify-center">
        <ActivityIcon width={16} height={16} className="text-blue-500" />
      </div>
      <input
        type="text"
        className={`input ${isEditing ? "pointer-events-auto" : ""} ${isEditing ? "" : "text-black"}`}
        disabled={!isEditing}
        {...form.register(`activities.${activityIndex}.name`)}
      />
      <button
        type="button"
        onClick={toggleIsEditing}
        className="pointer-events-auto my-auto text-gray-400 hover:text-gray-600 transition-colors"
        aria-label={isEditing ? "Save activity name" : "Edit activity name"}
      >
        <EditIcon width={16} height={16} />
      </button>
    </div>
  );
}

function TypeSpecificInput({ children }: { children: ReactNode }) {
  return (
    <div className="py-2 px-4 flex justify-between bg-gray-50 rounded gap-6">
      {children}
    </div>
  );
}

function RateWithQuantityAndFrequencyInputGroup({
  activityIndex,
  form,
  rate_label,
  quantity_label,
  frequency_options,
}: {
  activityIndex: number;
  form: UseFormReturn<Inputs>;
  rate_label: string;
  quantity_label: string;
  frequency_options: React.ComponentProps<typeof FormInputs.Select>["options"];
}) {
  return (
    <div className="flex flex-1 gap-6 justify-between">
      <div className="flex gap-4">
        <label htmlFor="" className="flex-1 my-auto">
          {rate_label}
        </label>
        <FormInputs.Currency<Inputs>
          form={form}
          name={`activities.${activityIndex}.rate`}
          min={0}
          max={1000}
        />
      </div>
      <div className="flex gap-4">
        <label htmlFor="" className="flex-1 my-auto">
          {quantity_label}
        </label>
        <FormInputs.Number<Inputs>
          form={form}
          name={`activities.${activityIndex}.quantity`}
          min={0}
          max={100}
          className="w-[77px]"
        />
        <FormInputs.Select<Inputs>
          form={form}
          name={`activities.${activityIndex}.frequency`}
          options={frequency_options}
          className=" w-[120px]"
        />
      </div>
    </div>
  );
}

function ActivityInputTypeSpecificInputs({
  activityIndex,
  form,
}: {
  activityIndex: number;
  form: UseFormReturn<Inputs>;
}) {
  const { t } = useTranslation();
  const activity = form.watch(`activities.${activityIndex}`);

  switch (activity.kind) {
    case "daily_rate":
      return (
        <TypeSpecificInput>
          <label htmlFor="" className="flex-1 my-auto">
            {t("simulator.inputs.tabs.activities.inputs.daily_rate_rate_label")}
          </label>
          <FormInputs.Currency<Inputs>
            form={form}
            name={`activities.${activityIndex}.rate`}
            min={0}
            max={1000}
          />
        </TypeSpecificInput>
      );
    case "hourly_rate":
      return (
        <TypeSpecificInput>
          <RateWithQuantityAndFrequencyInputGroup
            activityIndex={activityIndex}
            form={form}
            rate_label={t(
              "simulator.inputs.tabs.activities.inputs.hourly_rate_rate_label",
            )}
            quantity_label={t(
              "simulator.inputs.tabs.activities.inputs.hourly_rate_quantity_label",
            )}
            frequency_options={[
              {
                value: "monthly",
                label: t(
                  "simulator.inputs.tabs.activities.inputs.frequency_select_monthly_label",
                ),
              },
            ]}
          />
        </TypeSpecificInput>
      );
    case "flat_rate":
      return (
        <TypeSpecificInput>
          <RateWithQuantityAndFrequencyInputGroup
            activityIndex={activityIndex}
            form={form}
            rate_label={t(
              "simulator.inputs.tabs.activities.inputs.flat_rate_rate_label",
            )}
            quantity_label={t(
              "simulator.inputs.tabs.activities.inputs.flat_rate_quantity_label",
            )}
            frequency_options={[
              {
                value: "monthly",
                label: t(
                  "simulator.inputs.tabs.activities.inputs.frequency_select_monthly_label",
                ),
              },
            ]}
          />
        </TypeSpecificInput>
      );
    case "paid":
      return (
        <TypeSpecificInput>
          <div className="flex gap-4">
            {" "}
            <label htmlFor="" className="flex-1 my-auto">
              {t(
                "simulator.inputs.tabs.activities.inputs.estimated_monthly_revenue_label",
              )}
            </label>
            <FormInputs.Currency<Inputs>
              form={form}
              name={`activities.${activityIndex}.estimated_monthly_revenue`}
              min={0}
              max={1000}
            />
          </div>
          <div className="flex gap-4">
            <label htmlFor="" className="flex-1 my-auto">
              {t(
                "simulator.inputs.tabs.activities.inputs.estimated_months_billed_label",
              )}
            </label>
            <FormInputs.Number<Inputs>
              form={form}
              name={`activities.${activityIndex}.estimated_months_billed`}
              min={0}
              max={12}
              className="w-[50px]"
            />
          </div>
        </TypeSpecificInput>
      );
    default:
      return null;
  }
}

function ActivityInputSelectType({
  activityIndex,
  form,
  options,
  selectClassName,
  iconClassName,
}: {
  activityIndex: number;
  form: UseFormReturn<Inputs>;
  options: Inputs["activities"][number]["kind"][];
  selectClassName: string;
  iconClassName: string;
}) {
  const { t } = useTranslation();
  const activity = form.watch(`activities.${activityIndex}`);
  const ActivityIcon = ActivityKindIcons[activity.kind];
  return (
    <div className="flex p-4">
      <label
        htmlFor={`activities.${activityIndex}.kind`}
        className="flex-1 my-auto"
      >
        {t(`simulator.inputs.tabs.${activity.type}.select_type_label`)}
      </label>
      <div className="relative">
        <select
          className={twMerge("select pl-10", selectClassName)}
          {...form.register(`activities.${activityIndex}.kind`)}
        >
          {options.map((option) => {
            const IconComponent = ActivityKindIcons[option];
            return (
              <option key={option} value={option}>
                <IconComponent
                  width={16}
                  height={16}
                  className={iconClassName}
                />
                {t(
                  `simulator.inputs.tabs.activities.${option}.select_type_option_label`,
                )}
              </option>
            );
          })}
        </select>
        <ActivityIcon
          width={16}
          height={16}
          className={twMerge(
            "absolute top-0 left-4 z-10 h-full my-auto",
            iconClassName,
          )}
        />
      </div>
    </div>
  );
}

function ActivityInputEnjoymentRate({
  activityIndex,
  form,
}: {
  activityIndex: number;
  form: UseFormReturn<Inputs>;
}) {
  const { t } = useTranslation();

  return (
    <div className="flex p-4">
      <label
        htmlFor={`activities.${activityIndex}.kind`}
        className="flex-1 my-auto"
      >
        {t("simulator.inputs.tabs.activities.inputs.enjoyment_rate_label")}
      </label>
      <FormInputs.Rating<Inputs>
        form={form}
        mask="heart"
        max={5}
        name={`activities.${activityIndex}.enjoyment_rate`}
      />
    </div>
  );
}

function ActivityInputAverageTimeSpent({
  activityIndex,
  form,
}: {
  activityIndex: number;
  form: UseFormReturn<Inputs>;
}) {
  const { t } = useTranslation();
  const inputName = `activities.${activityIndex}.average_time_spent` as const;
  const currentValue = form.watch(inputName);
  const numberOfDaysWorkedPerWeek = form.watch("config.weekdays_worked").length;

  return (
    <div className="flex p-4 flex-col gap-4">
      <div className="flex justify-between">
        <label htmlFor={inputName} className="my-auto">
          {t(
            "simulator.inputs.tabs.activities.inputs.average_time_spent_label",
          )}
        </label>
        <p className="text-sm font-bold text-gray-500 my-auto grow text-end">
          {t(
            "simulator.inputs.tabs.activities.inputs.average_time_spent_hint",
            {
              count: currentValue,
              max: numberOfDaysWorkedPerWeek,
            },
          )}
        </p>
      </div>
      <FormInputs.Range<Inputs>
        form={form}
        step={0.5}
        min={0}
        max={numberOfDaysWorkedPerWeek}
        name={inputName}
      />
    </div>
  );
}

function ActivityInput({
  activityWithInputIndex,
  removeActivity,
  form,
}: {
  activityWithInputIndex: Inputs["activities"][number] & { inputIndex: number };
  removeActivity: UseFieldArrayRemove;
  form: UseFormReturn<Inputs>;
}) {
  return (
    <div className={`collapse bg-white`}>
      <input
        id={`activities.${activityWithInputIndex.inputIndex}.collapse`}
        type="checkbox"
        className="hidden peer"
        checked={activityWithInputIndex.enabled}
        readOnly
      />
      <div className="collapse-title flex items-center gap-6 pointer-events-none pr-4">
        <FormInputs.Toggle<Inputs>
          form={form}
          name={`activities.${activityWithInputIndex.inputIndex}.enabled`}
          className="pointer-events-auto"
          ariaLabel="Toggle activity"
        />
        <ActivityName
          activityIndex={activityWithInputIndex.inputIndex}
          form={form}
        />
        <button
          type="button"
          onClick={() => removeActivity(activityWithInputIndex.inputIndex)}
          className="pointer-events-auto text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Delete activity"
        >
          <Trash2 width={16} height={16} />
        </button>
      </div>
      <div className="collapse-content">
        <ActivityInputSelectType
          form={form}
          activityIndex={activityWithInputIndex.inputIndex}
          options={
            activityWithInputIndex.type === "mission"
              ? ["daily_rate", "hourly_rate", "flat_rate"]
              : ["free", "paid"]
          }
          selectClassName={
            activityWithInputIndex.type === "mission"
              ? "w-[120px]"
              : "w-[168px]"
          }
          iconClassName={
            activityWithInputIndex.type === "mission"
              ? "text-blue-500"
              : "text-lime-600"
          }
        />
        <ActivityInputTypeSpecificInputs
          form={form}
          activityIndex={activityWithInputIndex.inputIndex}
        />
        <ActivityInputAverageTimeSpent
          form={form}
          activityIndex={activityWithInputIndex.inputIndex}
        />
        <ActivityInputEnjoymentRate
          form={form}
          activityIndex={activityWithInputIndex.inputIndex}
        />
      </div>
    </div>
  );
}

export { ActivityInput };
