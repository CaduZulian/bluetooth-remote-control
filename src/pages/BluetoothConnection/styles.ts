import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #fff;
  width: 100%;
  height: 100%;
  padding: 16px;

  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 16px;
  margin-bottom: 16px;
  font-weight: 500;

  color: #333333;
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  margin-bottom: 16px;
  font-weight: 500;

  color: #333333;
`;

export const ListItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 50px;

  align-items: center;

  border-bottom: 1px solid #999;
`;

export const ListItemTitle = styled.Text`
  font-size: 16px;
  color: #000000;
`;

export const ListItemUuId = styled.Text`
  font-size: 14px;
  color: #333333;
`;
