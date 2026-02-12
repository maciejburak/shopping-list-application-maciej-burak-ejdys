import styled from "styled-components";

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  position: relative;
`;

export const BackButton = styled.button`
  position: absolute;
  left: 0;
`;

export const TitleContainer = styled.div`
  flex: 1;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
  text-align: center;
`;

export const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #666;
  text-align: left;
  white-space: pre-wrap;
`;

export const Loading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: 16px;
  font-size: 16px;
  color: #666;
`;

export const Error = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: 16px;
  font-size: 16px;
  color: #EF4444;
`;
