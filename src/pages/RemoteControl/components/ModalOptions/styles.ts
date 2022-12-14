import styled from 'styled-components/native';

export const ModalContainer = styled.View`
  align-items: flex-end;
  flex: 1;
  margin-right: -5%;
  margin-top: -5%;
`;

export const ModalView = styled.View`
  width: 32%;
  background-color: #fff;
  border: 1px solid #dddddd;

  border-radius: 4px;

  flex-direction: column;

  padding: 12px;

  align-items: flex-start;
`;

export const ModalTitle = styled.Text`
  font-size: 16px;
  color: #111;
`;

export const ModalButton = styled.TouchableHighlight`
  width: 100%;
  padding: 6px;

  border-radius: 6px;

  background-color: #dddddd;
`;

export const ModalText = styled.Text`
  font-size: 14px;
  color: #111;
`;
