import { UseFormReturn } from "react-hook-form";
import { PieChart } from "src/components/ui/PieChart";
import { Inputs } from "../../inputs/types";
import { computeActivitiesMetrics } from "../shared/utils";
import { DISABLED_COLOR, MISSION_ACTIVITY_COLOR, MISSION_ACTIVITY_COLOR_DARK, PROJECT_ACTIVITY_COLOR, PROJECT_ACTIVITY_COLOR_DARK } from "../shared/constants";
import { ActivityIcon, ActivityIcons } from "../../inputs/shared/ActivityIcon";
import { CollapsibleBadge } from "./private/BadgeCollapsible";
import { useTranslation } from "react-i18next";

function CollapsibleBadgeContent({ color, total, value, kind, label }: { color: string, total: number, value: number, kind: string, label: string }) {
    let label_value = Math.round((value / total) * 100);
    if (!isFinite(label_value)) {
        label_value = 100;
    }
    const percentage = `${label_value}%`

    return (
        <div className="flex gap-2 items-center">
            <p style={{ color }}>{percentage}</p>
            <ActivityIcon kind={kind as keyof typeof ActivityIcons} style={{ color }} />
            <p>{label}</p>
        </div>
    )
}

function NetRevenueRepartition({ form }: { form: UseFormReturn<Inputs> }) {
    const { t } = useTranslation()
    const values = form.getValues()

    const metrics = computeActivitiesMetrics(values)

    const total = Object.values(metrics).reduce((prev, current) => prev + current.monthlyNetRevenue, 0)

    const missionsTotal = values.activities.reduce((prev, current, index) => {
        if (current.type != "mission") {
            return prev
        }
        const activityMetrics = metrics[index]
        return prev + activityMetrics.monthlyNetRevenue
    }, 0)

    const missionsRepartision = values.activities.reduce<{ name: string, kind: Inputs["activities"][number]["kind"], value: number }[]>((prev, current, index) => {
        if (!current.enabled || current.type != "mission") {
            return prev
        }
        const activityMetrics = metrics[index]
        return [...prev, {
            name: current.name,
            kind: current.kind,
            value: activityMetrics.monthlyNetRevenue
        }]
    }, [])

    const projectsTotal = values.activities.reduce((prev, current, index) => {
        if (current.type != "project") {
            return prev
        }
        const activityMetrics = metrics[index]
        return prev + activityMetrics.monthlyNetRevenue
    }, 0)

    const projectRepartision = values.activities.reduce<{ name: string, kind: Inputs["activities"][number]["kind"], value: number }[]>((prev, current, index) => {
        if (!current.enabled || current.type != "project") {
            return prev
        }
        const activityMetrics = metrics[index]
        return [...prev, {
            name: current.name,
            kind: current.kind,
            value: activityMetrics.monthlyNetRevenue
        }]
    }, [])

    const data = [
        {
            color: total != 0 ? MISSION_ACTIVITY_COLOR : DISABLED_COLOR,
            color_dark: MISSION_ACTIVITY_COLOR_DARK,
            value: missionsTotal,
            label: t("simulator.inputs.tabs.mission.name"),
            repartition: missionsRepartision,
        },
        {
            color: total != 0 ? PROJECT_ACTIVITY_COLOR : DISABLED_COLOR,
            color_dark: PROJECT_ACTIVITY_COLOR_DARK,
            value: projectsTotal,
            label: t("simulator.inputs.tabs.project.name"),
            repartition: projectRepartision,
        }
    ]

    return (
        <div className="card bg-white! p-8 gap-6">
            <p className="text-gray-500 text-center">{t("simulator.results.charts.net_revenue_repartition.title")}</p>
            <div className="p-4">
                <PieChart
                    data={data}
                    title={`${Math.round((total / 1000) * 10) / 10}K€`}
                />
            </div>
            <div className="flex flex-col gap-3">
                {data.map(({ color, label, value: type_total, repartition, color_dark }) => (
                    <CollapsibleBadge color={color} title={`${Math.round((type_total / 1000) * 10) / 10}K€`} description={label}>
                        {
                            repartition.length > 0 && <div className="flex gap-3 flex-col">
                                {repartition.map(({ kind, name, value }) => <CollapsibleBadgeContent color={color_dark} kind={kind} label={name} value={value} total={type_total} />)}
                            </div>
                        }
                    </CollapsibleBadge>))}
            </div>
        </div>
    )

}

export { NetRevenueRepartition }