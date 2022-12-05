import React, { useEffect, useState } from 'react'
import BluetoothSerialDefault from 'react-native-bluetooth-serial'
import { OrientationLocker, PORTRAIT } from 'react-native-orientation-locker'
import Toast from 'react-native-toast-message'

// styled components
import {
  Container,
  ListItem,
  ListItemTitle,
  ListItemUuId,
  Subtitle,
} from "./styles"

// native components
import {
  Button,
  FlatList,
  View,
  Platform,
  PermissionsAndroid,
  ActivityIndicator
} from 'react-native'
import { BluetoothIcon } from '../../hooks/bluetoothIcon'

type DeviceList = {
  id: string;
  name: string;
  class: number;
}

export default function BluetoothConnections({ navigation }: any) {
  const BluetoothSerial: any = BluetoothSerialDefault

  const [bluetoothIsOff, setBluetoothIsOff] = useState(false)

  const [loadingPairedDevices, setLoadingPairedDevices] = useState(false)
  const [loadingUnpairedDevices, setLoadingUnpairedDevices] = useState(false)
  const [pairedDevicesList, setPairedDevicesList] = useState<DeviceList[]>([])
  const [unpairedDevicesList, setUnpairedDevicesList] = useState<DeviceList[]>([])

  const [connectionId, setConnectionId] = useState('')

  useEffect(() => {
    checkForBluetoothPermission()
  }, [])

  useEffect(() => {
    if (bluetoothIsOff) {
      BluetoothSerial.requestEnable()
    }
  }, [bluetoothIsOff])

  function BluetoothIsEnabled() {
    let interval: any

    BluetoothSerial.isEnabled().then((isEnabled: boolean) => {
      if (isEnabled) {
        interval = setInterval(bluetoothOn, 1000)
      } else {
        interval = setInterval(bluetoothOff, 100)
      }
    })

    function bluetoothOff() {
      BluetoothSerial.isEnabled().then((isEnabled: boolean) => {
        if (isEnabled === true) {
          clearInterval(interval)
          setBluetoothIsOff(false)
          findBluetoothDevices()
          interval = setInterval(bluetoothOn, 1000)
        } else {
          setBluetoothIsOff(true)
        }
      })
    }

    function bluetoothOn() {
      BluetoothSerial.isEnabled().then((isEnabled: boolean) => {
        if (isEnabled === false) {
          clearInterval(interval)
          setBluetoothIsOff(true)
          interval = setInterval(bluetoothOff, 100)
        } else {
          setBluetoothIsOff(false)
        }
      })
    }
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
  }

  function findBluetoothDevices(requeue?: boolean) {
    requeue ? (
      Toast.show({
        type: "success",
        text1: "Nova busca iniciada",
        text2: "Iniciando busca por aparelhos disponíveis..."
      })
    ) : (
      Toast.show({
        type: "success",
        text1: "Bluetooth ligado",
        text2: "Iniciando busca por aparelhos disponíveis..."
      })
    )

    setLoadingPairedDevices(true)
    setLoadingUnpairedDevices(true)
    BluetoothSerial.enable().then(() => {
      BluetoothSerial?.list().then((result: any) => {
        setPairedDevicesList(result)
        setLoadingPairedDevices(false)
      })

      BluetoothSerial.discoverUnpairedDevices().then((result: any) => {
        setUnpairedDevicesList(result)
      }).finally(() => {
        setLoadingUnpairedDevices(false)
      })
    })
  }

  function connectToDevice({ id, name }: DeviceList) {
    Toast.show({
      type: "info",
      text1: `Conectando-se a ${name}`
    })

    setConnectionId(id)
    BluetoothSerial.connect(id).then(() => {
      Toast.show({
        type: "success",
        text1: `Dispositivos pareados com sucesso!`
      })
      navigation.navigate('RemoteControl')
    }).catch((err: any) => {
      Toast.show({
        type: "error",
        text1: `Ocorreu um erro ao se parear ao dispositivo`
      })
    }).finally(() => {
      setConnectionId('')
    })
  }

  return (
    <Container>
      <OrientationLocker orientation={PORTRAIT} />

      <View>
        <Subtitle>
          Dispositivos conectados anteriormente:
        </Subtitle>

        {loadingPairedDevices ? (
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <Subtitle style={{ marginTop: 12, marginRight: 12 }}>
              Buscando dispositivos
            </Subtitle>

            <ActivityIndicator />
          </View>
        ) : pairedDevicesList.length === 0 ? (
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
                  disabled={connectionId || bluetoothIsOff ? true : false}
                  title={connectionId === item.id ? "Conectando..." : "Conectar"}
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

        {loadingUnpairedDevices ? (
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <Subtitle style={{ marginTop: 12, marginRight: 12 }}>
              Buscando dispositivos
            </Subtitle>

            <ActivityIndicator />
          </View>
        ) : unpairedDevicesList.length === 0 ? (
          <Subtitle style={{ textAlign: 'center', fontWeight: '400' }}>
            Nenhum dispositivo encontrado
          </Subtitle>
        ) : (
          <FlatList
            data={unpairedDevicesList}
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
                  disabled={connectionId || bluetoothIsOff ? true : false}
                  title={connectionId === item.id ? "Conectando..." : "Conectar"}
                  onPress={() => {
                    connectToDevice(item)
                  }}
                />
              </ListItem>
            )}
          />
        )}
      </View>
      <Button
        disabled={loadingUnpairedDevices || loadingPairedDevices || bluetoothIsOff ? true : false}
        title="Refazer busca"
        onPress={() => {
          findBluetoothDevices(true)
        }}
      />
    </Container>
  )
}