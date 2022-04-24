import React, { useState } from 'react'
import { ImageSourcePropType } from 'react-native'
import {
  ViewStyle,
  StyleProp,
  TextStyle,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native'
import ActionSheet, { ActionSheetProps } from '../../../components/ActionSheet'
import BottomModal from '../../../components/BottomModal'

interface Ungraded {
  icon: ImageSourcePropType
  title: string
}

const ungradeds = [
  {
    icon: require('./animal.png'),
    title: '非任务照',
  },
  {
    icon: require('./baffle.png'),
    title: '五官遮挡',
  },
  {
    icon: require('./blur.png'),
    title: '模糊不清',
  },
  {
    icon: require('./clothing.png'),
    title: '衣着不当',
  },
]

interface AvatarPickerModalProps {
  visible: boolean
  onDismiss?: () => void
  actions?: ActionSheetProps['actions']
}

export default function AvatarPickerModal({
  visible,
  onDismiss,
  actions,
}: AvatarPickerModalProps) {
  const renderHeader = () => {
    return (
      <View>
        <View style={styles.heading}>
          <Image style={styles.standard} source={require('./standard.png')} />
          <View>
            <View style={styles.rightRow}>
              <Image style={styles.rightIcon} source={require('./right.png')} />
              <Text style={styles.rightTitle}>正确示范</Text>
            </View>
            <Text style={styles.rightDetail}>上传真实头像，更容易赢得好感</Text>
          </View>
        </View>
        <View style={styles.poorRow}>
          <Image style={styles.poorIcon} source={require('./poor.png')} />
          <Text style={styles.poorTitle}>不佳示范</Text>
        </View>
        <View style={styles.ungradeds}>
          {ungradeds.map(u => (
            <View key={u.title} style={styles.ungradedItem}>
              <Image style={styles.ungradedIcon} source={u.icon} />
              <Text style={styles.ungradedTitle}>{u.title}</Text>
            </View>
          ))}
        </View>
      </View>
    )
  }

  return (
    <ActionSheet
      visible={visible}
      renderHeader={renderHeader}
      actions={actions}
      onDismiss={onDismiss}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    flexDirection: 'row',
    marginLeft: 16,
    marginTop: 20,
  },
  standard: {
    marginRight: 25,
  },
  rightRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightIcon: {},
  rightTitle: {
    marginLeft: 9,
    color: '#333333',
    fontSize: 17,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  rightDetail: {
    color: '#666666',
    fontSize: 12,
    lineHeight: 17,
    marginTop: 10,
  },
  poorRow: {
    flexDirection: 'row',
    marginTop: 25,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  poorIcon: {
    marginRight: 9,
  },
  poorTitle: {
    color: '#333333',
    fontSize: 17,
    lineHeight: 24,
  },
  ungradeds: {
    flexDirection: 'row',
    marginTop: 22,
    paddingBottom: 24,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    borderBottomColor: '#EAEAEA',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  ungradedItem: {
    alignItems: 'center',
  },
  ungradedIcon: {},
  ungradedTitle: {
    color: '#666666',
    fontSize: 12,
    lineHeight: 17,
    marginTop: 11,
  },
  button: {
    borderBottomColor: '#E1E1E1',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  action: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
  },
  seperator: {
    height: 5,
    width: '100%',
    backgroundColor: '#F7F7F7',
  },
})
