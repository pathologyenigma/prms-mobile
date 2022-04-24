import React, { Component } from 'react'
import NavBar, { EButtonType } from '../../components/NavBar'
import styles from './styles/AgreementPrivacy.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import { View, StatusBar, ScrollView, Text } from 'react-native'

type IProps = GenProps<'AgreementPrivacy'> & {

}

interface IState {
  pageType: number
}

export default class AgreementPrivacy extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    const { route: { params: { pageType } } } = props
    this.state = {
      pageType,
    }
  }

  renderNavBar() {
    const { navigation } = this.props
    const { pageType } = this.state
    return (
      <NavBar
        statusBarTheme="dark-content"
        barStyle={{
          borderBottomWidth: 0,
          elevation: 0,
        }}
        title={pageType === 1 ? '趁早找用户协议' : '趁早找隐私政策'}
        left={{
          type: EButtonType.IMAGE,
          value: require('../../../assets/requestJobs/navbar-back.png'),
          act: () => {
            navigation.pop()
          },
        }}
      />
    )
  }

  renderContent() {
    const { pageType } = this.state
    const content = pageType === 1
      ? '【更新日期: 2021年3月10日】\n尊敬的用户，我们对《趁早找用户协议》进行了更新，此版本主要更新内容涉及拉勾通用账号规则、候选人简历及付费服务相关问题、推广营销相关规则等内容，请您仔细阅读更新后的条款。\n正文:\n《拉勾网用户协议》(以 下简称“本协议”)作为拉勾网(以下简称“本网站”)提供服务的依据，确定用户在何种条件、以何种方式使用本网站及本网站的服务(具体载体包括但不限于网页、APP应用程序、微信公众号平台、微信小程序等)。请您认真阅读本协议(尤其是字体加粗 及/或下划线的内容)_ ,， 当您点击“注册”或者“登录”或其他方式确认即表示您已经仔细阅读并完全理解、同意本协议项下的全部条款;如您对本协议的任何条款表示异议，您应当立即停止访问拉勾网及使用相关服务。用户根据自身需求可以向本平台购买付费服务/产品，相关服务/产品的部分或全部利用本网站所提供的互联网信息业务和增值业务，在遵守本用户协议的规定基础上还需遵守《拉勾网在 线增值服务协议》(适用于在线 支付购买的产品)、服务合同等付费服务涉及的特殊条款;您应当在购买前认真阅读，一旦购买付费服务即视为接受相关条款。\n本协议包括基于本协议制定的各项规则，所有规则为本协议不可分割的一部分，与本协议具有同等效力。随着平台业务经营的发展及相关政策的变更，本网站用户协议将不时更新，我们会通过在网站公告、APP端推送、电子邮件等适当方式提醒您相关内容的更新。您也可以随时访问我们的用户协议页面(https://www.lagou.com/privacy.html)来获知最新版本。当您继续使用本网站及相关服务，则视为您接受协议的变更，否则您应当停止访问网站及使用服务。\n有关用户个人信息安全及隐私保护的详细规定，适用 《拉勾网隐私政策)》与此同时 在你使用本网站旗 下各'
      : '【更新日期: 2021年3月10日】\n尊敬的用户，我们对《趁早找用户协议》进行了更新，此版本主要更新内容涉及拉勾通用账号规则、候选人简历及付费服务相关问题、推广营销相关规则等内容，请您仔细阅读更新后的条款。\n正文:\n《拉勾网用户协议》(以 下简称“本协议”)作为拉勾网(以下简称“本网站”)提供服务的依据，确定用户在何种条件、以何种方式使用本网站及本网站的服务(具体载体包括但不限于网页、APP应用程序、微信公众号平台、微信小程序等)。请您认真阅读本协议(尤其是字体加粗 及/或下划线的内容)_ ,， 当您点击“注册”或者“登录”或其他方式确认即表示您已经仔细阅读并完全理解、同意本协议项下的全部条款;如您对本协议的任何条款表示异议，您应当立即停止访问拉勾网及使用相关服务。用户根据自身需求可以向本平台购买付费服务/产品，相关服务/产品的部分或全部利用本网站所提供的互联网信息业务和增值业务，在遵守本用户协议的规定基础上还需遵守《拉勾网在 线增值服务协议》(适用于在线 支付购买的产品)、服务合同等付费服务涉及的特殊条款;您应当在购买前认真阅读，一旦购买付费服务即视为接受相关条款。\n本协议包括基于本协议制定的各项规则，所有规则为本协议不可分割的一部分，与本协议具有同等效力。随着平台业务经营的发展及相关政策的变更，本网站用户协议将不时更新，我们会通过在网站公告、APP端推送、电子邮件等适当方式提醒您相关内容的更新。您也可以随时访问我们的用户协议页面(https://www.lagou.com/privacy.html)来获知最新版本。当您继续使用本网站及相关服务，则视为您接受协议的变更，否则您应当停止访问网站及使用服务。\n有关用户个人信息安全及隐私保护的详细规定，适用 《拉勾网隐私政策)》与此同时 在你使用本网站旗 下各'
    return (
      <ScrollView
        contentContainerStyle={styles.content}
      >
        <Text style={styles.contentText}>{content}</Text>
      </ScrollView>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          animated
          barStyle={'dark-content'}
        />
        {this.renderNavBar()}
        {this.renderContent()}
      </View>
    )
  }
}