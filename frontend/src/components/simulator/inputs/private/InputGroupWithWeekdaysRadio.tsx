import { UseFormReturn } from "react-hook-form";
import { Inputs } from "../types";
import {
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THIRSTDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY,
} from "../constants";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

type Weekday = Inputs["config"]["weekdays_worked"][number];

function InputGroupWithWeekdaysPicker({
  form,
  className,
}: {
  form: UseFormReturn<Inputs>;
  className?: string;
}) {
  const { t } = useTranslation();
  const currentValue = form.watch("config.weekdays_worked") || [];

  const handleCheckboxChange = (weekDay: Weekday) => {
    const currentValues = form.getValues("config.weekdays_worked") || [];
    const newValues = currentValues.includes(weekDay)
      ? currentValues.filter((day) => day !== weekDay)
      : [...currentValues, weekDay];
    form.setValue("config.weekdays_worked", newValues);
  };

  return (
    <div className={twMerge("flex flex-col gap-4", className)}>
      <div className="flex justify-between">
        <label className="my-auto">
          {t("simulator.inputs.tabs.activities.inputs.weekdays_worked_label")}
        </label>
      </div>
      <div className="flex gap-4">
        {[MONDAY, TUESDAY, WEDNESDAY, THIRSTDAY, FRIDAY, SATURDAY, SUNDAY].map(
          (weekDay) => (
            <div key={weekDay}>
              <input
                type="checkbox"
                id={weekDay}
                checked={currentValue.includes(weekDay)}
                onChange={() => handleCheckboxChange(weekDay)}
                className="hidden peer"
              />
              <label
                htmlFor={weekDay}
                className="flex items-center justify-center w-12 h-12 bg-gray-100 border border-gray-200 peer-checked:bg-gray-500 peer-checked:border-gray-500 rounded-[9.6px] text-gray-900 peer-checked:text-white"
              >
                <p className="text-xl font-semibold">
                  {t(`common.weekdays.${weekDay}.label`)}
                </p>
              </label>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export { InputGroupWithWeekdaysPicker };
