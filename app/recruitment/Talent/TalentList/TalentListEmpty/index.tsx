import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import FocusAwareStatusBar from '../../../components/FocusAwareStatusBar'
import GradientButton from '../../../components/GradientButton'

interface TalentListEmptyProps {
  onPublishPress?: () => void
}

export function TalentListEmpty({ onPublishPress }: TalentListEmptyProps) {
  return (
    <View style={styles.container}>
      {/*<FocusAwareStatusBar barStyle={'dark-content'} />*/}
      <Image source={require('./404.png')} />
      <Text style={styles.title}>您还没有发布职位</Text>
      <Text style={styles.detail}>发布职位后，可以获取精准的人才推荐</Text>
      <GradientButton
        title="发布职位"
        style={styles.button}
        onPress={onPublishPress}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    color: '#333333',
    fontSize: 15,
  },
  detail: {
    marginTop: 10,
    color: '#888888',
    fontSize: 13,
  },
  button: {
    margin: 32,
    width: 120,
  },
})

export default TalentListEmpty
