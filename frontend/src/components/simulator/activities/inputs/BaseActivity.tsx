import { Accordion } from "src/components/ui";
import { Box } from "src/components/ui/Box";
import { Tooltip } from "src/components/ui/Tooltip";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Text } from "src/components/ui/Text";
import { Button } from "src/components/ui/Button";
import { useFormik, useFormikContext } from "formik";
import { FormValues } from "src/App";
import { useRef, useState } from "react";

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
        `activities[${activityIndex}].values.name`,
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
        <Text>{value}</Text>
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
  index,
}: {
  title: string;
  description?: string;
  editable?: boolean;
  index: number;
}) => {
  return (
    <>
      {editable ? (
        <EditableTitle value={title} activityIndex={index} />
      ) : (
        <Text>{title}</Text>
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
}: {
  title: string;
  description?: string;
  index: number;
  children: React.ReactNode;
  editable?: boolean;
}) => {
  return (
    <Accordion.Item
      title={
        <ActivityTitle
          title={title}
          description={description}
          editable={editable}
          index={index}
        />
      }
      value={`activity_${index}`}
      key={`activity_${index}`}
    >
      <Box flex flexDirection="column" padding={{ top: "md" }} gap="lg">
        {children}
      </Box>
    </Accordion.Item>
  );
};

export { BaseActivity };
