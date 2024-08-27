type Spacings = "small" | "medium" | "large" | "none";

export type Padding = Spacings | {
    top?: Spacings;
    right?: Spacings;
    bottom?: Spacings;
    left?: Spacings;
    inline?: Spacings;
    block?: Spacings;
}

const PaddingKeys = {
    top: "padding-block-start",
    right: "padding-inline-end",
    bottom: "padding-block-end",
    left: "padding-inline-start",
    inline: "padding-inline",
    block: "padding-block",
} as const;

const BuildPaddingStyle = (padding: Padding): string => {
    if (typeof padding === "string" ) {
        return `padding: var(--spacing-${padding });`
    }

    return Object.entries(padding).map(([key, value]) => {
        return `${PaddingKeys[key as keyof typeof PaddingKeys]}: var(--spacing-${value});`
    }).join(";");
}

const BorderRadiusKeys = {
    topLeft: "border-top-left-radius",
    topRight: "border-top-right-radius",
    bottomLeft: "border-bottom-left-radius",
    bottomRight: "border-bottom-right-radius",
} as const;

export type BorderRadius = Spacings | {
    topLeft?: Spacings;
    topRight?: Spacings;
    bottomLeft?: Spacings;
    bottomRight?: Spacings;
}

const BuildBorderRadiusStyle = (borderRadius: BorderRadius): string => {
    if (typeof borderRadius === "string" ) {
        return `border-radius: var(--border-radius-${borderRadius });`
    }

    return Object.entries(borderRadius).map(([key, value]) => {
        return `${BorderRadiusKeys[key as keyof typeof BorderRadiusKeys]}: var(--border-radius-${value});`
    }).join(";");
}

export { BuildPaddingStyle, BuildBorderRadiusStyle };