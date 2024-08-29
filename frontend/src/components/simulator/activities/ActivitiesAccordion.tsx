import { useFormikContext } from "formik";
import { FormValues } from "src/App";
import { Accordion } from "src/components/ui/Accordion";
import { Box } from "src/components/ui/Box";
import { Text } from "src/components/ui/Text";

const ActivitiesTranslations: Record<keyof FormValues, string> = {
  freelance_daily_rate: "Mission freelance facturée au TJM",
  freelance_on_delivery: "Mission freelance facturée au livrable",
  consulting: "Consulting",
  sponsorship: "Media & Sponsoring",
  side_project: "Side business",
  training: "Formation",
  digital_product: "Produits digitaux",
  admin: "Gestion",
};

const ActivitiesAccordion = () => {
  const { values } = useFormikContext<FormValues>();

  return (
    <Accordion.Root type="single" collapsible gap="md">
      {Object.entries(values).map(([key, value]) => {
        if (typeof value === "object") {
          return (
            <Accordion.Item
              title={ActivitiesTranslations[key as keyof FormValues]}
              value={key}
              key={key}
            >
              <Box padding="md">
                <Text>
                  Input pour '{ActivitiesTranslations[key as keyof FormValues]}'
                </Text>
              </Box>
            </Accordion.Item>
          );
        }
      })}
    </Accordion.Root>
  );
};

export { ActivitiesAccordion };
