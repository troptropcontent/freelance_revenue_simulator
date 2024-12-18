import styled from "styled-components";
import { Box } from "./Box";
import { createBorderRadiusStyle, cssVariable } from "../helper";
import { ColorValueHex } from "../tokens";
import { ReactNode } from "react";

const LabelCard = styled.div<{
  $color: ColorValueHex;
}>`
  display: flex;
  align-items: center;
  text-wrap: wrap;
  border-left: ${cssVariable("spacing.sm")} solid ${({ $color }) => $color};
  border-right: ${cssVariable("spacing.sm")} solid transparent;

  padding-block: ${cssVariable("spacing.sm")};

  ${createBorderRadiusStyle("sm")}

  box-shadow: 0 2px 2px ${cssVariable("color.background.black.a2")};

  & > data {
    font-weight: bold;
    margin-inline: ${cssVariable("spacing.sm")};
  }
`;

const Graph = styled.div<{
  $title: string;
  $data: {
    color: ColorValueHex;
    start_angle: number;
    end_angle: number;
  }[];
}>`
  --thickness: 16px;
  --width: 170px;

  width: var(--width);
  aspect-ratio: 1;
  display: inline-grid;
  place-content: center;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    border-radius: 50%;
    inset: 0;
    background: conic-gradient(
      ${({ $data }) =>
        $data
          .map(
            (data) =>
              `${data.color} ${data.start_angle}deg ${data.end_angle}deg`,
          )
          .join(",")}
    );
  }

  &:after {
    content: "${({ $title }) => $title}";
    font-size: ${cssVariable("fonts.size.lg")};
    font-weight: bold;
    position: absolute;
    border-radius: 50%;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    background: radial-gradient(
      white calc(var(--width) / 2 - var(--thickness)),
      #0000 calc(var(--width) / 2 - var(--thickness) + 1px)
    );
  }
`;

interface PieChartElement {
  label: string;
  color: ColorValueHex;
  value: number;
}

const PieChart = ({
  data,
  labelFormater,
  title,
}: {
  data: PieChartElement[];
  labelFormater?: (
    element: PieChartElement,
    data: PieChartElement[],
  ) => ReactNode;
  title: string;
}) => {
  const total_value = data.reduce((acc, { value }) => acc + value, 0);
  if (total_value == 0) {
    throw new Error("The dataset given to PieChart seems to be empty");
  }

  const computePieAngle = (value: number): number =>
    (value / total_value) * 360;

  const initialValue: {
    color: ColorValueHex;
    start_angle: number;
    end_angle: number;
  }[] = [];

  const pie_data = data.reduce((acc, current): typeof initialValue => {
    if (current.value == 0) {
      return acc;
    }
    if (acc.length == 0) {
      return [
        {
          color: current.color,
          start_angle: 0,
          end_angle: computePieAngle(current.value),
        },
      ];
    }

    const last_element = acc.slice(-1)[0];

    return [
      ...acc,
      {
        color: current.color,
        start_angle: last_element.end_angle,
        end_angle: last_element.end_angle + computePieAngle(current.value),
      },
    ];
  }, initialValue);

  return (
    <Box flex flexDirection="column" alignItems="center" gap="lg">
      <Graph $data={pie_data} $title={title} />
      <Box flex flexWrap="wrap" gap="sm" justifyContent="center">
        {data.map(
          (element, i) =>
            element.value != 0 && (
              <LabelCard $color={element.color} key={i}>
                {labelFormater ? labelFormater(element, data) : element.label}
              </LabelCard>
            ),
        )}
      </Box>
    </Box>
  );
};

export { PieChart };
