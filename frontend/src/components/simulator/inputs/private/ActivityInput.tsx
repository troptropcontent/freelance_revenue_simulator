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
import { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";

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
  const ActivityIcon = ActivityKindIcons[activity.kind];
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
      <EditIcon
        width={16}
        height={16}
        onClick={toggleIsEditing}
        className="pointer-events-auto my-auto text-gray-400"
      />
    </div>
  );
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
  return (
    <div className="flex">
      <label
        htmlFor={`activities.${activityIndex}.kind`}
        className="flex-1 my-auto"
      >
        {t(`simulator.inputs.tabs.${activity.type}.select_type_label`)}
      </label>
      <select
        className="select"
        {...form.register(`activities.${activityIndex}.kind`)}
      >
        {options.map((option) => (
          <option value={option}>
            {t(
              `simulator.inputs.tabs.activities.${option}.select_type_option_label`,
            )}
          </option>
        ))}
      </select>
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
    <div className={`collapse bg-base-200`}>
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
          {...form.register(`activities.${activityIndex}.enabled`)}
        />
        <ActivityName activityIndex={activityIndex} form={form} />
        <Trash2
          width={16}
          height={16}
          className="pointer-events-auto text-gray-400"
          onClick={() => remove(activityIndex)}
        />
      </div>
      <div className="collapse-content">
        <ActivityInputSelectType
          form={form}
          activityIndex={activityIndex}
          options={["daily_rate", "hourly_rate", "flat_rate"]}
        />
      </div>
    </div>
  );
}

export { ActivityInput };
