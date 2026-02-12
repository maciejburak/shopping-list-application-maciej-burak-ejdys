import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  pointer-events: auto;
`;

export const Dialog = styled.div`
  width: 375px;
  height: 333px;
  background: white;
  position: absolute;
  top: 146px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 -4px 4px 0 rgba(0, 0, 0, 0.1);
`;

export const Header = styled.div`
  padding: 16px 20px;
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 8px;
  top: 30px;
  transform: translateY(-50%);
`;

export const Content = styled.div`
  padding: 24px 20px;
  flex: 1;
  overflow-y: auto;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Row = styled.div`
  display: flex;
  gap: 12px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Input = styled.input`
  width: 157px;
  padding: 12px 0;
  border: none;
  border-bottom: 1px solid #E3E3E5;
  font-size: 16px;
  color: #333;
  background: white;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-bottom-color: #FF9500;
  }
`;

export const Textarea = styled.textarea`
  padding: 12px 0;
  border: none;
  font-size: 16px;
  color: #333;
  background: white;
  min-height: 120px;
  resize: none;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-bottom-color: #FF9500;
  }
`;

export const Footer = styled.div`
  padding: 16px 20px;
  display: flex;
  justify-content: flex-end;
`;

export const SubmitButton = styled.button`
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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
