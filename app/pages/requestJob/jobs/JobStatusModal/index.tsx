import React, { Component } from 'react'
import { Text, View } from 'react-native'
import styles from './styles'
import WhiteContentModal from '../../../components/WhiteContentModal'
import NextPressable from '../../../components/NextPressable'
// @ts-ignore
import Picker from '~/recruitment/components/Picker/index.tsx'

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
      leftValue: this.props.currentStatus,
      rightValue: this.props.currentTime,
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
    let leftList = this.props.statusArray.map(item => item.label)
    let rightList = this.props.timeArray.map(item => item.label)
    return (
      <WhiteContentModal
        visible={visible}
        showCloseBtn={false}
        modalStyle={{ justifyContent: 'flex-end' }}
        contextStyle={styles.contextStyle}
      >
        <View style={styles.modalContentView}>
          <View style={styles.btnView}>
            <NextPressable
              style={styles.rightBtn}
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
              onPress={() => {
                if (rightPress) {
                  rightPress(this.state.leftValue, this.state.rightValue)
                }
              }}
            >
              <Text style={[styles.rightText]}>
                {rightTitle}
              </Text>
            </NextPressable>
          </View>
		  <View style={styles.contentStyle}>
          	<Picker
              roundRectType="left"
              style={[
                styles.picker,
                { marginRight: Platform.OS === 'ios' ? -9 : 0 },
              ]}
              itemStyle={styles.pickerItem}
              values={leftList}
              selectedValue={this.props.statusArray.find(item => item.value == this.state.leftValue)?.label}
              onValueChange={(_, index) => {
              	console.log(this.props.statusArray[index].value)
                this.setState({ leftValue: this.props.statusArray[index].value })
              }}
            />
            {
            	rightList.length > 0 && (
            		<Picker
		              roundRectType="none"
		              style={[
		                styles.picker,
		                { marginHorizontal: 0, borderRadius: 0, padding: 0 },
		              ]}
		              itemStyle={styles.pickerItem}
		              values={rightList}
		              selectedValue={this.state.rightValue}
		              onValueChange={(_, index) =>
		                this.setState({ rightValue: rightList[index] })
		              }
		            />
            	)
            }
        </View>
        </View>
      </WhiteContentModal >
    )
  }
}
