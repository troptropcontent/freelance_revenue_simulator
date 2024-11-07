import { Accordion } from "src/components/ui";
import { Box } from "src/components/ui/Box";
import { Tooltip } from "src/components/ui/Tooltip";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { Text } from "src/components/ui/Text";
import { Button } from "src/components/ui/Button";
import { useRef, useState } from "react";
import { useFormikContext } from "formik";
import { FormValues } from "src/App";

const EditableTitle = ({
  value,
  activityIndex,
}: {
  value: string;
  activityIndex: number;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const { setFieldValue } = useFormikContext();

  const updateNameFieldAndDisableEditMode = () => {
    if (inputRef.current != null) {
      setFieldValue(
        `activities[${activityIndex}].name`,
        inputRef.current.value,
      );
    }
    setEditMode(false);
  };

  if (editMode) {
    return (
      <>
        <input type="text" defaultValue={value} ref={inputRef} />
        <Button color="transparent" onClick={updateNameFieldAndDisableEditMode}>
          <SaveIcon color="inherit" fontSize="small" />
        </Button>
      </>
    );
  } else {
    return (
      <>
        <Text style="title_3">{value}</Text>
        <Button color="transparent" onClick={() => setEditMode(true)}>
          <EditIcon color="inherit" fontSize="small" />
        </Button>
      </>
    );
  }
};

const ActivityTitle = ({
  title,
  description,
  editable,
  deletable,
  index,
}: {
  title: string;
  description?: string;
  editable?: boolean;
  deletable?: boolean;
  index: number;
}) => {
  const { setFieldValue, values } = useFormikContext<FormValues>();
  const deleteActivity = () => {
    const updated_activities = values.activities;
    updated_activities.splice(index, 1);
    setFieldValue(`activities`, updated_activities);
  };

  return (
    <>
      {editable ? (
        <EditableTitle value={title} activityIndex={index} />
      ) : (
        <Text style="title_3">{title}</Text>
      )}
      {deletable && (
        <Button color="transparent" onClick={deleteActivity}>
          <DeleteIcon color="inherit" fontSize="small" />
        </Button>
      )}
      {description && (
        <Tooltip.Root>
          <Tooltip.Trigger>
            <HelpOutlineIcon color="disabled" fontSize="small" />
          </Tooltip.Trigger>
          <Tooltip.Content>{description}</Tooltip.Content>
        </Tooltip.Root>
      )}
    </>
  );
};

const BaseActivity = ({
  title,
  description,
  index,
  children,
  editable,
  deletable,
}: {
  title: string;
  description?: string;
  index: number;
  children: React.ReactNode;
  editable?: boolean;
  deletable?: boolean;
}) => {
  const { setFieldValue } = useFormikContext<FormValues>();

  const onAccordionItemStateChange = (newState: "open" | "closed") =>
    newState == "open"
      ? setFieldValue(`activities[${index}].enabled`, true)
      : setFieldValue(`activities[${index}].enabled`, false);

  const identifier = `activity_${index}`;
  return (
    <Accordion.Item
      // @ts-expect-error This works correctly
      title={
        <ActivityTitle
          title={title}
          description={description}
          editable={editable}
          deletable={deletable}
          index={index}
        />
      }
      value={identifier}
      key={identifier}
      onStateChange={onAccordionItemStateChange}
    >
      <Box flex flexDirection="column" padding={{ top: "md" }} gap="lg">
        {children}
      </Box>
    </Accordion.Item>
  );
};

export { BaseActivity };
