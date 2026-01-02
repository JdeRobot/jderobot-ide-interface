import React from "react";
import { StyledList } from "./List.styles";

const List = ({
  children,
}: {
  children: any;
}) => {
  return (
    <StyledList>
      {children}
    </StyledList>
  );
};

export default List;
