import { UseFormReturn } from "react-hook-form";
import { Box } from "src/components/ui/Box";
import { PieChart } from "src/components/ui/PieChart";
import { Text } from "src/components/ui/Text";
import { Inputs } from "../../inputs/types";
import { computeNetRevenueByActivityType } from "../shared/utils";
import { ComponentProps, ReactNode } from "react";
import { DISABLED_COLOR, MISSION_ACTIVITY_COLOR, MISSION_ACTIVITY_COLOR_DARK, PROJECT_ACTIVITY_COLOR, PROJECT_ACTIVITY_COLOR_DARK } from "../shared/constants";
import { ActivityIcon, ActivityIcons } from "../../inputs/shared/ActivityIcon";

function LabelCard({ color, label, value, children }: { color: string, value: number, label: string, children: ReactNode }) {
    return (
        <details className="collapse collapse-arrow p-0">
            <summary className="collapse-title p-1">
                <div className="bg-white rounded shadow min-h-12 flex">
                    <div style={{ backgroundColor: color }} className="w-2 rounded-l"></div>
                    <div className="grow flex items-center px-3 py-2 gap-3">
                        <p className="text-xl font-bold">{`${Math.round((value / 1000) * 10) / 10}K€`}</p>
                        <p>{label}</p>
                    </div>
                </div>
            </summary>
            <div className="collapse-content">
                {children}
            </div>
        </details>

    )
}

function NetRevenueRepartition({ form }: { form: UseFormReturn<Inputs> }) {
    const values = form.getValues()
    const { mission, project, total } = computeNetRevenueByActivityType(values)
    const data = [
        {
            color: total != 0 ? MISSION_ACTIVITY_COLOR : DISABLED_COLOR,
            color_dark: MISSION_ACTIVITY_COLOR_DARK,
            value: mission.total,
            label: "mission",
            repartition: mission.repartition,
        },
        {
            color: total != 0 ? PROJECT_ACTIVITY_COLOR : DISABLED_COLOR,
            color_dark: PROJECT_ACTIVITY_COLOR_DARK,
            value: project.total,
            label: "project",
            repartition: project.repartition,
        }
    ]

    return (
        <div className="card bg-white! p-8 gap-6">
            <p className="text-gray-500 text-center">Répartition du revenu net mensuel</p>
            <div className="p-4">
                <PieChart
                    data={data}
                    title={`${Math.round((total / 1000) * 10) / 10}K€`}
                />
            </div>
            <div className="flex flex-col gap-2">
                {data.map(activityType => <LabelCard {...activityType} >
                    {activityType.repartition.map((repartitionItem) => {
                        let label_value = Math.round((repartitionItem.value / activityType.value) * 100);
                        if (!isFinite(label_value)) {
                            label_value = 100;
                        }
                        const percentage = `${label_value}%`

                        return <div className="flex gap-2 items-center"><p style={{ color: activityType.color_dark }}>{percentage}</p> <ActivityIcon kind={repartitionItem.kind as keyof typeof ActivityIcons} style={{ color: activityType.color_dark }} /> <p>{repartitionItem.name}</p></div>
                    })}
                </LabelCard>)}
            </div>
        </div>
    )

}

export { NetRevenueRepartition }