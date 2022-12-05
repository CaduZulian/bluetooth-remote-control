import { css } from "styled-components";
import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  height: 100%;

  padding: 16px;

  align-items: center;
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
  justify-content: space-between;
  min-width: 250px;
`;
