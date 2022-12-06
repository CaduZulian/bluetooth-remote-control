// icons
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

// native components
import { Modal, View } from 'react-native'

// styled components
import {
  ModalButton,
  ModalContainer,
  ModalText,
  ModalTitle,
  ModalView
} from './styles'

interface ModalOptionsProps {
  open: boolean;
  onClose: () => void;
  currentPage: 'noButton' | 'button';
  setCurrentPage: (value: 'noButton' | 'button') => void;
}

export const ModalOptions: React.FC<ModalOptionsProps> = ({ open, onClose, currentPage, setCurrentPage }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={open}
    >
      <ModalContainer>
        <ModalView>
          <View style={{ width: '100%', flexDirection: "row", justifyContent: 'space-between' }}>
            <ModalTitle>
              Interface de direção:
            </ModalTitle>

            <SimpleLineIcons
              name="close"
              size={20}
              onPress={() => onClose()}
            />
          </View>

          <ModalButton
            activeOpacity={0.9}
            underlayColor={currentPage === 'noButton' ?
              "#040E79" :
              "#8a8a8a"
            }
            style={{
              marginTop: 16,
              backgroundColor: currentPage === 'noButton' ?
                "#0614AE" :
                "#afafaf"
            }}
            onPress={() => {
              setCurrentPage('noButton')
              setTimeout(() => onClose(), 100)
            }}
          >
            <ModalText style={{
              color: currentPage === 'noButton' ?
                "#fff" :
                "#000"
            }}>
              Sem Botões
            </ModalText>
          </ModalButton>

          <ModalButton
            activeOpacity={0.9}
            underlayColor={currentPage === 'button' ?
              "#040E79" :
              "#8a8a8a"
            }
            style={{
              marginTop: 8,
              backgroundColor: currentPage === 'button' ?
                "#0614AE" :
                "#afafaf"
            }}
            onPress={() => {
              setCurrentPage('button')
              setTimeout(() => onClose(), 100)
            }}
          >
            <ModalText style={{
              color: currentPage === 'button' ?
                "#fff" :
                "#000"
            }}>
              Com Botões
            </ModalText>
          </ModalButton>
        </ModalView>
      </ModalContainer>
    </Modal>
  )
}