import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import * as actions from '../../action/loginAction'
import { Login_Identity, Login_Token } from '../../utils/constant'
import { CommonActions } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'

class RequestPerson extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity
          style={{ alignItems: 'center' }}
          onPress={() => {
            this.props.chooseRole('PersonalUser', 'PersonalUser', (error: any, result: any) => {
              if (!error && result) {
                // 此处将状态全局存储起来后,再回到导航首页进行判断身份跳转
                AsyncStorage.multiSet([[Login_Identity, 'PersonalUser'], [Login_Token, result.UserChooseOrSwitchIdentity]], (error) => {
                  if (!error) {
                    this.props.navigation.dispatch(
                      CommonActions.reset({
                        index: 1,
                        routes: [
                          { name: 'Dummy' },
                        ],
                      })
                    )

                  } else {

                  }
                })
              }
            })
          }}
        >
          <Text style={{
            marginTop: 100,
            fontSize: 20,
          }}>
            招聘端页面,点击直接切换求职端
          </Text>
          <Text>求职端->我的->设置->退出登录(可返回招聘端)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.push('ChooseRole')
          }}
        >
          <Text style={{
            alignSelf: 'center',
            marginTop: 100,
            fontSize: 20,
          }}>
            招聘端页面,点击切换身份
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return bindActionCreators({
    chooseRole: actions.chooseRole
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(RequestPerson)
