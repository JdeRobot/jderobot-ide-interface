import React from "react";
import { CarouselData } from "Types";
import CarouselDisplay from "./CarouselDisplay";

const ComparisonDisplay = ({
  title,
  data,
}: {
  title: string;
  data: CarouselData[];
}) => {
  return (
    <CarouselDisplay title={title} data={data} comparison maxImageHeight={20} />
  );
};

export default ComparisonDisplay;
