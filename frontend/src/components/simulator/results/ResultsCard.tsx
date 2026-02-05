import { UseFormReturn } from "react-hook-form";
import { Inputs } from "../inputs/types";
import { TrendingUp } from "lucide-react";
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
  const { t } = useTranslation()
  return (
    <p className="text-4xl font-bold">{t("common.currency.EUR", { value })}</p>
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
          <Modal.Trigger className="rounded-full">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5918 0.936C7.2878 -0.312 5.5118 -0.312 5.2078 0.936C5.16241 1.12353 5.07339 1.2977 4.94798 1.44433C4.82256 1.59096 4.6643 1.7059 4.48608 1.77982C4.30785 1.85373 4.11468 1.88451 3.92231 1.86967C3.72993 1.85483 3.54378 1.79478 3.379 1.6944C2.2814 1.0256 1.0254 2.2816 1.6942 3.3792C2.1262 4.088 1.743 5.0128 0.9366 5.2088C-0.3122 5.512 -0.3122 7.2888 0.9366 7.5912C1.12418 7.63664 1.29838 7.72575 1.44501 7.85126C1.59164 7.97677 1.70655 8.13513 1.78039 8.31346C1.85423 8.49178 1.88491 8.68503 1.86994 8.87745C1.85496 9.06988 1.79474 9.25605 1.6942 9.4208C1.0254 10.5184 2.2814 11.7744 3.379 11.1056C3.54375 11.0051 3.72992 10.9448 3.92235 10.9299C4.11477 10.9149 4.30802 10.9456 4.48634 11.0194C4.66467 11.0932 4.82303 11.2082 4.94854 11.3548C5.07405 11.5014 5.16316 11.6756 5.2086 11.8632C5.5118 13.112 7.2886 13.112 7.591 11.8632C7.6366 11.6757 7.72579 11.5016 7.85132 11.3551C7.97686 11.2086 8.1352 11.0937 8.31347 11.0199C8.49174 10.9461 8.68491 10.9154 8.87729 10.9303C9.06966 10.9452 9.25581 11.0052 9.4206 11.1056C10.5182 11.7744 11.7742 10.5184 11.1054 9.4208C11.005 9.25601 10.945 9.06986 10.9301 8.87749C10.9152 8.68511 10.9459 8.49194 11.0197 8.31367C11.0935 8.1354 11.2084 7.97706 11.3549 7.85153C11.5014 7.72599 11.6755 7.6368 11.863 7.5912C13.1118 7.288 13.1118 5.5112 11.863 5.2088C11.6754 5.16336 11.5012 5.07425 11.3546 4.94874C11.208 4.82323 11.093 4.66487 11.0192 4.48654C10.9454 4.30822 10.9147 4.11497 10.9297 3.92255C10.9446 3.73012 11.0049 3.54395 11.1054 3.3792C11.7742 2.2816 10.5182 1.0256 9.4206 1.6944C9.25585 1.79494 9.06968 1.85516 8.87725 1.87014C8.68482 1.88511 8.49158 1.85443 8.31326 1.78059C8.13493 1.70675 7.97657 1.59184 7.85106 1.44521C7.72555 1.29858 7.63644 1.12438 7.591 0.9368L7.5918 0.936ZM6.3998 8.8C7.03632 8.8 7.64677 8.54714 8.09686 8.09706C8.54694 7.64697 8.7998 7.03652 8.7998 6.4C8.7998 5.76348 8.54694 5.15303 8.09686 4.70294C7.64677 4.25286 7.03632 4 6.3998 4C5.76328 4 5.15283 4.25286 4.70274 4.70294C4.25266 5.15303 3.9998 5.76348 3.9998 6.4C3.9998 7.03652 4.25266 7.64697 4.70274 8.09706C5.15283 8.54714 5.76328 8.8 6.3998 8.8Z" fill="#111827" />
            </svg>
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
    </div >
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
