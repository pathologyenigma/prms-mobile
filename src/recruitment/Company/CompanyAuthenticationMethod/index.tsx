import React, { PropsWithChildren } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ViewStyle,
  StyleProp,
  TouchableWithoutFeedback,
} from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import IconButton from '../../components/IconButton'
import Hotline from '../Hotline'
import { useNavigation } from '@react-navigation/native'
import NavBar from '../../components/NavBar'

export default function CompanyAuthenticationMethod() {
  const navigation = useNavigation<StackNavigationProp<any>>()

  return (
    <View style={styles.container}>
      <NavBar
        title="公司认证方式"
        headerLeft={() => <IconButton icon={require('../images/more.png')} />}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}>
        <Text style={styles.hint}>请选择认证方式</Text>
        <Card style={[styles.cardStyle, { marginTop: 27 }]}>
          <AuthenticationItem
            title="同事协助认证"
            detail="向同事发送验证码进行认证"
            recommended
            onPress={() =>
              navigation.navigate('CompanyAuthenticationByColleague')
            }
          />
        </Card>
        <Card style={[styles.cardStyle, { marginTop: 21 }]}>
          <AuthenticationItem
            title="证照原件认证"
            detail="需上传「营业执照」照片"
            onPress={() =>
              navigation.navigate('CompanyAuthenticationByLicense')
            }
          />
        </Card>
        <Hotline style={styles.hotline} />
      </ScrollView>
    </View>
  )
}

interface AuthenticationItemProps {
  title: string
  detail: string
  recommended?: boolean
  onPress?: () => void
}

function AuthenticationItem({
  title,
  detail,
  recommended,
  onPress,
}: AuthenticationItemProps) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.item}>
        <View style={styles.row}>
          <Text style={styles.title}>{title}</Text>
          {recommended && (
            <Image
              style={styles.recommend}
              source={require('./recommend.png')}
            />
          )}
        </View>
        <Text style={styles.detail}>{detail}</Text>
        <Image
          style={styles.indicator}
          source={require('../../assets/indicator.png')}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

interface CardProps {
  style?: StyleProp<ViewStyle>
}

function Card({ children, style }: PropsWithChildren<CardProps>) {
  return <View style={[styles.card, style]}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  hint: {
    color: '#CCCCCC',
    fontSize: 15,
    fontWeight: 'bold',
    marginHorizontal: 11,
    marginTop: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    shadowColor: '#666666',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 8,
    shadowOpacity: 0.16,
    elevation: 8,
  },
  cardStyle: {
    marginHorizontal: 11,
    height: 90,
  },
  item: {
    justifyContent: 'center',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 21,
  },
  detail: {
    color: '#888888',
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 21,
  },
  indicator: {
    position: 'absolute',
    right: 19,
    bottom: 30,
  },
  recommend: {
    marginLeft: 14,
  },
  hotline: {
    marginTop: 60,
    marginHorizontal: 11,
  },
})
