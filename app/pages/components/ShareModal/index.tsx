import React, { Component } from 'react'
import { Image, View, Text } from 'react-native'
import styles from './styles'
import SystemHelper from '../../../utils/system'
import BottomContentModal from '../BottomContentModal'
import { ScrollView } from 'react-native-gesture-handler'
import NextPressable from '../NextPressable'

export interface IShareModalProps {
  visible: boolean,
  shareWechat?: boolean
  shareWechatLine?: boolean
  shareLink?: boolean
  cancelOnpress: () => void
}

interface IShareModalState {

}

export default class ShareModal extends Component<IShareModalProps, IShareModalState> {
  share(type: number) {
    const { cancelOnpress } = this.props
    if (type === 1) {
      Toast.show('分享到微信')
    } else if (type === 2) {
      Toast.show('分享到朋友圈')
    } else if (type === 3) {
      Toast.show('复制链接')
    }
    if (cancelOnpress) {
      cancelOnpress()
    }
  }

  renderModalContent() {
    const {
      shareWechat = true,
      shareWechatLine = true,
      shareLink = false,
      cancelOnpress,
    } = this.props
    return (
      <View style={styles.topView}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal={true}
          style={styles.scrollView}
          contentContainerStyle={styles.containerScrollView}
        >
          {shareWechat && (
            <NextPressable
              style={styles.shareBtn}
              onPress={() => {
                this.share(1)
              }}
            >
              <Image
                style={styles.shareIcon}
                source={require('../../../assets/requestJobs/share-wechat.png')}
              />
              <Text style={styles.shareText}>微信好友</Text>
            </NextPressable>
          )}
          {shareWechatLine && (
            <NextPressable
              style={styles.shareBtn}
              onPress={() => {
                this.share(2)
              }}
            >
              <Image
                style={styles.shareIcon}
                source={require('../../../assets/requestJobs/share-wechatline.png')}
              />
              <Text style={styles.shareText}>微信朋友圈</Text>
            </NextPressable>
          )}
          {shareLink && (
            <NextPressable
              style={styles.shareBtn}
              onPress={() => {
                this.share(3)
              }}
            >
              <Image
                style={styles.shareIcon}
                source={require('../../../assets/requestJobs/share-link.png')}
              />
              <Text style={styles.shareText}>复制链接</Text>
            </NextPressable>
          )}
        </ScrollView>
        <NextPressable
          style={styles.cancleBtn}
          onPress={() => {
            if (cancelOnpress) {
              cancelOnpress()
            }
          }}
        >
          <Text style={styles.cancleText}>取消</Text>
        </NextPressable>
      </View>
    )
  }

  render() {
    const { visible } = this.props
    return (
      <BottomContentModal
        visible={visible}
      >
        {this.renderModalContent()}
      </BottomContentModal >
    )
  }
}
