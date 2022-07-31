import { Button, Center, Modal, NativeBaseProvider, ScrollView, Text, VStack } from 'native-base';

import React from 'react';
import { SafeAreaView } from 'react-native';

import { bootstrap } from './feats/main/flows/bootstrap';

bootstrap();

export default function App() {
  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <Example />
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

// @ts-nocheck
function Example() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [size, setSize] = React.useState('md');

  const handleSizeClick = (newSize: string) => {
    setSize(newSize);
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <Modal isOpen={modalVisible} onClose={setModalVisible} size={size}>
        <Modal.Content height="full" maxH="full">
          <Modal.CloseButton />
          <Modal.Header>Return Policy</Modal.Header>
          <Modal.Body>
            <ScrollView>
              <Text>
                Create a 'Return Request' under “My Orders” section of App/Website. Follow the
                screens that come up after tapping on the 'Return’ button. Please make a note of the
                Return ID that we generate at the end of the process. Keep the item ready for pick
                up or ship it to us basis on the return mode.
              </Text>
            </ScrollView>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Center>
        <VStack space={4}>
          {['xs', 'sm', 'md', 'lg', 'xl', 'full'].map((size) => {
            return (
              <Button
                onPress={() => handleSizeClick(size)}
                key={size}
              >{`Open ${size} Modal`}</Button>
            );
          })}
        </VStack>
      </Center>
    </>
  );
}
