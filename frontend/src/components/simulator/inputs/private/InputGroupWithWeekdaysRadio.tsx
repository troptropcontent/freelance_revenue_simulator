import { FieldPath, FieldPathValue, UseFormReturn } from "react-hook-form";
import { Inputs } from "../types";
import { FormInputs } from "src/components/ui/form/inputs";
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

type Weekday = Inputs["config"]["weekdays_worked"][number];

function InputGroupWithWeekdaysPicker({
  form,
}: {
  form: UseFormReturn<Inputs>;
}) {
  const { t } = useTranslation();
  const currentValue = form.watch("config.weekdays_worked") || [];
  console.log({ currentValue });

  const handleCheckboxChange = (weekDay: Weekday) => {
    const currentValues = form.getValues("config.weekdays_worked") || [];
    const newValues = currentValues.includes(weekDay)
      ? currentValues.filter((day) => day !== weekDay)
      : [...currentValues, weekDay];
    form.setValue("config.weekdays_worked", newValues);
  };

  return (
    <div className="flex p-4 flex-col gap-4">
      <div className="flex justify-between">
        <label className="my-auto">Coucou</label>
      </div>
      <div className="gap-4">
        {[MONDAY, TUESDAY, WEDNESDAY, THIRSTDAY, FRIDAY, SATURDAY, SUNDAY].map(
          (weekDay) => (
            <div key={weekDay}>
              <input
                type="checkbox"
                id={weekDay}
                checked={currentValue.includes(weekDay)}
                onChange={() => handleCheckboxChange(weekDay)}
              />
              <label htmlFor={weekDay}>
                {t(`common.weekdays.${weekDay}.label`)}
              </label>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export { InputGroupWithWeekdaysPicker };
