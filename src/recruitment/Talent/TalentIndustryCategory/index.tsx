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
import TextButton from '../../components/TextButton'
import CancelableTag from '../components/CancelableTag'
import { isIphoneX } from 'react-native-iphone-x-helper'
import NavBar from '../../components/NavBar'
import { useIndustryCategory } from '../../hooks/useIndustryCategory'
import LoadingAndError from '../../components/LoadingAndError'
import { StackScreenProps } from '@react-navigation/stack'
import { TalentParamList } from '../typings'
import RootLoading from '../../../utils/rootLoading'

interface Category {
  primary: string
  secondary: string
}

const industryLimit = 3

export default function TalentIndustryCategory({
  navigation,
  route,
}: StackScreenProps<TalentParamList, 'TalentIndustryCategory'>) {
  const { categories = [] } = route.params || {}

  const { loading, primaryCategories, secondaryCategories } =
    useIndustryCategory()
  const [primaryCategory, setPrimaryCategory] = useState<string>()

  useEffect(() => {
    if (primaryCategories) {
      setPrimaryCategory(primaryCategories[0])
    }
  }, [primaryCategories])

  const handleTradeChecked = (category: Category, checked: boolean) => {
    if (!checked) {
      navigation.setParams({
        categories: categories.filter(c => c.secondary !== category.secondary),
      })
      return
    }

    if (categories.length >= industryLimit) {
      RootLoading.info(`最多可选 ${industryLimit} 项`)
      return
    }
    navigation.setParams({
      categories: [...categories, category],
    })
  }

  const renderProviceItem: ListRenderItem<string> = ({ item }) => {
    const checked = item === primaryCategory
    return (
      <TouchableWithoutFeedback onPress={() => setPrimaryCategory(item)}>
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
    const checked = categories.map(c => c.secondary).includes(item)
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          handleTradeChecked(
            { primary: primaryCategory!, secondary: item },
            !checked,
          )
        }>
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
              source={require('../images/checked.png')}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <View style={styles.container}>
      <NavBar
        title="行业类别"
        headerRight={() => (
          <TextButton
            title="保存"
            onPress={() =>
              navigation.navigate('CandidateFilter', {
                industryCategories: categories,
              })
            }
          />
        )}
      />
      <View style={styles.selectedTagContainer}>
        <Text style={styles.count}>
          已选（{categories.length}/{industryLimit}）
        </Text>
        <View style={styles.tags}>
          {categories.map(c => (
            <CancelableTag
              style={styles.tag}
              tag={c.secondary}
              key={c.secondary}
              onClose={() =>
                navigation.setParams({
                  categories: categories.filter(
                    category => category.secondary !== c.secondary,
                  ),
                })
              }
            />
          ))}
        </View>
      </View>
      <LoadingAndError loading={loading}>
        {primaryCategory && (
          <View style={styles.listContainer}>
            <FlatList
              data={primaryCategories}
              keyExtractor={item => item}
              renderItem={renderProviceItem}
              style={styles.primaryTradeContainer}
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator={false}
            />
            <FlatList
              data={secondaryCategories(primaryCategory)}
              keyExtractor={item => item}
              renderItem={renderCityItem}
              style={styles.secondaryTradeContainer}
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </LoadingAndError>
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
