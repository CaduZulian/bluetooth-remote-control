import React, { useEffect, useState } from 'react'
import BluetoothSerialDefault from 'react-native-bluetooth-serial'
import { OrientationLocker, PORTRAIT } from 'react-native-orientation-locker';
import Toast from 'react-native-toast-message';

// styled components
import {
  Container,
  ListItem,
  ListItemTitle,
  ListItemUuId,
  Subtitle,
} from "./styles";

// native components
import {
  Button,
  FlatList,
  View,
  Platform,
  PermissionsAndroid,
  Text,
  ActivityIndicator
} from 'react-native';
import { BluetoothIcon } from '../../hooks/bluetoothIcon';

type DeviceList = {
  id: string;
  name: string;
  class: number;
}

export default function BluetoothConnections({ navigation }: any) {
  const BluetoothSerial: any = BluetoothSerialDefault

  const [toastBluetoothIsOff, setToastBluetoothIsOff] = useState(false)

  const [loadingPairedDevices, setLoadingPairedDevices] = useState(false)
  const [loadingUnpairedDevices, setLoadingUnpairedDevices] = useState(false)
  const [pairedDevicesList, setPairedDevicesList] = useState<DeviceList[]>([])
  const [unpairedDevicesList, setUnpairedDevicesList] = useState<DeviceList[]>([])

  useEffect(() => {
    checkForBluetoothPermission()
  }, [])

  useEffect(() => {
    if (toastBluetoothIsOff) {
      Toast.show({
        type: "info",
        text1: "Bluetooth desligado",
        text2: "Ative o bluetooth para poder utilizar o app"
      })
    }
  }, [toastBluetoothIsOff])

  function BluetoothIsEnabled() {
    const interval = setInterval(() => {
      BluetoothSerial.isEnabled().then((isEnabled: boolean) => {
        if (isEnabled === true) {
          clearInterval(interval)
          setToastBluetoothIsOff(false)
          enableBluetoothInDevice()
        } else {
          setToastBluetoothIsOff(true)
        }
      })
    }, 100)
  }

  const checkForBluetoothPermission = () => {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      let finalPermission = Platform.Version >= 29
        ? PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        : PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION;
      PermissionsAndroid.check(finalPermission).then((result) => {
        if (result) {
          BluetoothIsEnabled()
        } else {
          PermissionsAndroid.request(finalPermission).then((result) => {
            if (result === PermissionsAndroid.RESULTS.GRANTED) {
              BluetoothIsEnabled()
            } else {
              Toast.show({
                type: "error",
                text1: "Não foi possível iniciar o bluetooth",
                text2: "Verifique as permissões do app e tente novamente"
              })
            }
          });
        }
      });
    }
    else {
      console.log("IOS");
      enableBluetoothInDevice()
    }
  }

  function enableBluetoothInDevice() {
    Toast.show({
      type: "success",
      text1: "Bluetooth ligado",
      text2: "Iniciando busca por aparelhos disponíveis..."
    })

    setLoadingPairedDevices(true)
    // setLoadingUnpairedDevices(true)
    BluetoothSerial.enable().then(() => {
      BluetoothSerial?.list().then((result: any) => {
        console.log(result)
        setPairedDevicesList(result)
        setLoadingPairedDevices(false)
      })

      // BluetoothSerial.discoverUnpairedDevices((result: any) => {
      //   setUnpairedDevicesList(result)
      // }).finally(() => {
      //   setLoadingUnpairedDevices(false)
      // })
    })
  }

  function connectToDevice({ id, name }: DeviceList) {
    Toast.show({
      type: "info",
      text1: `Conectando-se a ${name}`
    })
  }

  return (
    <Container>
      <OrientationLocker orientation={PORTRAIT} />

      {loadingPairedDevices || loadingUnpairedDevices ? (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <Subtitle style={{ marginTop: 12, marginRight: 12 }}>
            Buscando dispositivos
          </Subtitle>

          <ActivityIndicator />
        </View>
      ) : (
        <View>
          <Subtitle>
            Dispositivos conectados anteriormente:
          </Subtitle>

          {pairedDevicesList.length === 0 ? (
            <Subtitle style={{ textAlign: 'center', fontWeight: '400' }}>
              Nenhum dispositivo encontrado
            </Subtitle>
          ) : (
            <FlatList
              data={pairedDevicesList}
              renderItem={({ item }: { item: DeviceList }) => (
                <ListItem>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ marginRight: 12 }} >
                      {BluetoothIcon(item.class)}
                    </View>

                    <View>
                      <ListItemTitle>
                        {item.name}
                      </ListItemTitle>

                      <ListItemUuId>
                        {item.id}
                      </ListItemUuId>
                    </View>
                  </View>

                  <Button
                    title="Conectar"
                    onPress={() => {
                      connectToDevice(item)
                    }}
                  />
                </ListItem>
              )}
            />
          )}

          <Subtitle style={{ marginTop: 16 }}>
            Novos dispositivos:
          </Subtitle>

          {unpairedDevicesList.length === 0 ? (
            <Subtitle style={{ textAlign: 'center', fontWeight: '400' }}>
              Nenhum dispositivo encontrado
            </Subtitle>
          ) : (
            <FlatList
              data={unpairedDevicesList}
              renderItem={({ item }: { item: DeviceList }) => (
                <ListItem>
                  <View>
                    <Text>
                      {JSON.stringify(item)}
                    </Text>

                    <ListItemTitle>
                      {item.name}
                    </ListItemTitle>

                    <ListItemUuId>
                      {item.id}
                    </ListItemUuId>
                  </View>

                  <Button
                    title="Conectar"
                    onPress={() => {
                      connectToDevice(item)
                    }}
                  />
                </ListItem>
              )}
            />
          )}
        </View>
      )}
    </Container>
  )
}