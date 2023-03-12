import {useEffect, useRef, useState} from 'react';

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

// icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// native components
import {
  View,
  Button,
  TouchableHighlight,
  GestureResponderEvent,
} from 'react-native';

// models
import {IButtonsActions, NoButtonPageProps} from '../../models';

// styled components
import {
  ButtonsGroup,
  DirectionButton,
  DirectionContainer,
  RotationBar,
  RotationPosition,
  StartButton,
} from '../../styles';

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
  const buttonUpRef = useRef<TouchableHighlight>(null);
  const buttonDownRef = useRef<TouchableHighlight>(null);

  const [buttonsActions, setButtonsActions] = useState<IButtonsActions>({});
  const [activeButtons, setActiveButtons] = useState<string[]>([]);

  const autoFillButtonsActions = (
    ref: React.RefObject<TouchableHighlight>,
    key: string,
    onPressIn: () => void,
    onPressOut: () => void,
  ) => {
    ref.current?.measure((fx, fy, width, height, px, py) => {
      setButtonsActions(oldData => {
        return {
          ...oldData,
          [key]: {
            pageX: px,
            pageY: py,
            width: width,
            height: height,
            onPressIn: onPressIn,
            onPressOut: onPressOut,
          },
        };
      });
    });
  };

  const handlePress = (event: GestureResponderEvent) => {
    console.log('handlePress');
    Object.entries(buttonsActions).forEach(
      ([key, {pageX, pageY, width, height, onPressIn}]) => {
        if (
          event.nativeEvent.pageX > pageX &&
          event.nativeEvent.pageX < pageX + width &&
          event.nativeEvent.pageY > pageY &&
          event.nativeEvent.pageY < pageY + height
        ) {
          onPressIn();
          setActiveButtons(oldData => {
            return !oldData.includes(key) ? [...oldData, key] : oldData;
          });
        }
      },
    );
  };

  const handleRelease = (event: GestureResponderEvent) => {
    console.log('handleRelease');
    Object.entries(buttonsActions).forEach(
      ([key, {pageX, pageY, width, height, onPressOut}]) => {
        if (
          event.nativeEvent.pageX > pageX &&
          event.nativeEvent.pageX < pageX + width &&
          event.nativeEvent.pageY > pageY &&
          event.nativeEvent.pageY < pageY + height
        ) {
          onPressOut();
          setActiveButtons(oldData => oldData.filter(item => item !== key));
        }
      },
    );
  };

  useEffect(() => {
    setTimeout(() => {
      if (buttonUpRef.current) {
        autoFillButtonsActions(
          buttonUpRef,
          'up',
          () => setCommand(goForward),
          () => setCommand(stop),
        );
      }
      if (buttonDownRef.current) {
        autoFillButtonsActions(
          buttonDownRef,
          'down',
          () => setCommand(goBack),
          () => setCommand(stop),
        );
      }
    }, 1);
  }, [buttonUpRef, buttonDownRef]);

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
          onPress={activeButtons.includes('up')}
          ref={buttonUpRef}
          onStartShouldSetResponder={() => true}
          onResponderStart={event => {
            handlePress(event);
          }}
          onResponderEnd={event => {
            handleRelease(event);
          }}>
          <MaterialIcons name="arrow-drop-up" size={30} />
        </DirectionButton>

        <DirectionButton
          onPress={activeButtons.includes('down')}
          ref={buttonDownRef}
          onStartShouldSetResponder={() => true}
          onResponderStart={event => {
            handlePress(event);
          }}
          onResponderEnd={event => {
            handleRelease(event);
          }}>
          <MaterialIcons name="arrow-drop-down" size={30} />
        </DirectionButton>
      </DirectionContainer>
    </>
  );
};
