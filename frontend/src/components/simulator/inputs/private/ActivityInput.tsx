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
import { ReactElement, ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormInputs } from "src/components/ui/form/inputs";

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
  return <div className="py-2 px-4 flex bg-gray-50 rounded">{children}</div>;
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
          <p className="text-gray-600">
            {t("simulator.inputs.tabs.activities.inputs.paid_placeholder")}
          </p>
        </TypeSpecificInput>
      );
    case "free":
      return (
        <TypeSpecificInput>
          <p className="text-gray-600">
            {t("simulator.inputs.tabs.activities.inputs.free_placeholder")}
          </p>
        </TypeSpecificInput>
      );
  }
}

function ActivityInputSelectType({
  activityIndex,
  form,
  options,
}: {
  activityIndex: number;
  form: UseFormReturn<Inputs>;
  options: Inputs["activities"][number]["kind"][];
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
          className="select w-[120px] pl-10"
          {...form.register(`activities.${activityIndex}.kind`)}
        >
          {options.map((option) => {
            const IconComponent = ActivityKindIcons[option];
            return (
              <option key={option} value={option}>
                <IconComponent
                  width={16}
                  height={16}
                  className="text-blue-500"
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
          className="absolute text-blue-500 top-0 left-4 z-10 h-full my-auto"
        />
      </div>
    </div>
  );
}

function ActivityInput({
  form,
  activityIndex,
  remove,
}: {
  activityIndex: number;
  form: UseFormReturn<Inputs>;
  remove: UseFieldArrayRemove;
}) {
  const activity = form.watch(`activities.${activityIndex}`);

  return (
    <div className={`collapse bg-white`}>
      <input
        id={`activities.${activityIndex}.collapse`}
        type="checkbox"
        className="hidden peer"
        checked={activity.enabled}
        readOnly
      />
      <div className="collapse-title flex items-center gap-6 pointer-events-none pr-4">
        <input
          id={`activities.${activityIndex}.enabled`}
          type="checkbox"
          className="toggle toggle-sm pointer-events-auto"
          aria-label="Toggle activity"
          {...form.register(`activities.${activityIndex}.enabled`)}
        />
        <ActivityName activityIndex={activityIndex} form={form} />
        <button
          type="button"
          onClick={() => remove(activityIndex)}
          className="pointer-events-auto text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Delete activity"
        >
          <Trash2 width={16} height={16} />
        </button>
      </div>
      <div className="collapse-content">
        <ActivityInputSelectType
          form={form}
          activityIndex={activityIndex}
          options={["daily_rate", "hourly_rate", "flat_rate"]}
        />
        <ActivityInputTypeSpecificInputs
          form={form}
          activityIndex={activityIndex}
        />
      </div>
    </div>
  );
}

export { ActivityInput };
