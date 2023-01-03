import React, {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import BluetoothSerialDefault from 'react-native-bluetooth-serial-v2';
import {LANDSCAPE, OrientationLocker} from 'react-native-orientation-locker';
import {
  accelerometer,
  SensorTypes,
  setUpdateIntervalForType,
} from 'react-native-sensors';

// icons
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

// native components
import {Pressable} from 'react-native';

// styled components
import {Container} from './styles';

// components
import {ModalOptions} from './components/ModalOptions';

// pages
import {ButtonPage} from './pages/Button';
import {NoButtonPage} from './pages/NoButton';

import {goLeft, goRight, stopSteering} from '../../constants/commands';

export default function RemoteControl({navigation, route}: any) {
  const BluetoothSerial: any = BluetoothSerialDefault;
  const props = route.params;

  const [rotation, setRotation] = useState(0);

  const [optionsIsOpen, setOptionsIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'noButton' | 'button'>(
    'noButton',
  );

  const [motorsIsOn, setMotorsIsOn] = useState(false);
  const [popupsHeadlightsIsOn, setPopupsHeadlightsIsOn] = useState(false);
  const [headlightIsOn, setHeadlightIsOn] = useState(false);
  const [arrowsIsOn, setArrowsIsOn] = useState(false);

  const [command, setCommand] = useState('');
  const [directionalCommand, setDirectionalCommand] = useState('');

  setUpdateIntervalForType(SensorTypes.accelerometer, 350); // defaults to 100ms

  useEffect(() => {
    navigation.setOptions({
      title: `Controle Remoto - ${props?.deviceName}`,
      headerRight: () => {
        return (
          <Pressable onPressIn={() => setOptionsIsOpen(!optionsIsOpen)}>
            <SimpleLineIcons name="options-vertical" size={20} color={'#111'} />
          </Pressable>
        );
      },
    });
  }, []);

  useEffect(() => {
    BluetoothSerial.isConnected().then((result: boolean) => {
      // if (!result) {
      //   navigation.goBack();
      // }
    });

    return () => {
      Toast.show({
        type: 'info',
        text1: 'Dispositivo desconectado',
      });

      BluetoothSerial.disconnect();
    };
  }, [BluetoothSerial]);

  useEffect(() => {
    let subscription: any;

    if (currentPage === 'noButton') {
      subscription = accelerometer.subscribe(({y}) => {
        setRotation(y);

        if (y < -0.5 && directionalCommand !== 'goLeft') {
          setDirectionalCommand(goLeft);
        } else if (y > 0.5 && directionalCommand !== 'goRight') {
          setDirectionalCommand(goRight);
        } else if (directionalCommand !== 'stopSteering') {
          setDirectionalCommand(stopSteering);
        }
      });
    } else if (subscription) {
      subscription.unsubscribe();
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [currentPage]);

  function writeData(command: string) {
    BluetoothSerial.write(command).catch((err: any) => {
      Toast.show({
        type: 'error',
        text1: 'Dados não enviados',
        text2: err,
      });
    });
  }

  useEffect(() => {
    if (command) {
      writeData(command);
    }
  }, [command]);

  useEffect(() => {
    if (directionalCommand) {
      writeData(directionalCommand);
    }
  }, [directionalCommand]);

  function renderCurrentPage() {
    switch (currentPage) {
      case 'button': {
        return (
          <ButtonPage
            motorsIsOn={motorsIsOn}
            popupsHeadlightsIsOn={popupsHeadlightsIsOn}
            headlightIsOn={headlightIsOn}
            arrowsIsOn={arrowsIsOn}
            setMotorsIsOn={setMotorsIsOn}
            setPopupsHeadlightsIsOn={setPopupsHeadlightsIsOn}
            setHeadlightIsOn={setHeadlightIsOn}
            setArrowsIsOn={setArrowsIsOn}
            setCommand={setCommand}
            setDirectionalCommand={setDirectionalCommand}
          />
        );
      }
      case 'noButton': {
        return (
          <NoButtonPage
            rotation={rotation}
            motorsIsOn={motorsIsOn}
            popupsHeadlightsIsOn={popupsHeadlightsIsOn}
            headlightIsOn={headlightIsOn}
            arrowsIsOn={arrowsIsOn}
            setMotorsIsOn={setMotorsIsOn}
            setPopupsHeadlightsIsOn={setPopupsHeadlightsIsOn}
            setHeadlightIsOn={setHeadlightIsOn}
            setArrowsIsOn={setArrowsIsOn}
            setCommand={setCommand}
          />
        );
      }

      default: {
        return <></>;
      }
    }
  }

  return (
    <Container>
      <OrientationLocker orientation={LANDSCAPE} />

      {renderCurrentPage()}

      <ModalOptions
        open={optionsIsOpen}
        onClose={() => setOptionsIsOpen(false)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Container>
  );
}
