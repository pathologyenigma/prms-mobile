import React, { Component } from 'react'
import { Text, View } from 'react-native'
import styles from './styles'
import { PickerView } from '@ant-design/react-native'
import WhiteContentModal from '../../../components/WhiteContentModal'
import NextTouchableOpacity from '../../../components/NextTouchableOpacity'

interface IProps {
  title?: string,
  leftTitle?: string,
  leftPress?: () => void,
  rightTitle?: string,
  rightPress: (selectStatus: string, selectTime: string) => void,
  visible: boolean,
  statusArray: [],
  timeArray: [],
  currentStatus: string,
  currentTime: string,
}

interface IState {
  selectStatus: string[],
  selectTime: string[],
}

export default class JobStatusModal extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    const { currentStatus, currentTime } = this.props
    this.state = {
      selectStatus: [currentStatus],
      selectTime: [currentTime]
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
      statusArray = [],
      timeArray = [],
    } = this.props
    const { selectStatus, selectTime } = this.state
    const validGender = selectStatus && selectStatus[0] && selectStatus[0].length !== 0
    const validTime = selectTime && selectTime[0] && selectTime[0].length !== 0
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
              disabled={!validGender || !validTime}
              style={styles.rightBtn}
              onPress={() => {
                if (rightPress) {
                  rightPress(selectStatus[0], selectTime[0])
                }
              }}
            >
              <Text style={[styles.rightText, (!validGender || !validTime) && { color: '#666', }]}>
                {rightTitle}
              </Text>
            </NextTouchableOpacity>
          </View>
          <View style={styles.pickContainerView}>
            <View style={styles.selectView} />
            <View style={styles.selectLineView} />
            <View style={[styles.selectLineView, { top: 123 }]} />
            <View style={styles.pickView}>
              <PickerView
                onChange={(data: any) => {
                  this.setState({ selectStatus: data })
                }}
                value={selectStatus}
                data={[statusArray]}
                itemStyle={{
                  fontWeight: 'bold',
                  paddingVertical: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                cols={1}
                cascade={false}
              />
            </View>
            <View style={styles.pickView}>
              <PickerView
                onChange={(data: any) => {
                  this.setState({ selectTime: data })
                }}
                value={selectTime}
                data={[timeArray]}
                itemStyle={{
                  fontWeight: 'bold',
                  paddingVertical: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                cols={1}
                cascade={false}
              />
            </View>
          </View>
        </View>
      </WhiteContentModal >
    )
  }
}
