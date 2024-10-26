import styled from "styled-components";
import { Box } from "./Box";
import { List } from "./List";
import {
  createBorderRadiusStyle,
  cssVariable,
  RecursiveKeyOf,
} from "../helper";
import { Tokens } from "../tokens";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Text } from "./Text";

const LabelCard = styled.div<{
  $color: RecursiveKeyOf<Tokens["color"]["background"]>;
}>`
  display: flex;
  text-wrap: wrap;
  border-left: ${cssVariable("spacing.sm")} solid
    ${({ $color }) => cssVariable(`color.background.${$color}`)};
  border-right: ${cssVariable("spacing.sm")} solid transparent;

  padding-block: ${cssVariable("spacing.sm")};

  ${createBorderRadiusStyle("sm")}

  box-shadow: 0 2px 2px ${cssVariable("color.background.black.a7")};

  & > data {
    font-weight: bold;
    margin-inline: ${cssVariable("spacing.sm")};
  }
`;

const Graph = styled.div<{
  $title: string;
  $data: {
    color: RecursiveKeyOf<Tokens["color"]["background"]>;
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
              `${cssVariable(`color.background.${data.color}`)} ${data.start_angle}deg ${data.end_angle}deg`,
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

const PieChart = ({
  data,
}: {
  data: {
    label: ReactNode;
    color: RecursiveKeyOf<Tokens["color"]["background"]>;
    value: number;
  }[];
}) => {
  const total_value = data.reduce((acc, { value }) => acc + value, 0);
  if (total_value == 0) {
    throw new Error("The dataset given to PieChart seems to be empty");
  }

  const computePieAngle = (value: number): number =>
    (value / total_value) * 360;

  const initialValue: {
    color: RecursiveKeyOf<Tokens["color"]["background"]>;
    start_angle: number;
    end_angle: number;
  }[] = [];

  const sorted_data = data.sort((a, b) => b.value - a.value);
  const pie_data = sorted_data.reduce((acc, current): typeof initialValue => {
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
      <Graph
        $data={pie_data}
        $title={`${Math.round((total_value / 1000) * 10) / 10}K€`}
      />
      <List.Root gap="sm">
        {sorted_data.map(
          (element, i) =>
            element.value != 0 && (
              <LabelCard $color={element.color} key={i}>
                <data>{`${Math.round((element.value / 1000) * 10) / 10}K€`}</data>
                <Text>{element.label}</Text>
              </LabelCard>
            ),
        )}
      </List.Root>
    </Box>
  );
};

export { PieChart };
