import { Formatter as LegendFormatter } from "recharts/types/component/DefaultLegendContent";

const formatLegendLabelCurrency: LegendFormatter = (value, entry) => {
  const data = entry?.payload?.value;

  if (!data) {
    return null;
  }

  return `${value} ( ${data.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  })} )`;
};

const formatLegendLabelDays: LegendFormatter = (value, entry) => {
  const data = entry?.payload?.value;

  if (!data) {
    return null;
  }

  return `${value} ( ${data.toLocaleString("fr-FR", {
    maximumFractionDigits: 1,
  })} ) jours`;
};

export { formatLegendLabelCurrency, formatLegendLabelDays };
