import {Pressable} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;

  padding: 16px;

  align-items: center;
  justify-content: space-between;
`;

export const RotationBar = styled.View`
  margin: 16px;
  height: 4px;
  width: 100%;
  background-color: #a9a9a9;
  border-radius: 2px;
  align-items: center;
`;

export const RotationPosition = styled.View`
  height: 100%;
  width: 4px;
  background-color: #00ff00;

  transition: all 0.2s ease-in;
`;

export const ButtonsGroup = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-width: 300px;

  margin-bottom: 32px;
`;

export const DirectionContainer = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const DirectionItem = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const DirectionButton = styled.TouchableHighlight`
  flex: 1;
  align-items: center;
  justify-content: center;

  height: 100%;
  background-color: #dddddd;
`;

export const StartButton = styled(Pressable)`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 35px;
`;
