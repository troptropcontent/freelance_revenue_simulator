import { UseFormReturn } from "react-hook-form";
import { Inputs } from "../../inputs/types";
import { useTranslation } from "react-i18next";
import { MISSION_ACTIVITY_COLOR, MISSION_ACTIVITY_COLOR_DARK, PROJECT_ACTIVITY_COLOR, PROJECT_ACTIVITY_COLOR_DARK } from "../shared/constants";
import { ActivityIcon, ActivityIcons } from "../../inputs/shared/ActivityIcon";

// Days of the week labels (French: L=Lundi, M=Mardi, M=Mercredi, J=Jeudi, V=Vendredi, S=Samedi, D=Dimanche)
const DAY_LABELS: Record<string, string> = {
    "0": "L",
    "1": "M",
    "2": "M",
    "3": "J",
    "4": "V",
    "5": "S",
    "6": "D",
};

const ADMIN_COLOR = "#E5E7EB" as const;
const AVAILABLE_COLOR = "#FFFFFF" as const;

interface ActivityBlock {
    name: string;
    kind: string;
    type: "mission" | "project" | "admin" | "available";
    days: number; // number of days this activity takes
    color: string;
    background: string
}

interface DaySegment {
    name: string;
    percentage: number; // percentage of this day (0-100)
    color: string;
}

interface DayColumn {
    day: string;
    label: string;
    segments: DaySegment[];
}

function SimpleBadge({ color, background, percentage, label, icon }: { color: string; background: string, percentage: number; label: string; icon?: string }) {

    return (
        <div style={{ backgroundColor: background }} className="rounded shadow px-3 py-2 flex items-center gap-2 text-sm">
            <span className="font-bold">{`${Math.round(percentage)}%`}</span>
            {icon && <ActivityIcon kind={icon as keyof typeof ActivityIcons} style={{ color }} />}
            <span>{label}</span>
        </div>
    );
}

function WeekComposition({ form }: { form: UseFormReturn<Inputs> }) {
    const { t } = useTranslation();
    const values = form.getValues();
    const { config, activities } = values;

    const enabledActivities = activities.filter((a) => a.enabled);
    const daysWorked = config.weekdays_worked;
    const totalDaysPerWeek = daysWorked.length;
    const adminDaysPerMonth = config.number_of_days_spent_on_admin_tasks;

    // Calculate admin days per week (monthly / 4 weeks)
    const adminDaysPerWeek = adminDaysPerMonth / 4;

    // Build list of activity blocks with their day durations
    const activityBlocks: ActivityBlock[] = enabledActivities.map((activity) => {
        const color = activity.type === "mission" ? MISSION_ACTIVITY_COLOR_DARK : PROJECT_ACTIVITY_COLOR_DARK;
        const background = activity.type === "mission" ? MISSION_ACTIVITY_COLOR : PROJECT_ACTIVITY_COLOR;
        return {
            name: activity.name,
            kind: activity.kind,
            type: activity.type,
            days: activity.average_time_spent,
            color,
            background
        };
    });

    // Add admin block
    if (adminDaysPerWeek > 0) {
        activityBlocks.push({
            name: t("simulator.results.charts.week_composition.admin", "Gestion"),
            kind: "admin",
            type: "admin",
            days: adminDaysPerWeek,
            color: ADMIN_COLOR,
            background: ADMIN_COLOR,
        });
    }

    // Calculate total used days
    const totalUsedDays = activityBlocks.reduce((sum, a) => sum + a.days, 0);
    const availableDays = Math.max(0, totalDaysPerWeek - totalUsedDays);

    // Add available time block
    if (availableDays > 0) {
        activityBlocks.push({
            name: t("simulator.results.charts.week_composition.available", "Temps disponible"),
            kind: "available",
            type: "available",
            days: availableDays,
            color: AVAILABLE_COLOR,
            background: AVAILABLE_COLOR,
        });
    }

    // Now distribute blocks across days sequentially (filling left to right)
    const dayColumns: DayColumn[] = daysWorked.map((day) => ({
        day,
        label: DAY_LABELS[day] || day,
        segments: [],
    }));

    // Cursor tracks how many "days" we've filled (can be fractional)
    let cursor = 0;

    for (const block of activityBlocks) {
        let remainingDays = block.days;

        while (remainingDays > 0 && cursor < totalDaysPerWeek) {
            const currentDayIndex = Math.floor(cursor);
            const positionInDay = cursor - currentDayIndex; // 0 to 1, how far into this day we are
            const spaceInDay = 1 - positionInDay; // remaining space in this day (0 to 1)

            // How much of this block fits in the current day
            const fillAmount = Math.min(remainingDays, spaceInDay);

            if (fillAmount > 0 && currentDayIndex < dayColumns.length) {
                dayColumns[currentDayIndex].segments.push({
                    name: block.name,
                    percentage: fillAmount * 100,
                    color: block.background,
                });
            }

            cursor += fillAmount;
            remainingDays -= fillAmount;
        }
    }

    // Calculate percentages for legend (based on total week)
    const totalDaysForPercentage = Math.max(totalDaysPerWeek, totalUsedDays);
    const legendItems = activityBlocks.map((block) => ({
        color: block.color,
        background: block.background,
        percentage: (block.days / totalDaysForPercentage) * 100,
        label: block.name,
        icon: block.type === "mission" || block.type === "project" ? block.kind : undefined,
    }));

    return (
        <div className="card bg-white! p-8 gap-6 flex flex-col">
            <p className="text-gray-500 text-center">
                {t("simulator.results.charts.week_composition.title", "Composition de la semaine")}
            </p>

            {/* Week chart */}
            <div className="flex justify-center gap-4 py-4">
                {dayColumns.map(({ day, label, segments }) => (
                    <div key={day} className="flex flex-col items-center gap-2">
                        {/* Day label */}
                        <span className="text-gray-500 text-sm">{label}</span>

                        {/* Stacked bar - segments stack from bottom to top */}
                        <div
                            className="w-12 rounded-lg overflow-hidden flex flex-col-reverse border border-gray-200"
                            style={{ height: "160px" }}
                        >
                            {segments.map((segment, idx) => (
                                <div
                                    key={`${day}-${idx}`}
                                    style={{
                                        height: `${segment.percentage}%`,
                                        backgroundColor: segment.color,
                                    }}
                                    className={`w-full rounded shrink-0 ${idx < segments.length - 1 ? "border-t-2 border-white" : ""}`}
                                    title={segment.name}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-2 justify-center">
                {legendItems.map((item, idx) => (
                    <SimpleBadge
                        key={idx}
                        color={item.color}
                        background={item.background}
                        percentage={item.percentage}
                        label={item.label}
                        icon={item.icon}
                    />
                ))}
            </div>
        </div>
    );
}

export { WeekComposition };
