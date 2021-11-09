import React from 'react'
import { View, Text, Image, StyleSheet, StatusBar } from 'react-native'
import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack'
import GradientButton from '../../components/GradientButton'
import { useNavigation } from '@react-navigation/core'

export const PostJobSuccessOptions: StackNavigationOptions = {
  title: '职位发布成功',
  headerLeft: () => null,
}

export default function PostJobSuccess() {
  const navigation = useNavigation<StackNavigationProp<any>>()
  const handlePress = () => {
    console.log('完成')
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <Image style={styles.icon} source={require('./chenggong.png')} />
      <Text style={styles.title}>发布成功</Text>
      <Text style={styles.detail}>已上线至求职端</Text>
      <GradientButton text="完成" style={styles.button} onPress={handlePress} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    marginTop: 38,
  },
  title: {
    marginTop: 20,
    color: '#333333',
    fontWeight: '400',
    fontSize: 15,
  },
  detail: {
    marginTop: 10,
    color: '#888888',
    fontSize: 13,
  },
  button: {
    alignSelf: 'stretch',
    marginHorizontal: 20,
    marginTop: 48,
  },
})
