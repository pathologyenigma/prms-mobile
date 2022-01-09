import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import NavBar from '../../components/NavBar'
import TextButton from '../../components/TextButton'
import Crop from '../../components/Crop'

export default function AvatarCropper() {
  const { width: SCREEN_WIDTH } = Dimensions.get('window')
  let crop = async (quality?: number) => ({ uri: '', width: 0, height: 0 })

  return (
    <View style={styles.container}>
      <NavBar
        style={styles.nav}
        headerRight={() => (
          <TextButton
            title="保存"
            textStyle={styles.saveText}
            onPress={async () => {
              const cropped = await crop(1)
              console.log(cropped)
            }}
          />
        )}
        barStyle="light-content"
      />

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <Crop
          source={{
            uri: 'https://img95.699pic.com/photo/50034/7165.jpg_wh300.jpg',
          }}
          cropShape={'circle'}
          width={SCREEN_WIDTH}
          height={SCREEN_WIDTH * 1.3}
          cropArea={{
            width: SCREEN_WIDTH - 16,
            height: SCREEN_WIDTH - 16,
          }}
          borderWidth={0}
          backgroundColor={'#000000'}
          opacity={0.5}
          resizeMode="cover"
          onCrop={cropCallback => (crop = cropCallback)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  nav: {
    backgroundColor: '#000000',
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  saveText: {
    color: '#FFFFFF',
    fontSize: 15,
  },
})
