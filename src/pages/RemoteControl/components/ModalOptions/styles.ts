import styled from "styled-components/native";

export const ModalContainer = styled.View`
  align-items: flex-end;
`

export const ModalView = styled.View`
  width: 30%;
  background-color: #fff;
  border: 1px solid #DDDDDD;

  border-radius: 4px;

  flex-direction: column;

  padding: 12px;

  align-items: flex-start;
`

export const ModalTitle = styled.Text`
  font-size: 16px;
  color: #111;
`

export const ModalButton = styled.TouchableHighlight`
  width: 100%;
  padding: 6px;

  border-radius: 6px;

  background-color: #DDDDDD;
`

export const ModalText = styled.Text`
  font-size: 14px;
  color: #111;
`