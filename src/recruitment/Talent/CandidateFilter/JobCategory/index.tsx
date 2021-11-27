import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ListRenderItem,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native'
import { StackNavigationOptions } from '@react-navigation/stack'
import TextButton from '../../../components/TextButton'
import CancelableTag from '../CancelableTag'

export const JobCategoryOptions: StackNavigationOptions = {
  title: '职位类别',
  headerRight: () => (
    <TextButton
      title="保存"
      style={styles.button}
      textStyle={styles.buttonTextStyle}
    />
  ),
}

const primaryCategories = [
  '销售/商务拓展',
  '人事/行政/财务/法务',
  '互联网/通信及硬件',
  '运维/测试',
  '视觉/交互/设计',
  '运营/专业分析',
  '产品/项目/高级管理',
  '市场/品牌/公关',
  '金融/保险',
  '房地产/工程建筑',
  '物流/采购/供应商',
]

const secondaryCategories = ['产品经理', '项目管理', '高级管理']

const thirdCategories = [
  '产品经理',
  '产品主管',
  '产品助理',
  '产品总监',
  '策划产品经理',
  '移动产品经理',
  '网页产品经理',
  '智能软件产品经理',
]

export default function JobCategory() {
  const categoryLimit = 3

  const [selectedCategories, setSelectedCategories] = useState(['产品主管'])

  const [overlayVisible, setOverlayVisible] = useState(false)

  const handleCategoryChecked = (category: string, checked: boolean) => {
    if (!checked) {
      setSelectedCategories(categories =>
        categories.filter(c => c !== category),
      )
      return
    }

    if (selectedCategories.length >= categoryLimit) {
      // TODO: toast
      return
    }

    setSelectedCategories(categories => [...categories, category])
  }

  const [selectedSecondaryCategory, setSelectedSecondaryCategory] = useState('')

  const renderPrimaryCategoryItem: ListRenderItem<string> = ({
    item,
    index,
  }) => {
    return (
      <TouchableWithoutFeedback onPress={() => setOverlayVisible(true)}>
        <View style={styles.primaryItem}>
          <Text style={styles.primaryItemText}>{item}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  const renderSecondaryCategoryItem: ListRenderItem<string> = ({ item }) => {
    const checked = item === selectedSecondaryCategory

    return (
      <TouchableWithoutFeedback
        onPress={() => setSelectedSecondaryCategory(item)}>
        <View style={styles.secondaryItem}>
          <Text
            style={[
              styles.secondaryText,
              checked ? styles.secondaryTextChecked : undefined,
            ]}>
            {item}
          </Text>
          {checked && <View style={styles.secondaryIndicator} />}
        </View>
      </TouchableWithoutFeedback>
    )
  }

  const renderThirdCategoryItem: ListRenderItem<string> = ({ item }) => {
    const checked = selectedCategories.includes(item)

    return (
      <TouchableWithoutFeedback
        onPress={() => handleCategoryChecked(item, !checked)}>
        <View style={styles.thirdItem}>
          <Text
            style={[
              styles.thirdText,
              checked ? styles.thirdTextChecked : undefined,
            ]}>
            {item}
          </Text>
          {checked && (
            <Image
              style={styles.thirdIndicator}
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
          已选（{selectedCategories.length}/{categoryLimit}）
        </Text>
        <View style={styles.tags}>
          {selectedCategories.map(tag => (
            <CancelableTag
              style={styles.tag}
              tag={tag}
              key={tag}
              onClose={() =>
                setSelectedCategories(
                  selectedCategories.filter(category => category !== tag),
                )
              }
            />
          ))}
        </View>
      </View>
      <View style={styles.container}>
        <FlatList
          style={styles.container}
          contentContainerStyle={styles.content}
          data={primaryCategories}
          keyExtractor={item => item}
          renderItem={renderPrimaryCategoryItem}
        />
        {overlayVisible && (
          <View
            style={[StyleSheet.absoluteFillObject, { flexDirection: 'row' }]}>
            <TouchableWithoutFeedback onPress={() => setOverlayVisible(false)}>
              <View style={styles.bezel}></View>
            </TouchableWithoutFeedback>
            <FlatList
              style={styles.secondaryContainer}
              data={secondaryCategories}
              keyExtractor={item => item}
              renderItem={renderSecondaryCategoryItem}
              alwaysBounceVertical={false}
            />
            <FlatList
              style={styles.thirdContainer}
              data={thirdCategories}
              keyExtractor={item => item}
              renderItem={renderThirdCategoryItem}
              alwaysBounceVertical={false}
            />
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  button: {
    marginRight: 11,
  },
  buttonTextStyle: {
    color: '#7AD398',
    fontSize: 15,
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
  primaryItem: {
    height: 60,
    justifyContent: 'center',
  },
  primaryItemText: {
    marginLeft: 21,
    color: '#666666',
    fontSize: 15,
    fontWeight: 'bold',
  },
  bezel: {
    width: 60,
    height: '100%',
    backgroundColor: '#00000088',
  },
  secondaryContainer: {
    width: 124,
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  secondaryItem: {
    height: 60,
    justifyContent: 'center',
  },
  secondaryText: {
    color: '#666666',
    fontSize: 15,
    marginLeft: 32,
  },
  secondaryTextChecked: {
    color: '#79D398',
    fontWeight: 'bold',
  },
  secondaryIndicator: {
    width: 5,
    height: 15,
    backgroundColor: '#79D398',
    position: 'absolute',
    left: 0,
  },
  thirdContainer: {
    width: Dimensions.get('window').width - 60 - 124,
    backgroundColor: '#EEEEEE',
  },
  thirdItem: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  thirdText: {
    color: '#666666',
    fontSize: 15,
    marginLeft: 30,
  },
  thirdTextChecked: {
    color: '#79D398',
    fontWeight: 'bold',
  },
  thirdIndicator: {
    marginLeft: 11,
  },
})
