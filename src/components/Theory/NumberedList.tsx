import React, { ReactNode } from "react";
import { StyledList } from "./NumberedList.styles";

const List = ({ children }: { children: ReactNode }) => {
  return <StyledList>{children}</StyledList>;
};

export default List;
