import { UseFieldArrayRemove, UseFormReturn } from "react-hook-form";
import { Inputs } from "../types";
import {
  Trash2,
  Save,
  Pencil,
  Briefcase,
} from "lucide-react";
import { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormInputs } from "src/components/ui/form/inputs";
import { twMerge } from "tailwind-merge";

const ActivityKindIcons = {
  hourly_rate: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M0 6.66667C0 2.98467 2.98467 0 6.66667 0C10.3487 0 13.3333 2.98467 13.3333 6.66667C13.3333 10.3487 10.3487 13.3333 6.66667 13.3333C2.98467 13.3333 0 10.3487 0 6.66667ZM7.33333 4C7.33333 3.82319 7.26309 3.65362 7.13807 3.5286C7.01305 3.40357 6.84348 3.33333 6.66667 3.33333C6.48986 3.33333 6.32029 3.40357 6.19526 3.5286C6.07024 3.65362 6 3.82319 6 4V6.66667C6.00004 6.84346 6.0703 7.013 6.19533 7.138L8.19533 9.138C8.32107 9.25944 8.48947 9.32663 8.66427 9.32512C8.83906 9.3236 9.00627 9.25348 9.12988 9.12988C9.25348 9.00627 9.3236 8.83906 9.32512 8.66427C9.32663 8.48947 9.25944 8.32107 9.138 8.19533L7.33333 6.39067V4Z" fill="#3B82F6" />
  </svg>
  ,
  daily_rate: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M1.48148 1.48148C1.67794 1.48148 1.86635 1.40344 2.00526 1.26452C2.14418 1.12561 2.22222 0.937197 2.22222 0.740741C2.22222 0.544284 2.30026 0.355874 2.43918 0.216958C2.5781 0.0780421 2.76651 0 2.96296 0C3.15942 0 3.34783 0.0780421 3.48675 0.216958C3.62566 0.355874 3.7037 0.544284 3.7037 0.740741C3.7037 0.937197 3.78175 1.12561 3.92066 1.26452C4.05958 1.40344 4.24799 1.48148 4.44444 1.48148H5.18519C5.38164 1.48148 5.57005 1.40344 5.70897 1.26452C5.84788 1.12561 5.92593 0.937197 5.92593 0.740741C5.92593 0.544284 6.00397 0.355874 6.14288 0.216958C6.2818 0.0780421 6.47021 0 6.66667 0C6.86312 0 7.05153 0.0780421 7.19045 0.216958C7.32937 0.355874 7.40741 0.544284 7.40741 0.740741C7.40741 0.937197 7.48545 1.12561 7.62437 1.26452C7.76328 1.40344 7.95169 1.48148 8.14815 1.48148H8.88889C9.08535 1.48148 9.27376 1.40344 9.41267 1.26452C9.55159 1.12561 9.62963 0.937197 9.62963 0.740741C9.62963 0.544284 9.70767 0.355874 9.84659 0.216958C9.9855 0.0780421 10.1739 0 10.3704 0C10.5668 0 10.7552 0.0780421 10.8942 0.216958C11.0331 0.355874 11.1111 0.544284 11.1111 0.740741C11.1111 0.937197 11.1892 1.12561 11.3281 1.26452C11.467 1.40344 11.6554 1.48148 11.8519 1.48148C12.2448 1.48148 12.6216 1.63757 12.8994 1.9154C13.1772 2.19323 13.3333 2.57005 13.3333 2.96296V3.7037C13.3333 3.90016 13.2553 4.08857 13.1164 4.22749C12.9775 4.3664 12.7891 4.44444 12.5926 4.44444H0.740741C0.544284 4.44444 0.355874 4.3664 0.216958 4.22749C0.0780421 4.08857 0 3.90016 0 3.7037V2.96296C0 2.57005 0.156084 2.19323 0.433916 1.9154C0.711748 1.63757 1.08857 1.48148 1.48148 1.48148ZM0 11.8519V6.66667C0 6.47021 0.0780421 6.2818 0.216958 6.14288C0.355874 6.00397 0.544284 5.92593 0.740741 5.92593H12.5926C12.7891 5.92593 12.9775 6.00397 13.1164 6.14288C13.2553 6.2818 13.3333 6.47021 13.3333 6.66667V11.8519C13.3333 12.2448 13.1772 12.6216 12.8994 12.8994C12.6216 13.1772 12.2448 13.3333 11.8519 13.3333H1.48148C1.08857 13.3333 0.711748 13.1772 0.433916 12.8994C0.156084 12.6216 0 12.2448 0 11.8519ZM4.45185 7.40741C4.45185 7.21095 4.37381 7.02254 4.23489 6.88363C4.09598 6.74471 3.90757 6.66667 3.71111 6.66667C3.51465 6.66667 3.32624 6.74471 3.18733 6.88363C3.04841 7.02254 2.97037 7.21095 2.97037 7.40741C2.97037 7.60386 3.04841 7.79227 3.18733 7.93119C3.32624 8.07011 3.51465 8.14815 3.71111 8.14815C3.90757 8.14815 4.09598 8.07011 4.23489 7.93119C4.37381 7.79227 4.45185 7.60386 4.45185 7.40741ZM5.93333 7.40741C5.93333 7.21095 6.01138 7.02254 6.15029 6.88363C6.28921 6.74471 6.47762 6.66667 6.67407 6.66667C6.87053 6.66667 7.05894 6.74471 7.19786 6.88363C7.33677 7.02254 7.41482 7.21095 7.41482 7.40741C7.41482 7.60386 7.33677 7.79227 7.19786 7.93119C7.05894 8.07011 6.87053 8.14815 6.67407 8.14815C6.47762 8.14815 6.28921 8.07011 6.15029 7.93119C6.01138 7.79227 5.93333 7.60386 5.93333 7.40741ZM10.3778 7.40741C10.3778 7.21095 10.2997 7.02254 10.1608 6.88363C10.0219 6.74471 9.83349 6.66667 9.63704 6.66667C9.44058 6.66667 9.25217 6.74471 9.11325 6.88363C8.97434 7.02254 8.8963 7.21095 8.8963 7.40741C8.8963 7.60386 8.97434 7.79227 9.11325 7.93119C9.25217 8.07011 9.44058 8.14815 9.63704 8.14815C9.83349 8.14815 10.0219 8.07011 10.1608 7.93119C10.2997 7.79227 10.3778 7.60386 10.3778 7.40741ZM2.97037 10.3704C2.97037 10.1739 3.04841 9.9855 3.18733 9.84659C3.32624 9.70767 3.51465 9.62963 3.71111 9.62963C3.90757 9.62963 4.09598 9.70767 4.23489 9.84659C4.37381 9.9855 4.45185 10.1739 4.45185 10.3704C4.45185 10.5668 4.37381 10.7552 4.23489 10.8942C4.09598 11.0331 3.90757 11.1111 3.71111 11.1111C3.51465 11.1111 3.32624 11.0331 3.18733 10.8942C3.04841 10.7552 2.97037 10.5668 2.97037 10.3704ZM7.41482 10.3704C7.41482 10.1739 7.33677 9.9855 7.19786 9.84659C7.05894 9.70767 6.87053 9.62963 6.67407 9.62963C6.47762 9.62963 6.28921 9.70767 6.15029 9.84659C6.01138 9.9855 5.93333 10.1739 5.93333 10.3704C5.93333 10.5668 6.01138 10.7552 6.15029 10.8942C6.28921 11.0331 6.47762 11.1111 6.67407 11.1111C6.87053 11.1111 7.05894 11.0331 7.19786 10.8942C7.33677 10.7552 7.41482 10.5668 7.41482 10.3704ZM8.8963 10.3704C8.8963 10.1739 8.97434 9.9855 9.11325 9.84659C9.25217 9.70767 9.44058 9.62963 9.63704 9.62963C9.83349 9.62963 10.0219 9.70767 10.1608 9.84659C10.2997 9.9855 10.3778 10.1739 10.3778 10.3704C10.3778 10.5668 10.2997 10.7552 10.1608 10.8942C10.0219 11.0331 9.83349 11.1111 9.63704 11.1111C9.44058 11.1111 9.25217 11.0331 9.11325 10.8942C8.97434 10.7552 8.8963 10.5668 8.8963 10.3704Z" fill="#3B82F6" />
  </svg>
  ,
  flat_rate: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M1.54386 0C1.1344 0 0.741717 0.158035 0.452187 0.43934C0.162657 0.720644 1.2354e-06 1.10218 1.2354e-06 1.5V10.5C-0.000192674 10.6489 0.0224415 10.7971 0.067159 10.9395L2.36519 4.98675C2.42034 4.84382 2.51906 4.72064 2.64816 4.63366C2.77727 4.54669 2.93061 4.50006 3.08772 4.5H12.3509V3.75C12.3509 3.35218 12.1882 2.97064 11.8987 2.68934C11.6092 2.40804 11.2165 2.25 10.807 2.25H7.30863L5.84197 0.54C5.69714 0.371065 5.51586 0.235128 5.31097 0.141812C5.10607 0.0484955 4.88257 8.24403e-05 4.65628 0H1.54386ZM3.62267 6H3.47368L1.1579 12H12.3509L14.6667 6H3.62267Z" fill="#3B82F6" />
  </svg>
  ,
  paid: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M3.33325 1.33333C3.33325 0.979711 3.47373 0.640573 3.72378 0.390524C3.97382 0.140476 4.31296 0 4.66659 0H11.9999C12.3535 0 12.6927 0.140476 12.9427 0.390524C13.1928 0.640573 13.3333 0.979711 13.3333 1.33333V6C13.3333 6.35362 13.1928 6.69276 12.9427 6.94281C12.6927 7.19286 12.3535 7.33333 11.9999 7.33333H10.6666V4.66667C10.6666 4.13623 10.4559 3.62753 10.0808 3.25245C9.70573 2.87738 9.19702 2.66667 8.66659 2.66667H3.33325V1.33333Z" fill="#65A30D" />
    <path fillRule="evenodd" clipRule="evenodd" d="M0 4.66659C0 4.31296 0.140476 3.97383 0.390524 3.72378C0.640573 3.47373 0.979711 3.33325 1.33333 3.33325H8.66667C9.02029 3.33325 9.35943 3.47373 9.60948 3.72378C9.85952 3.97383 10 4.31296 10 4.66659V9.33325C10 9.68687 9.85952 10.026 9.60948 10.2761C9.35943 10.5261 9.02029 10.6666 8.66667 10.6666H1.33333C0.979711 10.6666 0.640573 10.5261 0.390524 10.2761C0.140476 10.026 0 9.68687 0 9.33325V4.66659ZM5 5.33325C4.55797 5.33325 4.13405 5.50885 3.82149 5.82141C3.50893 6.13397 3.33333 6.55789 3.33333 6.99992C3.33333 7.44195 3.50893 7.86587 3.82149 8.17843C4.13405 8.49099 4.55797 8.66659 5 8.66659C5.44203 8.66659 5.86595 8.49099 6.17851 8.17843C6.49107 7.86587 6.66667 7.44195 6.66667 6.99992C6.66667 6.55789 6.49107 6.13397 6.17851 5.82141C5.86595 5.50885 5.44203 5.33325 5 5.33325Z" fill="#65A30D" />
    <path d="M5.66659 6.99992C5.66659 7.17673 5.59635 7.3463 5.47132 7.47132C5.3463 7.59635 5.17673 7.66659 4.99992 7.66659C4.82311 7.66659 4.65354 7.59635 4.52851 7.47132C4.40349 7.3463 4.33325 7.17673 4.33325 6.99992C4.33325 6.82311 4.40349 6.65354 4.52851 6.52851C4.65354 6.40349 4.82311 6.33325 4.99992 6.33325C5.17673 6.33325 5.3463 6.40349 5.47132 6.52851C5.59635 6.65354 5.66659 6.82311 5.66659 6.99992Z" fill="#65A30D" />
  </svg>
  ,
  free: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M0 6.66667C0 2.98467 2.98467 0 6.66667 0C10.3487 0 13.3333 2.98467 13.3333 6.66667C13.3333 10.3487 10.3487 13.3333 6.66667 13.3333C2.98467 13.3333 0 10.3487 0 6.66667ZM3.66333 7.28667C3.65144 7.20321 3.60838 7.12737 3.5428 7.07439C3.47723 7.02142 3.39403 6.99526 3.30994 7.00118C3.22585 7.00709 3.14713 7.04465 3.08962 7.10628C3.03211 7.16791 3.00009 7.24904 3 7.33333C3 8.12667 3.42933 8.95867 4.07867 9.58333C4.73267 10.2127 5.646 10.6667 6.66667 10.6667C7.68733 10.6667 8.6 10.2127 9.25467 9.58333C9.904 8.95867 10.3333 8.12733 10.3333 7.33333C10.3332 7.24904 10.3012 7.16791 10.2437 7.10628C10.1862 7.04465 10.1075 7.00709 10.0234 7.00118C9.93931 6.99526 9.8561 7.02142 9.79053 7.07439C9.72496 7.12737 9.68189 7.20321 9.67 7.28667C9.6379 7.31191 9.603 7.33339 9.566 7.35067C9.42333 7.42133 9.19667 7.48933 8.89533 7.54733C8.298 7.66267 7.488 7.722 6.66667 7.722C5.84533 7.722 5.03533 7.662 4.438 7.54733C4.13667 7.48933 3.91 7.42067 3.768 7.35067C3.73077 7.33343 3.69564 7.31195 3.66333 7.28667ZM4.66 4C4.48319 4 4.31362 4.07024 4.1886 4.19526C4.06357 4.32029 3.99333 4.48986 3.99333 4.66667C3.99333 4.84348 4.06357 5.01305 4.1886 5.13807C4.31362 5.26309 4.48319 5.33333 4.66 5.33333H4.66667C4.84348 5.33333 5.01305 5.26309 5.13807 5.13807C5.26309 5.01305 5.33333 4.84348 5.33333 4.66667C5.33333 4.48986 5.26309 4.32029 5.13807 4.19526C5.01305 4.07024 4.84348 4 4.66667 4H4.66ZM8.66 4C8.48319 4 8.31362 4.07024 8.18859 4.19526C8.06357 4.32029 7.99333 4.48986 7.99333 4.66667C7.99333 4.84348 8.06357 5.01305 8.18859 5.13807C8.31362 5.26309 8.48319 5.33333 8.66 5.33333H8.66667C8.84348 5.33333 9.01305 5.26309 9.13807 5.13807C9.26309 5.01305 9.33333 4.84348 9.33333 4.66667C9.33333 4.48986 9.26309 4.32029 9.13807 4.19526C9.01305 4.07024 8.84348 4 8.66667 4H8.66Z" fill="#65A30D" />
  </svg>
  ,
};

function ActivityName({
  activityIndex,
  form,
}: {
  activityIndex: number;
  form: UseFormReturn<Inputs>;
}) {
  const activity = form.watch(`activities.${activityIndex}`);
  const [isEditing, setIsEditing] = useState(false);
  const toggleIsEditing = () => setIsEditing(!isEditing);
  const ActivityIcon = ActivityKindIcons[activity.kind] ?? Briefcase;
  const EditIcon = isEditing ? Save : Pencil;
  return (
    <div className="flex-1 flex gap-3">
      <div className="flex flex-col justify-center">
        <ActivityIcon />
      </div>
      <input
        type="text"
        className={`input ${isEditing ? "pointer-events-auto" : ""} ${isEditing ? "" : "text-black"}`}
        disabled={!isEditing}
        {...form.register(`activities.${activityIndex}.name`)}
      />
      <button
        type="button"
        onClick={toggleIsEditing}
        className="pointer-events-auto my-auto text-gray-400 hover:text-gray-600 transition-colors"
        aria-label={isEditing ? "Save activity name" : "Edit activity name"}
      >
        <EditIcon width={16} height={16} />
      </button>
    </div>
  );
}

function TypeSpecificInput({ children }: { children: ReactNode }) {
  return (
    <div className="py-2 px-4 flex justify-between bg-gray-50 rounded gap-6">
      {children}
    </div>
  );
}

function RateWithQuantityAndFrequencyInputGroup({
  activityIndex,
  form,
  rate_label,
  quantity_label,
  frequency_options,
}: {
  activityIndex: number;
  form: UseFormReturn<Inputs>;
  rate_label: string;
  quantity_label: string;
  frequency_options: React.ComponentProps<typeof FormInputs.Select>["options"];
}) {
  return (
    <div className="flex flex-1 gap-6 justify-between">
      <div className="flex gap-4">
        <label htmlFor="" className="flex-1 my-auto">
          {rate_label}
        </label>
        <FormInputs.Currency<Inputs>
          form={form}
          name={`activities.${activityIndex}.rate`}
          min={0}
          max={1000}
        />
      </div>
      <div className="flex gap-4">
        <label htmlFor="" className="flex-1 my-auto">
          {quantity_label}
        </label>
        <FormInputs.Number<Inputs>
          form={form}
          name={`activities.${activityIndex}.quantity`}
          min={0}
          max={100}
          className="w-[77px]"
        />
        <FormInputs.Select<Inputs>
          form={form}
          name={`activities.${activityIndex}.frequency`}
          options={frequency_options}
          className=" w-[120px]"
        />
      </div>
    </div>
  );
}

function ActivityInputTypeSpecificInputs({
  activityIndex,
  form,
}: {
  activityIndex: number;
  form: UseFormReturn<Inputs>;
}) {
  const { t } = useTranslation();
  const activity = form.watch(`activities.${activityIndex}`);

  switch (activity.kind) {
    case "daily_rate":
      return (
        <TypeSpecificInput>
          <label htmlFor="" className="flex-1 my-auto">
            {t("simulator.inputs.tabs.activities.inputs.daily_rate_rate_label")}
          </label>
          <FormInputs.Currency<Inputs>
            form={form}
            name={`activities.${activityIndex}.rate`}
            min={0}
            max={1000}
          />
        </TypeSpecificInput>
      );
    case "hourly_rate":
      return (
        <TypeSpecificInput>
          <RateWithQuantityAndFrequencyInputGroup
            activityIndex={activityIndex}
            form={form}
            rate_label={t(
              "simulator.inputs.tabs.activities.inputs.hourly_rate_rate_label",
            )}
            quantity_label={t(
              "simulator.inputs.tabs.activities.inputs.hourly_rate_quantity_label",
            )}
            frequency_options={[
              {
                value: "monthly",
                label: t(
                  "simulator.inputs.tabs.activities.inputs.frequency_select_monthly_label",
                ),
              },
              {
                value: "yearly",
                label: t(
                  "simulator.inputs.tabs.activities.inputs.frequency_select_yearly_label",
                ),
              },
            ]}
          />
        </TypeSpecificInput>
      );
    case "flat_rate":
      return (
        <TypeSpecificInput>
          <RateWithQuantityAndFrequencyInputGroup
            activityIndex={activityIndex}
            form={form}
            rate_label={t(
              "simulator.inputs.tabs.activities.inputs.flat_rate_rate_label",
            )}
            quantity_label={t(
              "simulator.inputs.tabs.activities.inputs.flat_rate_quantity_label",
            )}
            frequency_options={[
              {
                value: "monthly",
                label: t(
                  "simulator.inputs.tabs.activities.inputs.frequency_select_monthly_label",
                ),
              },
              {
                value: "yearly",
                label: t(
                  "simulator.inputs.tabs.activities.inputs.frequency_select_yearly_label",
                ),
              },
            ]}
          />
        </TypeSpecificInput>
      );
    case "paid":
      return (
        <TypeSpecificInput>
          <div className="flex gap-4">
            {" "}
            <label htmlFor="" className="flex-1 my-auto">
              {t(
                "simulator.inputs.tabs.activities.inputs.estimated_monthly_revenue_label",
              )}
            </label>
            <FormInputs.Currency<Inputs>
              form={form}
              name={`activities.${activityIndex}.estimated_monthly_revenue`}
              min={0}
              max={1000}
            />
          </div>
          <div className="flex gap-4">
            <label htmlFor="" className="flex-1 my-auto">
              {t(
                "simulator.inputs.tabs.activities.inputs.estimated_months_billed_label",
              )}
            </label>
            <FormInputs.Number<Inputs>
              form={form}
              name={`activities.${activityIndex}.estimated_months_billed`}
              min={0}
              max={12}
              className="w-[50px]"
            />
          </div>
        </TypeSpecificInput>
      );
    default:
      return null;
  }
}

function ActivityInputSelectType({
  activityIndex,
  form,
  options,
  selectClassName,
  iconClassName,
}: {
  activityIndex: number;
  form: UseFormReturn<Inputs>;
  options: Inputs["activities"][number]["kind"][];
  selectClassName: string;
  iconClassName: string;
}) {
  const { t } = useTranslation();
  const activity = form.watch(`activities.${activityIndex}`);
  const ActivityIcon = ActivityKindIcons[activity.kind];
  return (
    <div className="flex p-4">
      <label
        htmlFor={`activities.${activityIndex}.kind`}
        className="flex-1 my-auto"
      >
        {t(`simulator.inputs.tabs.${activity.type}.select_type_label`)}
      </label>
      <div className="relative">
        <select
          className={twMerge("select pl-10", selectClassName)}
          {...form.register(`activities.${activityIndex}.kind`)}
        >
          {options.map((option) => {
            const IconComponent = ActivityKindIcons[option];
            return (
              <option key={option} value={option}>
                <IconComponent
                  width={16}
                  height={16}
                  className={iconClassName}
                />
                {t(
                  `simulator.inputs.tabs.activities.${option}.select_type_option_label`,
                )}
              </option>
            );
          })}
        </select>
        <ActivityIcon
          width={16}
          height={16}
          className={twMerge(
            "absolute top-0 left-4 z-10 h-full my-auto",
            iconClassName,
          )}
        />
      </div>
    </div>
  );
}

function ActivityInputEnjoymentRate({
  activityIndex,
  form,
}: {
  activityIndex: number;
  form: UseFormReturn<Inputs>;
}) {
  const { t } = useTranslation();

  return (
    <div className="flex p-4">
      <label
        htmlFor={`activities.${activityIndex}.kind`}
        className="flex-1 my-auto"
      >
        {t("simulator.inputs.tabs.activities.inputs.enjoyment_rate_label")}
      </label>
      <FormInputs.Rating<Inputs>
        form={form}
        mask="heart"
        max={5}
        name={`activities.${activityIndex}.enjoyment_rate`}
      />
    </div>
  );
}

function ActivityInputAverageTimeSpent({
  activityIndex,
  form,
}: {
  activityIndex: number;
  form: UseFormReturn<Inputs>;
}) {
  const { t } = useTranslation();
  const inputName = `activities.${activityIndex}.average_time_spent` as const;
  const currentValue = form.watch(inputName);
  const numberOfDaysWorkedPerWeek = form.watch("config.weekdays_worked").length;

  return (
    <div className="flex p-4 flex-col gap-4">
      <div className="flex justify-between">
        <label htmlFor={inputName} className="my-auto">
          {t(
            "simulator.inputs.tabs.activities.inputs.average_time_spent_label",
          )}
        </label>
        <p className="text-sm font-bold text-gray-500 my-auto grow text-end">
          {t(
            "simulator.inputs.tabs.activities.inputs.average_time_spent_hint",
            {
              count: currentValue,
              max: numberOfDaysWorkedPerWeek,
            },
          )}
        </p>
      </div>
      <FormInputs.Range<Inputs>
        form={form}
        step={0.5}
        min={0}
        max={numberOfDaysWorkedPerWeek}
        name={inputName}
      />
    </div>
  );
}

function ActivityInput({
  activityWithInputIndex,
  removeActivity,
  form,
}: {
  activityWithInputIndex: Inputs["activities"][number] & { inputIndex: number };
  removeActivity: UseFieldArrayRemove;
  form: UseFormReturn<Inputs>;
}) {
  return (
    <div className={`collapse bg-white`}>
      <input
        id={`activities.${activityWithInputIndex.inputIndex}.collapse`}
        type="checkbox"
        className="hidden peer"
        checked={activityWithInputIndex.enabled}
        readOnly
      />
      <div className="collapse-title flex items-center gap-6 pointer-events-none pr-4">
        <FormInputs.Toggle<Inputs>
          form={form}
          name={`activities.${activityWithInputIndex.inputIndex}.enabled`}
          className="pointer-events-auto"
          ariaLabel="Toggle activity"
        />
        <ActivityName
          activityIndex={activityWithInputIndex.inputIndex}
          form={form}
        />
        <button
          type="button"
          onClick={() => removeActivity(activityWithInputIndex.inputIndex)}
          className="pointer-events-auto text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Delete activity"
        >
          <Trash2 width={16} height={16} />
        </button>
      </div>
      <div className="collapse-content">
        <ActivityInputSelectType
          form={form}
          activityIndex={activityWithInputIndex.inputIndex}
          options={
            activityWithInputIndex.type === "mission"
              ? ["daily_rate", "hourly_rate", "flat_rate"]
              : ["free", "paid"]
          }
          selectClassName={
            activityWithInputIndex.type === "mission"
              ? "w-[120px]"
              : "w-[168px]"
          }
          iconClassName={
            activityWithInputIndex.type === "mission"
              ? "text-blue-500"
              : "text-lime-600"
          }
        />
        <ActivityInputTypeSpecificInputs
          form={form}
          activityIndex={activityWithInputIndex.inputIndex}
        />
        <ActivityInputAverageTimeSpent
          form={form}
          activityIndex={activityWithInputIndex.inputIndex}
        />
        <ActivityInputEnjoymentRate
          form={form}
          activityIndex={activityWithInputIndex.inputIndex}
        />
      </div>
    </div>
  );
}

export { ActivityInput };
