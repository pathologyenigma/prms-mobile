import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import NavBar from '../../components/NavBar'
import TextButton from '../../components/TextButton'
import Crop from '../../components/Crop'
import { StackScreenProps } from '@react-navigation/stack'
import { HrParamList } from '../typings'

import * as mime from 'react-native-mime-types'

function generateRNFile(uri: string, name: string) {
  return uri
    ? {
        uri,
        type: mime.lookup(uri) || 'image',
        name,
      }
    : null
}

export default function AvatarCropper({
  navigation,
  route,
}: StackScreenProps<HrParamList, 'AvatarCropper'>) {
  const { width: SCREEN_WIDTH } = Dimensions.get('window')
  let crop = null
  const { uri, callback } = route.params || {}

  return (
    <View style={styles.container}>
      <NavBar
        style={styles.nav}
        headerRight={() => (
          <TextButton
            title="保存"
            textStyle={styles.saveText}
            onPress={async () => {
            	console.log(uri)
            	const cropped = await crop(1)
            	let filepath = cropped.uri
            	const config = generateRNFile(filepath, `file-${Date.now()}.${mime.extension(mime.lookup(filepath))}`)
            	console.log(config, cropped)
                HTAPI.CommonSingleUpload(config).then(response => {
                	let remoteUrl = response.data.CommonSingleUpload
                	HTAPI.UserEditBasicInfo({
                		info: { logo: remoteUrl }
                	}).then(response => {
                		ActionToast.show('修改成功!')
                		callback && callback(navigation, remoteUrl)
	            	})
                })
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
            uri: uri ?? '',
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
