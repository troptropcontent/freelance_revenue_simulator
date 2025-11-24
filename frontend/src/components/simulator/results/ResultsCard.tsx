import { UseFormReturn } from "react-hook-form";
import { Inputs } from "../inputs/types";
import { Settings, TrendingUp } from "lucide-react";
import { ReactNode, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  useAvailableDaysPerWeek,
  useAverageEnjoymentRate,
  useEstimatedGrossAnnualRevenue,
  useEstimatedNetMonthlyIncome,
} from "./shared/hooks";
import { computeRangeWidthAndColor } from "./shared/utils";
import { Modal } from "src/components/ui/Modal";
import { InputGroupWithRange } from "../inputs/private/InputGroupWithRange";
import { InputGroupWithWeekdaysPicker } from "../inputs/private/InputGroupWithWeekdaysRadio";
import { AnimatedNumber } from "./private/AnimatedNumber";

function ResultCardDescription({ children }: { children: ReactNode }) {
  return <p className="text-base font-normal text-gray-500">{children}</p>;
}

function ResultCardCurrency({ value }: { value: number }) {
  return (
    <AnimatedNumber value={value} className="text-4xl font-bold" unit="€" />
  );
}

function EstimatedAnnualTurnover({ form }: { form: UseFormReturn<Inputs> }) {
  const estimatedGrossAnnualRevenue = useEstimatedGrossAnnualRevenue(form);
  return (
    <div className="flex flex-col">
      <ResultCardDescription>
        Chiffre d’affaires annuel estimé
      </ResultCardDescription>
      <div>
        <ResultCardCurrency value={estimatedGrossAnnualRevenue} />
      </div>
    </div>
  );
}

function EstimatedMonthlyNetIncome({ form }: { form: UseFormReturn<Inputs> }) {
  const { t } = useTranslation();
  const estimatedNetMonthlyIncome = useEstimatedNetMonthlyIncome(form);
  return (
    <div className="flex flex-col">
      <ResultCardDescription>Revenu net mensuel estimé</ResultCardDescription>
      <div className="flex items-center gap-4">
        <ResultCardCurrency value={estimatedNetMonthlyIncome} />
        <Modal.Root>
          <Modal.Trigger className="btn-circle btn-sm">
            <Settings size={16} />
          </Modal.Trigger>
          <Modal.Content>
            {(closeModal) => (
              <div className="flex flex-col">
                <p className="text-2xl font-bold text-center">
                  {t(`simulator.inputs.tabs.activities.settings_modal.title`)}
                </p>
                <InputGroupWithRange
                  form={form}
                  hint={(currentValue) =>
                    t("common.value_with_unit.number_of_days", {
                      count: currentValue,
                    })
                  }
                  inputName={"config.number_of_days_spent_on_admin_tasks"}
                  label={t(
                    `simulator.inputs.tabs.activities.inputs.number_of_days_spent_on_admin_tasks_label`,
                  )}
                  rangeMin={0}
                  rangeMax={5}
                  step={0.5}
                  className="mt-8"
                />
                <InputGroupWithRange
                  form={form}
                  hint={(currentValue) =>
                    t("common.value_with_unit.number_of_weeks", {
                      count: currentValue,
                    })
                  }
                  inputName={"config.number_of_weeks_off_per_year"}
                  label={t(
                    `simulator.inputs.tabs.activities.inputs.number_of_weeks_off_per_year_label`,
                  )}
                  rangeMin={0}
                  rangeMax={10}
                  step={0.5}
                  className="mt-6"
                />
                <InputGroupWithWeekdaysPicker form={form} className="mt-8" />
                <button
                  type="button"
                  className="btn btn-primary mt-8"
                  onClick={closeModal}
                >
                  {t(
                    "simulator.inputs.tabs.activities.settings_modal.validate",
                  )}
                </button>
              </div>
            )}
          </Modal.Content>
        </Modal.Root>
      </div>
    </div>
  );
}

function RatingDisplay({
  value,
  max,
  mask,
}: {
  value: number;
  max: number;
  mask: "heart" | "star";
}) {
  return (
    <div className="flex gap-6">
      <div className="rating gap-3">
        {Array.from(Array(max), (_, i) => {
          return (
            <div
              key={i}
              className={`mask bg-amber-300 ${mask === "heart" ? "mask-heart" : "mask-star"}`}
              aria-label={`${i + 1} ${mask}`}
              aria-current={Math.round(value) === i + 1}
            />
          );
        })}
      </div>
      <p className="text-sm font-bold text-gray-500 my-auto w-[31px] text-end">
        {Math.round(value)} / {max}
      </p>
    </div>
  );
}

function AverageEnjoymentRate({ form }: { form: UseFormReturn<Inputs> }) {
  const averageEnjoymentRate = useAverageEnjoymentRate(form);

  return (
    <div className="flex flex-col gap-3">
      <ResultCardDescription>Niveau de kiff moyen</ResultCardDescription>
      <RatingDisplay value={averageEnjoymentRate} max={5} mask="heart" />
    </div>
  );
}

function AvailableTimePerWeek({ form }: { form: UseFormReturn<Inputs> }) {
  const { t } = useTranslation();
  const availableDaysPerWeek = useAvailableDaysPerWeek(form);
  const daysWorkedPerWeek = form.watch("config.weekdays_worked").length;

  const { rangeWidth, barColor } = useMemo(
    () => computeRangeWidthAndColor(availableDaysPerWeek, daysWorkedPerWeek),
    [availableDaysPerWeek, daysWorkedPerWeek],
  );

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <ResultCardDescription>
          Temps disponible par semaine
        </ResultCardDescription>
        <p className="text-sm font-bold text-gray-500">
          {t(
            "simulator.inputs.tabs.activities.inputs.average_time_spent_hint",
            {
              count: Math.max(0, availableDaysPerWeek),
              max: daysWorkedPerWeek,
            },
          )}
        </p>
      </div>
      <div
        className={`h-2 ${barColor} rounded-sm mt-4`}
        style={{
          width: `${rangeWidth}%`,
        }}
      ></div>
    </div>
  );
}

function ResultCard({ form }: { form: UseFormReturn<Inputs> }) {
  return (
    <div>
      <div className="card p-8">
        <div className="flex flex-col gap-6">
          <div className="flex gap-4 items-center">
            <TrendingUp size="24" />
            <p className="text-2xl font-semibold">Simulation</p>
          </div>

          <EstimatedAnnualTurnover form={form} />
          <EstimatedMonthlyNetIncome form={form} />
          <AvailableTimePerWeek form={form} />
          <AverageEnjoymentRate form={form} />
        </div>
      </div>
    </div>
  );
}

export { ResultCard };
