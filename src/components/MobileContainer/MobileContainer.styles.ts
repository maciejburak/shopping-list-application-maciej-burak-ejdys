import styled from "styled-components";

export const Container = styled.div`
  width: 375px;
  height: 812px;
  background: white;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 30px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
`;

export const Notch = styled.div`
  height: 30px;
  background: #DCDCE5;
  border-radius: 0 0 30px 30px;
  margin: 0 auto 0;
  width: 215px;
  flex-shrink: 0;
`;

export const Content = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-bottom: 73px;
`;

export const ContentContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const BottomPart = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 73px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 8px;
  z-index: 10;
  border: 1px solid #E3E3E5;
`;

export const BottomBar = styled.div`
  width: 135px;
  height: 5px;
  background: #666666;
  border-radius: 100px;
`;
