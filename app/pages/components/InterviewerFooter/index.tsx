import React, { PureComponent } from 'react'
import { View, Image, Text, StyleProp, ViewStyle, TextStyle, StyleSheet } from 'react-native'
import { greenColor } from '../../../utils/constant'
import SystemHelper from '../../../utils/system'
import LinearGradient from 'react-native-linear-gradient'
import NextTouchableOpacity from '../NextTouchableOpacity'

const styles = StyleSheet.create({
  container: {
    height: SystemHelper.safeBottom + 50,
    paddingTop: 8,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 11,
  },
  title: {
    color: '#333333',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: 'bold'
  },
  job: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: 'bold',
    color: '#666666',
  },
  renshiIcon: {
    width: 33,
    height: 33,
    backgroundColor: greenColor,
    borderRadius: 17
  },
  titleView: {
    marginLeft: 11,
    flex: 1,
  },
  linearView: {
    flexDirection: 'row',
  },
  linear: {
    width: 90,
    height: 33,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 9
  },
  text: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold'
  }
})

type TProps = {
  icon?: string,
  name?: string,
  job?: string,
  viewStyle?: StyleProp<ViewStyle>,
  clickChat: () => void,
  clickDelivery: () => void,
}

export default class InterviewerFooter extends PureComponent<TProps> {
  render() {
    const {
      icon, name, job, viewStyle, clickChat, clickDelivery
    } = this.props
    const start = { x: 0, y: 0.5 }
    const end = { x: 1, y: 0.5 }
    return (
      <View style={[styles.container, viewStyle]}>
        {/* <Image
          style={styles.renshiIcon}
          source={icon}
        /> */}
        <View style={styles.renshiIcon} />
        <View style={styles.titleView}>
          <Text style={styles.title}>
            {name}
          </Text>
          <Text style={styles.job}>
            {job}
          </Text>
        </View>
        <View style={styles.linearView}>
          <NextTouchableOpacity
            onPress={() => {
              if (clickChat) {
                clickChat()
              }
            }}
          >
            <LinearGradient
              start={start}
              end={end}
              colors={['#2D68FF', '#63A6FB']}
              style={styles.linear}
            >
              <Text style={[styles.text]}>
                聊一聊
              </Text>
            </LinearGradient>
          </NextTouchableOpacity>
          <NextTouchableOpacity
            onPress={() => {
              if (clickDelivery) {
                clickDelivery()
              }
            }}
          >
            <LinearGradient
              start={start}
              end={end}
              colors={['#54D693', '#81E3AE']}
              style={[styles.linear]}
            >
              <Text style={[styles.text]}>
                投简历
              </Text>
            </LinearGradient>
          </NextTouchableOpacity>
        </View>
      </View >
    )
  }
}
