import styled from "styled-components";

export const StyledIconButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  transition: all 0.2s;
  padding: 0;
  border-radius: 6px;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: #333;
    background: #F5F5F5;
  }
`;
