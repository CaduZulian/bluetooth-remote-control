import {useEffect, useRef, useState} from 'react';

import {
  arrowsOff,
  arrowsOn,
  goBack,
  goForward,
  goLeft,
  goRight,
  headlightOff,
  headlightOn,
  motorsOff,
  motorsOn,
  popupsOff,
  popupsOn,
  stop,
  stopSteering,
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
import {ButtonPageProps, IButtonsActions} from '../../models';

// styled components
import {
  ButtonsGroup,
  DirectionButton,
  DirectionContainer,
  DirectionItem,
  StartButton,
} from '../../styles';

export const ButtonPage: React.FC<ButtonPageProps> = ({
  motorsIsOn,
  popupsHeadlightsIsOn,
  headlightIsOn,
  arrowsIsOn,
  setMotorsIsOn,
  setPopupsHeadlightsIsOn,
  setHeadlightIsOn,
  setArrowsIsOn,
  setCommand,
  setDirectionalCommand,
}) => {
  const buttonUpRef = useRef<TouchableHighlight>(null);
  const buttonDownRef = useRef<TouchableHighlight>(null);
  const buttonLeftRef = useRef<TouchableHighlight>(null);
  const buttonRightRef = useRef<TouchableHighlight>(null);

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
      if (buttonLeftRef.current) {
        autoFillButtonsActions(
          buttonLeftRef,
          'left',
          () => setDirectionalCommand(goLeft),
          () => setDirectionalCommand(stopSteering),
        );
      }
      if (buttonRightRef.current) {
        autoFillButtonsActions(
          buttonRightRef,
          'right',
          () => setDirectionalCommand(goRight),
          () => setDirectionalCommand(stopSteering),
        );
      }
    }, 1);
  }, [buttonUpRef, buttonDownRef, buttonLeftRef, buttonRightRef]);

  return (
    <>
      <View
        style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
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
        <DirectionItem>
          <DirectionButton
            onPress={activeButtons.includes('up')}
            ref={buttonUpRef}
            style={{width: '100%', height: '100%', marginBottom: 16}}
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
            style={{width: '100%', height: '100%'}}
            onStartShouldSetResponder={() => true}
            onResponderStart={event => {
              handlePress(event);
            }}
            onResponderEnd={event => {
              handleRelease(event);
            }}>
            <MaterialIcons name="arrow-drop-down" size={30} />
          </DirectionButton>
        </DirectionItem>

        <DirectionItem
          style={{marginLeft: 32, flexDirection: 'row', height: '100%'}}>
          <DirectionButton
            onPress={activeButtons.includes('left')}
            ref={buttonLeftRef}
            style={{height: '60%', marginRight: 16}}
            onStartShouldSetResponder={() => true}
            onResponderStart={event => {
              handlePress(event);
            }}
            onResponderEnd={event => {
              handleRelease(event);
            }}>
            <MaterialIcons name="arrow-left" size={30} />
          </DirectionButton>

          <DirectionButton
            onPress={activeButtons.includes('right')}
            ref={buttonRightRef}
            style={{height: '60%'}}
            onStartShouldSetResponder={() => true}
            onResponderStart={event => {
              handlePress(event);
            }}
            onResponderEnd={event => {
              handleRelease(event);
            }}>
            <MaterialIcons name="arrow-right" size={30} />
          </DirectionButton>
        </DirectionItem>
      </DirectionContainer>
    </>
  );
};
