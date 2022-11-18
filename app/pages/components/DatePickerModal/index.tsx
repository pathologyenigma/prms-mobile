import React, { Component } from 'react'
import { Text, View } from 'react-native'
import styles from './styles'
import NextPressable from '../NextPressable'
import DatePicker from 'react-native-date-picker'
import BottomContentModal from '../BottomContentModal'
import { parse } from 'date-fns'
// import { DatePicker } from 'react-native-common-date-picker'

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
      currentDate,
    } = this.props
    let selectDate = currentDate ? parse(currentDate, 'yyyy-MM-dd', new Date()) : new Date()
    return (
      <BottomContentModal
        visible={visible}
      >
        <View style={styles.btnView}>
          <NextPressable
            style={styles.leftBtn}
            onPress={leftPress}
          >
            <Text style={styles.leftText}>
              {leftTitle}
            </Text>
          </NextPressable>
          <Text style={styles.title}>
            {title}
          </Text>
          <NextPressable
            style={styles.rightBtn}
            onPress={() => rightPress(selectDate)}
          >
            <Text style={styles.rightText}>
              {rightTitle}
            </Text>
          </NextPressable>
        </View>
        {/*<DatePicker
          confirm={date => {
            console.warn(date)
          }}
        />*/}
        <DatePicker
          style={styles.datePicker}
          mode="date"
          maximumDate={new Date()}
          dividerHeight={1}
          date={selectDate}
          androidVariant="iosClone"
          onDateChange={(date) => {
          	selectDate = date
          }}
        />
      </BottomContentModal >
    )
  }
}
