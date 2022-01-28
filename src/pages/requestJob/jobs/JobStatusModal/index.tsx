import React, { Component } from 'react'
import { Text, View } from 'react-native'
import styles from './styles'
import WhiteContentModal from '../../../components/WhiteContentModal'
import NextTouchableOpacity from '../../../components/NextTouchableOpacity'
// @ts-ignore
import { DatePicker } from 'react-native-common-date-picker'

interface IProps {
  title?: string,
  leftTitle?: string,
  leftPress?: () => void,
  rightTitle?: string,
  rightPress: (selectedDate: string) => void,
  visible: boolean,
  currentDate: string,
}

interface IState {
  selectedDate: string,
}

export default class JobStatusModal extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    const { currentDate } = this.props
    this.state = {
      selectedDate: currentDate || `${new Date().getFullYear()}-${new Date().getMonth() + 1}`
    }
  }

  render() {
    const {
      title = '求职状态',
      visible,
      leftTitle = '取消',
      leftPress,
      rightTitle = '确定',
      rightPress,
      currentDate
    } = this.props
    const { selectedDate } = this.state
    return (
      <WhiteContentModal
        visible={visible}
        showCloseBtn={false}
        modalStyle={{ justifyContent: 'flex-end' }}
        contextStyle={styles.contextStyle}
      >
        <View style={styles.modalContentView}>
          <View style={styles.btnView}>
            <NextTouchableOpacity
              style={styles.rightBtn}
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
              onPress={() => {
                if (rightPress) {
                  rightPress(selectedDate)
                }
              }}
            >
              <Text style={[styles.rightText]}>
                {rightTitle}
              </Text>
            </NextTouchableOpacity>
          </View>
          <DatePicker
            type="YYYY-MM"
            defaultDate={currentDate}
            minDate="1970-1"
            maxDate={`${new Date().getFullYear()}-${new Date().getMonth() + 1}`}
            showToolBar={false}
            onValueChange={(date: any) => this.setState({ selectedDate: date })}
          />
        </View>
      </WhiteContentModal >
    )
  }
}
