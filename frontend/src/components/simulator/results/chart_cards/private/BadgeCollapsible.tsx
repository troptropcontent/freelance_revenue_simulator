import { ReactNode } from "react";

interface CollapsibleBadgeProps { color: string, title: string, description: string, children?: ReactNode }
function CollapsibleBadge({ color, title, description, children }: CollapsibleBadgeProps) {

    return (
        <details className={`collapse p-1 ${children ? "collapse-arrow" : ""}`}>
            <summary className="collapse-title p-0 bg-white rounded shadow">
                <div className="min-h-12 flex">
                    <div style={{ backgroundColor: color }} className="w-2 rounded-l"></div>
                    <div className="grow flex items-center px-3 py-2 gap-3">
                        <p className="text-xl font-bold">{title}</p>
                        <p>{description}</p>
                    </div>
                </div>
            </summary>
            {children && (
                <div className="collapse-content mt-3 pb-0">
                    {children}
                </div>
            )}
        </details>
    )
}

export { CollapsibleBadge }