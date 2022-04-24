import React, { Component } from 'react'
import { Text, View } from 'react-native'
import styles from './styles'
import WhiteContentModal from '../../../components/WhiteContentModal'
import NextTouchableOpacity from '../../../components/NextTouchableOpacity'
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
      leftValue: '',
      rightValue: '',
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
    let leftList = ['离职找工作', '在职找工作', '在职看机会']
    let rightList = ['随时入职', '一周内入职', '两周内入职']
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
		  <View style={styles.contentStyle}>
          	<Picker
              roundRectType="left"
              style={[
                styles.picker,
                { marginRight: Platform.OS === 'ios' ? -9 : 0 },
              ]}
              itemStyle={styles.pickerItem}
              values={leftList}
              selectedValue={this.state.leftValue}
              onValueChange={(_, index) =>
                this.setState({ leftValue: leftList[index] })
              }
            />
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
        </View>
        </View>
      </WhiteContentModal >
    )
  }
}
