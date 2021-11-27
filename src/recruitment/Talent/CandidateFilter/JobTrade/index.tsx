import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ListRenderItem,
  TouchableWithoutFeedback,
} from 'react-native'
import { StackNavigationOptions } from '@react-navigation/stack'
import TextButton from '../../../components/TextButton'
import CancelableTag from '../CancelableTag'
import { isIphoneX } from 'react-native-iphone-x-helper'

export const JobTradeOptions: StackNavigationOptions = {
  title: '行业类别',
  headerRight: () => <TextButton title="保存" textStyle={styles.rightButton} />,
}

const provinces = [
  '互联网/IT/电子/通信',
  '房地产/建筑',
  '金融业',
  '教育培训/科研',
  '广告/传媒/文化/体育',
  '制药/医疗',
  '批发/零售/贸易',
  '制造业',
  '汽车',
  '交通运输/仓储/物流',
]

const hotCities = [
  '电子商务',
  '在线教育',
  '企业服务',
  '人工智能',
  '在线医疗',
  '新媒体',
  '区块链',
  '互联网',
  '云计算/大数据',
  '网络/信息安全',
]

function citiesForProvince(province: string) {
  if (province === '互联网/IT/电子/通信') {
    return hotCities
  }
  return ['不可知', '事少离家近', '无行业']
}

export default function JobTrade() {
  const [checkedPrimaryTrade, setCheckedPrimaryTrade] =
    useState('互联网/IT/电子/通信')
  const [secondaryTrades, setSecondaryTrades] = useState(
    citiesForProvince(checkedPrimaryTrade),
  )
  const tradeLimit = 3
  const [selectedTrades, setSelectedTrades] = useState(['在线教育'])

  const handleTradeChecked = (trade: string, checked: boolean) => {
    if (!checked) {
      setSelectedTrades(trades => trades.filter(t => t !== trade))
      return
    }

    if (selectedTrades.length >= tradeLimit) {
      // TODO: toast
      return
    }

    setSelectedTrades(trades => [...trades, trade])
  }

  useEffect(() => {
    const cities = citiesForProvince(checkedPrimaryTrade)
    setSecondaryTrades(cities)
  }, [checkedPrimaryTrade])

  const renderProviceItem: ListRenderItem<string> = ({ item }) => {
    const checked = item === checkedPrimaryTrade
    return (
      <TouchableWithoutFeedback onPress={() => setCheckedPrimaryTrade(item)}>
        <View style={styles.item}>
          {checked && <View style={styles.primaryCheckedIndicator}></View>}
          <Text
            style={[
              styles.primaryTradeText,
              checked ? styles.itemTextChecked : undefined,
            ]}>
            {item}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  const renderCityItem: ListRenderItem<string> = ({ item }) => {
    const checked = selectedTrades.includes(item)
    return (
      <TouchableWithoutFeedback
        onPress={() => handleTradeChecked(item, !checked)}>
        <View style={[styles.item]}>
          <Text
            style={[
              styles.secondaryTradeText,
              checked ? styles.itemTextChecked : undefined,
            ]}>
            {item}
          </Text>
          {checked && (
            <Image
              style={styles.secondaryCheckedIndicator}
              source={require('../../images/checked.png')}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.selectedTagContainer}>
        <Text style={styles.count}>
          已选（{selectedTrades.length}/{tradeLimit}）
        </Text>
        <View style={styles.tags}>
          {selectedTrades.map(tag => (
            <CancelableTag
              style={styles.tag}
              tag={tag}
              key={tag}
              onClose={() =>
                setSelectedTrades(
                  selectedTrades.filter(category => category !== tag),
                )
              }
            />
          ))}
        </View>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={provinces}
          keyExtractor={item => item}
          renderItem={renderProviceItem}
          style={styles.primaryTradeContainer}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        />
        <FlatList
          data={secondaryTrades}
          keyExtractor={item => item}
          renderItem={renderCityItem}
          style={styles.secondaryTradeContainer}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  selectedTagContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 21,
    height: 50,
    justifyContent: 'center',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    marginTop: 4,
    marginRight: 9,
  },
  count: {
    color: '#888888',
    fontSize: 12,
  },
  primaryTradeContainer: {
    width: '50%',
    backgroundColor: '#FFFFFF',
  },
  secondaryTradeContainer: {
    width: '50%',
    backgroundColor: '#F8F8F8',
  },
  content: {
    flexGrow: 1,
    paddingBottom: isIphoneX() ? 44 : 10,
  },
  rightButton: {
    marginRight: 11,
    color: '#79D398',
  },
  item: {
    height: 60,
    flex: 1,
    justifyContent: 'center',
  },
  primaryTradeText: {
    color: '#666666',
    fontSize: 15,
    marginLeft: 32,
  },
  secondaryTradeText: {
    color: '#666666',
    fontSize: 15,
    marginLeft: 32,
  },
  itemTextChecked: {
    color: '#79D398',
    fontWeight: 'bold',
  },
  primaryCheckedIndicator: {
    width: 5,
    height: 15,
    backgroundColor: '#79D398',
    position: 'absolute',
    left: 0,
  },
  secondaryCheckedIndicator: {
    position: 'absolute',
    right: 21,
  },
})
