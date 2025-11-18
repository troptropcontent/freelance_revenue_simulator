import { useForm } from "react-hook-form";
import { Button } from "./components/ui/Button";
import { InputTabs } from "./components/simulator/inputs/InputTabs";
import { Inputs } from "./components/simulator/inputs/types";
import {
  DEFAULT_NUMBER_OF_DAYS_OFF_PER_YEAR,
  DEFAULT_NUMBER_DAYS_WORKED_PER_WEEKS,
  DEFAULT_NUMBER_OF_HOURS_WORKED_PER_DAY,
} from "./components/simulator/inputs/constants";

function App() {
  const form = useForm<Inputs>({
    defaultValues: {
      activities: [
        {
          name: "Prestation freelance au jour",
          enabled: false,
          enjoyment_rate: 0,
          average_time_spent: 0,
          type: "mission",
          kind: "daily_rate",
          rate: 0,
        },
        {
          name: "Heures de conseil",
          enabled: false,
          enjoyment_rate: 0,
          average_time_spent: 0,
          type: "mission",
          kind: "hourly_rate",
          rate: 0,
          frequency: "monthly",
          quantity: 0,
        },
        {
          name: "Prestation freelance au forfait",
          enabled: false,
          enjoyment_rate: 0,
          average_time_spent: 0,
          type: "mission",
          kind: "flat_rate",
          frequency: "monthly",
          quantity: 0,
          rate: 0,
        },
      ],
      config: {
        number_of_days_off_per_year: DEFAULT_NUMBER_OF_DAYS_OFF_PER_YEAR,
        number_of_days_worked_per_week: DEFAULT_NUMBER_DAYS_WORKED_PER_WEEKS,
        number_of_hours_worked_per_day: DEFAULT_NUMBER_OF_HOURS_WORKED_PER_DAY,
      },
    },
  });
  return (
    <form className="container grid grid-cols-3 gap-x-6">
      <div>Simulateur SoloPortfolio</div>
      <div>
        <Button>Partager</Button>
      </div>

      <InputTabs form={form} />
      <div>Results</div>
    </form>
  );
}

export { App };
