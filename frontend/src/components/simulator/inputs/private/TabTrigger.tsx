import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

function TabTrigger({
  stepNumber,
  name,
  badgeNumber,
  badgeClassName,
}: {
  stepNumber: number;
  name: string;
  badgeNumber: number;
  badgeClassName: string;
}) {
  const { t } = useTranslation();
  return (
    <span className="flex gap-4 items-center">
      <b>{t("simulator.inputs.tabs.shared.step", { stepNumber })}</b>
      <p>{name}</p>
      <div className={twMerge("badge badge-xs", badgeClassName)}>
        {badgeNumber}
      </div>
    </span>
  );
}

export { TabTrigger };
