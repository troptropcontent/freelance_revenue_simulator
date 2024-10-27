import { ActivityKinds } from "src/components/simulator/constants";
import { ColorValueHex } from "src/components/tokens";

const RevenueByActivityChartBaseColors: Record<
  (typeof ActivityKinds)[number],
  ColorValueHex
> = {
  entrepreneurial_project: "#BBD826",
  freelancing: "#004A97",
  unbilled_activity: "#F0B441",
};

const RevenueByKindChartBaseColors: Record<
  (typeof ActivityKinds)[number],
  ColorValueHex
> = {
  entrepreneurial_project: "#E3F588",
  freelancing: "#CAE0F7",
  unbilled_activity: "#F8D470",
};

export { RevenueByActivityChartBaseColors, RevenueByKindChartBaseColors };
