import React, { Component } from 'react'
import { Text, View } from 'react-native'
import styles from './styles'
import NextTouchableOpacity from '../NextTouchableOpacity'
import DatePicker from 'react-native-date-picker'
import BottomContentModal from '../BottomContentModal'

interface IProps {
  title?: string,
  leftTitle?: string,
  leftPress?: () => void,
  rightTitle?: string,
  rightPress: (selectDate: Date) => void,
  visible: boolean,
  currentDate: Date,
}

export default class DatePickerModal extends Component<IProps> {
  render() {
    const {
      title = '选择时间',
      visible,
      leftTitle = '取消',
      leftPress,
      rightTitle = '确定',
      rightPress,
      currentDate = new Date(),
    } = this.props
    let selectDate = currentDate
    return (
      <BottomContentModal
        visible={visible}
      >
        <View style={styles.btnView}>
          <NextTouchableOpacity
            style={styles.leftBtn}
            onPress={leftPress}
          >
            <Text style={styles.leftText}>
              {leftTitle}
            </Text>
          </NextTouchableOpacity>
          <Text style={styles.title}>
            {title}
          </Text>
          <NextTouchableOpacity
            style={styles.rightBtn}
            onPress={() => rightPress(selectDate)}
          >
            <Text style={styles.rightText}>
              {rightTitle}
            </Text>
          </NextTouchableOpacity>
        </View>
        <DatePicker
          style={styles.datePicker}
          mode="date"
          maximumDate={new Date()}
          dividerHeight={1}
          date={currentDate}
          locale="zh_HK"
          androidVariant="iosClone"
          onDateChange={(Date) => { selectDate = Date }}
        />
      </BottomContentModal >
    )
  }
}
