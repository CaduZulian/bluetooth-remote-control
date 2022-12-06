import React, { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message';
import BluetoothSerialDefault from 'react-native-bluetooth-serial'
import { LANDSCAPE, OrientationLocker } from 'react-native-orientation-locker';
import { accelerometer } from 'react-native-sensors';

// icons
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

// native components
import { Pressable } from 'react-native';

// styled components
import { Container } from "./styles";

// components
import { ModalOptions } from './components/ModalOptions';

// pages
import { ButtonPage } from './pages/Button';
import { NoButtonPage } from './pages/NoButton';

export default function RemoteControl({ navigation }: any) {
  const BluetoothSerial: any = BluetoothSerialDefault

  const [rotation, setRotation] = useState(0);

  const [optionsIsOpen, setOptionsIsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState<"noButton" | "button">('noButton')

  const [popupsHeadlightsIsOn, setPopupsHeadlightsIsOn] = useState(false)
  const [headlightIsOn, setHeadlightIsOn] = useState(false)
  const [arrowsIsOn, setArrowsIsOn] = useState(false)

  const [command, setCommand] = useState('')

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPressIn={() => setOptionsIsOpen(!optionsIsOpen)}>
          <SimpleLineIcons name="options-vertical" size={20} />
        </Pressable>
      )
    })
  }, [])

  useEffect(() => {
    BluetoothSerial.isConnected().then((result: boolean) => {
      // if(!result) {
      //   navigation.goBack()
      // }
    })

    return () => {
      Toast.show({
        type: "info",
        text1: "Dispositivo desconectado",
      })

      BluetoothSerial.disconnect()
    }
  }, [BluetoothSerial])

  useEffect(() => {
    let subscription: any

    if (currentPage === 'noButton') {
      subscription = accelerometer.subscribe(({ y }) => {
        setRotation(y)
      })
    } else if (subscription) {
      subscription.unsubscribe()
    }

    return () => {
      if(subscription) {
        subscription.unsubscribe()
      }
    }
  }, [currentPage])

  useEffect(() => {
    if (rotation < -0.5) {
      setCommand('goLeft')
    } else if (rotation > 0.5) {
      setCommand('goRight')
    } else {
      setCommand('stopSteering')
    }
  }, [rotation])

  useEffect(() => {
    if (command) {
      BluetoothSerial.write(command).then((result: any) => {
        Toast.show({
          type: "success",
          text1: "Dados enviados",
          text2: command
        })
      }).catch((err: any) => {
        Toast.show({
          type: "error",
          text1: "Dados não enviados",
          text2: err
        })
      })
    }
  }, [command])

  function renderCurrentPage() {
    switch (currentPage) {
      case 'button': {
        return (
          <ButtonPage

          />
        )
      }
      case 'noButton': {
        return (
          <NoButtonPage
            rotation={rotation}
            popupsHeadlightsIsOn={popupsHeadlightsIsOn}
            headlightIsOn={headlightIsOn}
            arrowsIsOn={arrowsIsOn}
            setPopupsHeadlightsIsOn={setPopupsHeadlightsIsOn}
            setHeadlightIsOn={setHeadlightIsOn}
            setArrowsIsOn={setArrowsIsOn}
            setCommand={setCommand}
          />
        )
      }

      default: {
        return <></>
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
  )
}