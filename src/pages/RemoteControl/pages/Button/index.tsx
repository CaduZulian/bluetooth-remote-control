// icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

// native components
import { View, Button } from 'react-native'

// styled components
import {
  ButtonsGroup,
  DirectionButton,
  DirectionContainer,
  DirectionItem
} from '../../styles'

interface ButtonPageProps {
  popupsHeadlightsIsOn: boolean;
  headlightIsOn: boolean;
  arrowsIsOn: boolean;
  setPopupsHeadlightsIsOn: (value: boolean) => void;
  setHeadlightIsOn: (value: boolean) => void;
  setArrowsIsOn: (value: boolean) => void;
  setCommand: (value: string) => void;
  setDirectionalCommand: (value: string) => void;
}

export const ButtonPage: React.FC<ButtonPageProps> = ({
  popupsHeadlightsIsOn,
  headlightIsOn,
  arrowsIsOn,
  setPopupsHeadlightsIsOn,
  setHeadlightIsOn,
  setArrowsIsOn,
  setCommand,
  setDirectionalCommand
}) => {
  return (
    <>
      <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <ButtonsGroup>
          <Button
            color={popupsHeadlightsIsOn ? "#0614AE" : "#afafaf"}
            title="Popups"
            onPress={() => {
              setPopupsHeadlightsIsOn(!popupsHeadlightsIsOn)
              setCommand(!popupsHeadlightsIsOn ? "popupsOn" : "popupsOff")
            }}
          />

          <Button
            color={headlightIsOn ? "#0614AE" : "#afafaf"}
            title="Luzes"
            onPress={() => {
              setHeadlightIsOn(!headlightIsOn)
              setCommand(!headlightIsOn ? "headlightOn" : "headlightOff")
            }}
          />

          <Button
            color={arrowsIsOn ? "#0614AE" : "#afafaf"}
            title="Lanternas"
            onPress={() => {
              setArrowsIsOn(!arrowsIsOn)
              setCommand(!arrowsIsOn ? "arrowsOn" : "arrowsOff")
            }}
          />
        </ButtonsGroup>
      </View>

      <DirectionContainer>
        <DirectionItem>
          <DirectionButton
            style={{ width: "100%", height: "100%", marginBottom: 16 }}
            underlayColor='#B0B0B0'
            onPress={() => setCommand('stop')}
            onShowUnderlay={() => setCommand('goForward')}
          >
            <MaterialIcons name="arrow-drop-up" size={30} />
          </DirectionButton>

          <DirectionButton
            style={{ width: "100%", height: "100%" }}
            underlayColor='#B0B0B0'
            onPress={() => setCommand('stop')}
            onShowUnderlay={() => setCommand('goBack')}
          >
            <MaterialIcons name="arrow-drop-down" size={30} />
          </DirectionButton>
        </DirectionItem>

        <DirectionItem
          style={{ marginLeft: 32, flexDirection: 'row', height: "100%" }}
        >
          <DirectionButton
            style={{ height: "60%", marginRight: 16 }}
            underlayColor='#B0B0B0'
            onPress={() => setDirectionalCommand('stopSteering')}
            onShowUnderlay={() => setDirectionalCommand('goLeft')}
          >
            <MaterialIcons name="arrow-left" size={30} />
          </DirectionButton>

          <DirectionButton
            style={{ height: "60%" }}
            underlayColor='#B0B0B0'
            onPress={() => setDirectionalCommand('stopSteering')}
            onShowUnderlay={() => setDirectionalCommand('goRight')}
          >
            <MaterialIcons name="arrow-right" size={30} />
          </DirectionButton>
        </DirectionItem>
      </DirectionContainer>
    </>
  )
}