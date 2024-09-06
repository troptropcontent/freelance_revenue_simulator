import { useFormikContext } from "formik";
import { FormValues } from "src/App";
import { Accordion } from "src/components/ui/Accordion";
import { FreelanceDailyRate } from "src/components/simulator/activities/FreelanceDailyRate";
import { FreelanceOnDelivery } from "src/components/simulator/activities/FreelanceOnDelivery";
import { Consulting } from "src/components/simulator/activities/Consulting";
import { Sponsorship } from "src/components/simulator/activities/Sponsorship";
import { SideProject } from "src/components/simulator/activities/SideProject";
import { Training } from "src/components/simulator/activities/Training";
import { DigitalProduct } from "src/components/simulator/activities/DigitalProduct";
import { GeneralInfo } from "./GeneralInfo";
import { List } from "src/components/ui/List";
import { useTranslation } from "react-i18next";

const ActivitiesComponents: Record<keyof FormValues["activities"], React.FC> = {
  freelance_daily_rate: FreelanceDailyRate,
  freelance_on_delivery: FreelanceOnDelivery,
  consulting: Consulting,
  sponsorship: Sponsorship,
  side_project: SideProject,
  training: Training,
  digital_product: DigitalProduct,
};

const ActivitiesAccordion = () => {
  const {
    values: { activities },
  } = useFormikContext<FormValues>();

  const { t } = useTranslation();

  return (
    <Accordion.Root type="single" collapsible gap="md" grow>
      <GeneralInfo />
      <List.Root
        emptyState={{
          title: t("simulator.activities.empty_state.title"),
          description: t("simulator.activities.empty_state.description"),
        }}
        grow
      >
        {Object.entries(activities).map(([key, value]) => {
          if (typeof value === "object") {
            const ActivityComponent =
              ActivitiesComponents[key as keyof FormValues["activities"]];
            return (
              <List.Item key={key}>
                <ActivityComponent />
              </List.Item>
            );
          }
        })}
      </List.Root>
    </Accordion.Root>
  );
};

export { ActivitiesAccordion };
