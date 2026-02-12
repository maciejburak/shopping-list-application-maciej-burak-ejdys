import styled from "styled-components";

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-bottom: 1px solid #E3E3E5;
  gap: 16px;
  height: 50px;

  &:hover .icon-button {
    opacity: 1;
  }
`;

export const ItemNumber = styled.div`
  color: #FF941A;
  font-family: Inter, sans-serif;
  font-weight: 700;
  font-size: 24px;
  flex-shrink: 0;
  padding: 12px;
  border-right: 1px solid #E3E3E5;
`;

export const ItemContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 8px;
`;

export const ItemName = styled.a`
  font-size: 16px;
  color: #333;
  flex: 1;
  transition: color 0.2s;

  &:hover {
    color: #FF9500;
  }
`;

export const ItemPrice = styled.span`
  font-size: 16px;
  color: #666;
  white-space: nowrap;
`;

export const ItemActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin: 8px;

  .icon-button {
    opacity: 0;
  }
`;

export const Total = styled.div`
  display: flex;
  align-items: center;
  background: white;
  gap: 16px;
  height: 50px;
`;

export const TotalLabel = styled.span`
  flex: 1;
  font-size: 16px;
  color: #333;
  margin: 8px;
  padding-left: 48px;
`;

export const TotalValue = styled.span`
  font-size: 16px;
  color: #666;
  white-space: nowrap;
  margin: 8px;
  padding-right: 80px;
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
  padding: 12px 16px;
  color: #FF9500;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.2s;
  border-radius: 8px;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
    background: rgba(255, 149, 0, 0.05);
  }
`;
