import { useFormikContext } from "formik";
import { FormValues } from "src/App";
import { Button } from "src/components/ui/Button";
import { Dialog } from "src/components/ui/Dialog";
import { List } from "src/components/ui/List";
import { Activities } from "../constants";
import { Text } from "src/components/ui/Text";
import { Box } from "src/components/ui/Box";
import { PlusIcon } from "@radix-ui/react-icons";

const ActivitiesModal = () => {
  const { values, setFieldValue } = useFormikContext<FormValues>();
  const availableActivities = Object.entries(values).reduce(
    (acc, [key, value]) => {
      if (value === undefined) {
        acc.push(key as keyof FormValues);
      }
      return acc;
    },
    [] as (keyof FormValues)[],
  );
  console.log({ availableActivities });
  return (
    <Dialog
      title="Ajouter une activité"
      description="Ajouter une activité à la liste de vos activités pour determiner avec précision vos résultats annuels."
      trigger={<Button>Ajouter une activité</Button>}
    >
      {({ setOpen }) => (
        <List.Root gap="md" padding={{ top: "md" }}>
          {availableActivities.map((key) => (
            <List.Item
              key={key}
              onClick={() => {
                setFieldValue(
                  key,
                  Activities[key as keyof typeof Activities].defaultValue,
                );
                setOpen(false);
              }}
              flex
              flexDirection="row"
              justifyContent="space-between"
            >
              <Box as="span">
                <Text>{Activities[key as keyof typeof Activities].label}</Text>
                <Text size="xs" color="muted.medium">
                  {Activities[key as keyof typeof Activities].description}
                </Text>
              </Box>
              <Button color="grey">
                <PlusIcon />
              </Button>
            </List.Item>
          ))}
        </List.Root>
      )}
    </Dialog>
  );
};

export { ActivitiesModal };
