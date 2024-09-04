import { Activities } from "src/components/simulator/constants";

const prepareData = (data: { [key: string]: number }) => {
  const filteredData = Object.entries(data)
    .filter((keyValue) => keyValue[1] > 0)
    .sort((a, b) => b[1] - a[1]);

  return filteredData.map(([key, value]) => ({
    id: key,
    value,
    name: Activities[key as keyof typeof Activities].label,
  }));
};

export { prepareData };
