import { UseFormReturn } from "react-hook-form";
import { Inputs } from "../inputs/types";
import { TrendingUp } from "lucide-react";
import { ReactNode, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  useAvailableDaysPerWeek,
  useAvailableTimePerWeek,
} from "./shared/hooks";
import { computeRangeWidthAndColor } from "./shared/utils";

function ResultCardDescription({ children }: { children: ReactNode }) {
  return <p className="text-base font-normal text-gray-500">{children}</p>;
}

function ResultCardCurrency({ value }: { value: number }) {
  const { t } = useTranslation();
  return (
    <p className="text-4xl font-bold">
      {" "}
      {t("common.currency.EUR_NO_DIGITS", { value })}
    </p>
  );
}

function EstimatedAnnualTurnover({ form }: { form: UseFormReturn<Inputs> }) {
  return (
    <div className="flex flex-col">
      <ResultCardDescription>
        Chiffre d’affaires annuel estimé
      </ResultCardDescription>
      <div>
        <ResultCardCurrency value={200000} />
      </div>
    </div>
  );
}

function EstimatedMonthlyNetIncome({ form }: { form: UseFormReturn<Inputs> }) {
  return (
    <div className="flex flex-col">
      <ResultCardDescription>Revenu net mensuel estimé</ResultCardDescription>
      <div>
        <ResultCardCurrency value={6000} />
      </div>
    </div>
  );
}

function AverageEnjoymentRate({ form }: { form: UseFormReturn<Inputs> }) {
  return (
    <div className="flex flex-col">
      <ResultCardDescription>Niveau de kiff moyen</ResultCardDescription>
      <div>
        <ResultCardCurrency value={6000} />
      </div>
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
          <AverageEnjoymentRate form={form} />
          <AvailableTimePerWeek form={form} />
        </div>
      </div>
    </div>
  );
}

export { ResultCard };
