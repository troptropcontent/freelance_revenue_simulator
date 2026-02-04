import { UseFormReturn } from "react-hook-form";
import { Inputs } from "../../inputs/types";
import { useTranslation } from "react-i18next";
import { DISABLED_COLOR } from "../shared/constants";
import { getAverageEnjoymentRate } from "./private/utils";
import { CollapsibleBadge } from "./private/BadgeCollapsible";

const ENJOYMENT_COLOR = "#FCD34D" as const;

interface GaugeChartProps {
    value: number;
    maxValue: number;
    label?: string;
}

function GaugeChart({ value, maxValue }: GaugeChartProps) {
    const percentage = Math.min(Math.max(value / maxValue, 0), 1);

    // Format the value display (e.g., "4,5 / 5")
    const formattedValue = value.toLocaleString('fr-FR', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
    });

    // Arc parameters - 180° semicircle
    const startAngleDeg = 170; // Left
    const endAngleDeg = 10;     // Right
    const totalArcDeg = 160;   // 180 degrees

    // Calculate where the filled arc ends based on percentage
    const filledEndAngleDeg = startAngleDeg - (percentage * totalArcDeg);

    // Convert to radians for calculations
    const toRad = (deg: number) => (deg * Math.PI) / 180;

    // SVG dimensions
    const width = 320;
    const height = 135;
    const centerX = 160;
    const centerY = 130;
    const radius = 120;
    const strokeWidth = 22;

    // Calculate point on arc
    const getPoint = (angleDeg: number) => ({
        x: centerX + radius * Math.cos(toRad(angleDeg)),
        y: centerY - radius * Math.sin(toRad(angleDeg))
    });

    // Create arc path
    const createArcPath = (startDeg: number, endDeg: number) => {
        const start = getPoint(startDeg);
        const end = getPoint(endDeg);
        const arcSweep = Math.abs(startDeg - endDeg) > 180 ? 1 : 0;
        return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${arcSweep} 1 ${end.x} ${end.y}`;
    };

    // Heart icon position (at the end of filled arc)
    const heartPos = getPoint(filledEndAngleDeg);

    return (
        <div className="relative inline-flex flex-col items-center">
            <svg
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                fill="none"
            >
                {/* Background arc (gray) */}
                <path
                    d={createArcPath(startAngleDeg, endAngleDeg)}
                    fill="none"
                    stroke={DISABLED_COLOR}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                />

                {/* Filled arc (yellow) */}
                {percentage > 0 && (
                    <path
                        d={createArcPath(startAngleDeg, filledEndAngleDeg)}
                        fill="none"
                        stroke={ENJOYMENT_COLOR}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                    />
                )}

                {/* Heart icon container */}
                <g transform={`translate(${heartPos.x}, ${heartPos.y})`}>
                    {/* White circle background with border */}
                    <circle
                        r="23"
                        fill="white"
                        stroke={DISABLED_COLOR}
                        strokeWidth="1.15"
                    />
                    {/* Heart icon */}
                    <path
                        d="M0 13.5L-2.25 11.5C-10.22 4.45 -15.49 -0.2 -15.49 -5.92C-15.49 -10.57 -12.23 -14.23 -7.46 -14.23C-2.21 -14.23 0 -7.87 0 -7.87C0 -7.87 2.69 -14.23 7.46 -14.23C12.23 -14.23 15.49 -10.57 15.49 -5.92C15.49 -0.2 10.22 4.45 2.25 11.52L0 13.5Z"
                        fill={ENJOYMENT_COLOR}
                        transform="scale(0.65)"
                    />
                </g>
            </svg>
            <span className="absolute bottom-[15px] text-center">
                <p>Moyenne</p>
                <p className="text-4xl font-bold">{`${formattedValue} / ${maxValue}`}</p>
            </span>
        </div>
    );
}

function EnjoymentRateRepartition({ form }: { form: UseFormReturn<Inputs> }) {
    const { t } = useTranslation();

    // Calculate average enjoyment rate from enabled activities
    const values = form.getValues();
    const enabledActivities = values.activities.filter(activity => activity.enabled);
    const missions = enabledActivities.filter(({ type }) => type == "mission")
    const missions_average = getAverageEnjoymentRate(missions)
    const projects = enabledActivities.filter(({ type }) => type == "project")
    const projects_average = getAverageEnjoymentRate(projects)


    const averageEnjoyment = getAverageEnjoymentRate(enabledActivities)

    return (
        <div className="card bg-white! p-8 gap-6 flex flex-col items-center">
            <p className="text-gray-500 text-center">
                {t("simulator.results.charts.enjoyment_ventilation.title")}
            </p>
            <GaugeChart
                value={averageEnjoyment}
                maxValue={5}
                label={t("simulator.results.charts.enjoyment_ventilation.average")}
            />
            <div className="grow"></div>
            <div className="flex flex-col gap-3 w-full">
                <CollapsibleBadge color={missions.length > 0 ? ENJOYMENT_COLOR : DISABLED_COLOR} title={`${missions_average} / ${5}`} description={t("simulator.inputs.tabs.mission.name")}>
                    {
                        missions.length > 0 && <div className="flex gap-3 flex-col">
                            {missions.map(({ name, enjoyment_rate }) => <span className="flex gap-3"><p className="font-bold min-w-9">{`${enjoyment_rate} / ${5}`}</p><p>{name}</p></span>)}
                        </div>
                    }
                </CollapsibleBadge>
                <CollapsibleBadge color={projects.length > 0 ? ENJOYMENT_COLOR : DISABLED_COLOR} title={`${projects_average} / ${5}`} description={t("simulator.inputs.tabs.project.name")}>
                    {
                        projects.length > 0 && <div className="flex gap-3 flex-col">
                            {projects.map(({ name, enjoyment_rate }) => <span className="flex gap-3"><p className="font-bold min-w-9">{`${enjoyment_rate} / ${5}`}</p><p>{name}</p></span>)}
                        </div>
                    }
                </CollapsibleBadge>
            </div>
        </div >
    );
}

export { EnjoymentRateRepartition, GaugeChart };
