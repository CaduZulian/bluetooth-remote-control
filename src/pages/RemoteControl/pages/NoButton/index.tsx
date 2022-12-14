// icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// native components
import {View, Button} from 'react-native';

// styled components
import {
  ButtonsGroup,
  DirectionButton,
  DirectionContainer,
  RotationBar,
  RotationPosition,
  StartButton,
} from '../../styles';

import {
  arrowsOff,
  arrowsOn,
  goBack,
  goForward,
  headlightOff,
  headlightOn,
  motorsOff,
  motorsOn,
  popupsOff,
  popupsOn,
  stop,
} from '../../../../constants/commands';

interface NoButtonPageProps {
  rotation: number;
  motorsIsOn: boolean;
  popupsHeadlightsIsOn: boolean;
  headlightIsOn: boolean;
  arrowsIsOn: boolean;
  setMotorsIsOn: (value: boolean) => void;
  setPopupsHeadlightsIsOn: (value: boolean) => void;
  setHeadlightIsOn: (value: boolean) => void;
  setArrowsIsOn: (value: boolean) => void;
  setCommand: (value: string) => void;
}

export const NoButtonPage: React.FC<NoButtonPageProps> = ({
  rotation,
  motorsIsOn,
  popupsHeadlightsIsOn,
  headlightIsOn,
  arrowsIsOn,
  setMotorsIsOn,
  setPopupsHeadlightsIsOn,
  setHeadlightIsOn,
  setArrowsIsOn,
  setCommand,
}) => {
  return (
    <>
      <View
        style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <RotationBar>
          <RotationPosition
            style={{backgroundColor: '#ff0000', position: 'absolute'}}
          />
          <RotationPosition style={{marginLeft: `${rotation * 10}%`}} />
        </RotationBar>

        <ButtonsGroup>
          <StartButton
            style={{backgroundColor: motorsIsOn ? '#0614AE' : '#afafaf'}}
            onPress={() => {
              setMotorsIsOn(!motorsIsOn);
              setCommand(!popupsHeadlightsIsOn ? motorsOn : motorsOff);
            }}>
            <MaterialIcons
              name="power-settings-new"
              size={25}
              color="#FFFFFF"
            />
          </StartButton>

          <Button
            color={popupsHeadlightsIsOn ? '#0614AE' : '#afafaf'}
            title="Popups"
            onPress={() => {
              setPopupsHeadlightsIsOn(!popupsHeadlightsIsOn);
              setCommand(!popupsHeadlightsIsOn ? popupsOn : popupsOff);
            }}
          />

          <Button
            color={headlightIsOn ? '#0614AE' : '#afafaf'}
            title="Luzes"
            onPress={() => {
              setHeadlightIsOn(!headlightIsOn);
              setCommand(!headlightIsOn ? headlightOn : headlightOff);
            }}
          />

          <Button
            color={arrowsIsOn ? '#0614AE' : '#afafaf'}
            title="Lanternas"
            onPress={() => {
              setArrowsIsOn(!arrowsIsOn);
              setCommand(!arrowsIsOn ? arrowsOn : arrowsOff);
            }}
          />
        </ButtonsGroup>
      </View>

      <DirectionContainer>
        <DirectionButton
          style={{marginRight: 32}}
          underlayColor="#B0B0B0"
          onPress={() => setCommand(stop)}
          onShowUnderlay={() => setCommand(goForward)}>
          <MaterialIcons name="arrow-drop-up" size={30} />
        </DirectionButton>

        <DirectionButton
          underlayColor="#B0B0B0"
          onPress={() => setCommand(stop)}
          onShowUnderlay={() => setCommand(goBack)}>
          <MaterialIcons name="arrow-drop-down" size={30} />
        </DirectionButton>
      </DirectionContainer>
    </>
  );
};
