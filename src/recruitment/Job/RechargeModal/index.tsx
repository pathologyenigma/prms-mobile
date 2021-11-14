import { vi } from 'date-fns/locale'
import React, { useState } from 'react'
import {
  ViewStyle,
  StyleProp,
  TextStyle,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native'
import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper'
import BottomModal from '../../components/BottomModal'
import GradientButton from '../../components/GradientButton'
import IconButton from '../../components/IconButton'

interface RechargeModalProps {
  visible?: boolean
}

interface Item {
  denomination: number
  price: number
  discount?: number
  discountPrice?: number
}

const items: Item[] = [
  {
    denomination: 20,
    price: 12,
  },
  {
    denomination: 40,
    price: 24,
    discount: 8.8,
    discountPrice: 20,
  },
  {
    denomination: 60,
    price: 34,
    discount: 8.8,
    discountPrice: 30,
  },
  {
    denomination: 80,
    price: 40,
    discount: 8.8,
  },
  {
    denomination: 100,
    price: 50,
    discount: 8.8,
  },
]

export default function RechargeModal({ visible }: RechargeModalProps) {
  const width = (Dimensions.get('window').width - 11 * 4 - 0.5) / 3
  const [selectedIndex, setSelectedIndex] = useState(0)

  const renderItem = (
    { discount, price, discountPrice, denomination }: Item,
    index: number,
  ) => {
    return (
      <TouchableWithoutFeedback onPress={() => setSelectedIndex(index)}>
        <View
          key={denomination}
          style={[
            styles.item,
            { width, height: 70 },
            selectedIndex === index ? styles.checked : undefined,
          ]}>
          <Text style={styles.denomination}>
            {denomination}
            <Text style={styles.gold}> 金币</Text>
          </Text>
          <Text style={styles.price}>
            {`¥ ${discountPrice ?? price} `}
            <Text style={styles.original}>
              {discountPrice ? `¥ ${price}` : ''}
            </Text>
          </Text>
          {!!discount && (
            <Text style={styles.discount}>{`限时${discount}折`}</Text>
          )}
        </View>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <BottomModal contentStyle={styles.modal} visible={visible}>
      <View style={styles.header}>
        <Text style={styles.title}>金币充值</Text>
        <Text style={styles.balance}>
          余额：<Text style={styles.coin}>0</Text> 金币
        </Text>
        <IconButton style={styles.qa} icon={require('./info.png')} />
      </View>
      <View style={styles.row}>
        {items.map((item, index) => renderItem(item, index))}
      </View>
      <GradientButton style={styles.button} title="立即支付" />
    </BottomModal>
  )
}

const styles = StyleSheet.create({
  modal: {
    height: isIphoneX() ? 330 : 296,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },
  title: {
    color: '#333333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  balance: {
    marginTop: 6,
    color: '#333333',
    fontSize: 12,
  },
  coin: {
    color: '#57DE9E',
  },
  qa: {
    position: 'absolute',
    top: 18,
    right: 11,
  },
  button: {
    marginBottom: isIphoneX() ? getBottomSpace() + 4 : 4,
    marginHorizontal: 22,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  item: {
    backgroundColor: '#F7F7F7',
    borderRadius: 4,
    marginLeft: 11,
    marginBottom: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#F7F7F7',
    borderWidth: 1,
  },
  denomination: {
    color: '#333333',
    fontSize: 20,
    fontWeight: 'bold',
  },
  checked: {
    borderColor: '#57DE9E',
    borderWidth: 1,
    backgroundColor: '#57DE9E33',
  },
  gold: {
    fontWeight: 'normal',
    fontSize: 13,
  },
  price: {
    color: '#888888',
    fontSize: 13,
    fontWeight: 'bold',
  },
  original: {
    color: '#BBBBBB',
    fontSize: 10,
    fontWeight: 'normal',
    textDecorationLine: 'line-through',
  },
  discount: {
    backgroundColor: '#F75050',
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    position: 'absolute',
    top: 0,
    right: 0,
    lineHeight: 12,
    fontSize: 9,
    color: '#FFFFFF',
    paddingHorizontal: 3,
  },
})
