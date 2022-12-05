import React, { useEffect, useState } from 'react'
import { Button, View, Pressable, Text } from 'react-native';
import { LANDSCAPE, OrientationLocker } from 'react-native-orientation-locker';
import { accelerometer, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
import Toast from 'react-native-toast-message';

import BluetoothSerialDefault from 'react-native-bluetooth-serial'

import {
  Container,
  RotationBar,
  RotationPosition,
  ButtonsGroup,
} from "./styles";


export default function RemoteControl() {
  const BluetoothSerial: any = BluetoothSerialDefault

  const [rotation, setRotation] = useState(0);

  const [popupsHeadlightsIsOn, setPopupsHeadlightsIsOn] = useState(false)
  const [headlightIsOn, setHeadlightIsOn] = useState(false)
  const [arrowsIsOn, setArrowsIsOn] = useState(false)

  setUpdateIntervalForType(SensorTypes.accelerometer, 100); // defaults to 100ms

  useEffect(() => {
    accelerometer.subscribe(({ y }) => {
      setRotation(y)
    })
  }, [])

  function writeData(data: any) {
    BluetoothSerial.write(data).then((result: any) => {
      Toast.show({
        type: "success",
        text1: "Dados enviados",
      })
    }).catch((err: any) => {
      console.log(err)
      Toast.show({
        type: "error",
        text1: "Dados não enviados",
      })
    })
  }

  useEffect(() => {
    BluetoothSerial.isConnected().then((result: boolean) => {
      console.log(result)
    })

    return () => {
      Toast.show({
        type: "info",
        text1: "Dispositivo desconectado",
      })

      BluetoothSerial.disconnect()
    }
  }, [BluetoothSerial])

  return (
    <Container>
      <OrientationLocker orientation={LANDSCAPE} />
      <RotationBar>
        <RotationPosition style={{ backgroundColor: '#ff0000', position: 'absolute' }} />
        <RotationPosition style={{ marginLeft: `${rotation * 10}%` }} />
      </RotationBar>

      <View style={{ width: '100%', alignItems: 'center' }}>
        <ButtonsGroup>
          <Button
            color={popupsHeadlightsIsOn ? "#0614AE" : "#afafaf"}
            title="Popups"
            onPress={() => {
              writeData('popups')
              setPopupsHeadlightsIsOn(!popupsHeadlightsIsOn)
            }}
          />

          <Button
            color={headlightIsOn ? "#0614AE" : "#afafaf"}
            title="Luzes"
            onPress={() => setHeadlightIsOn(!headlightIsOn)}
          />

          <Button
            color={arrowsIsOn ? "#0614AE" : "#afafaf"}
            title="Lanternas"
            onPress={() => setArrowsIsOn(!arrowsIsOn)}
          />
        </ButtonsGroup>
      </View>

      <View style={{ height: '100%', width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Pressable
          style={{ width: '48%', height: '60%', backgroundColor: '#00ff00' }}
          onPress={() => console.warn('frente')}
        >
          <Text>
            pra frente
          </Text>
        </Pressable>
        <Pressable
          style={{ width: '48%', height: '60%', backgroundColor: '#00ff00' }}
          onPress={() => console.warn('ré')}
        >
          <Text>
            pra trás
          </Text>
        </Pressable>
      </View>
    </Container>
  )
}