import React, { useState } from 'react'
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
import NavBar from '../../components/NavBar'
import { useJobCategory } from '../../hooks/useJobCategory'
import { StackScreenProps } from '@react-navigation/stack'
import { TalentParamList } from '../typings'
import RootLoading from '../../../utils/rootLoading'

interface CascadedCategory {
  primary: string
  secondary: string
}

interface Category {
  primary: string
  secondary: string
  final: string
}

const categoryLimit = 3

export default function TalentJobCategory({
  navigation,
  route,
}: StackScreenProps<TalentParamList, 'TalentJobCategory'>) {
  const { primaryCategories, secondaryCategories, finalCategories } =
    useJobCategory()

  const { categories = [] } = route.params || {}

  const [cascadedCategory, setCascadedCategory] = useState<CascadedCategory>()
  const [overlayVisible, setOverlayVisible] = useState(false)

  const renderPrimaryCategoryItem: ListRenderItem<string> = ({
    item: category,
    index,
  }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          setCascadedCategory({
            primary: category,
            secondary: secondaryCategories(category)[0],
          })
          setOverlayVisible(true)
        }}>
        <View style={styles.primaryItem}>
          <Text style={styles.primaryItemText}>{category}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  const renderSecondaryCategoryItem: ListRenderItem<string> = ({
    item: category,
  }) => {
    const checked = category === cascadedCategory?.secondary

    return (
      <TouchableWithoutFeedback
        onPress={() =>
          setCascadedCategory(value => ({ ...value!, secondary: category }))
        }>
        <View style={styles.secondaryItem}>
          <Text
            style={[
              styles.secondaryText,
              checked ? styles.secondaryTextChecked : undefined,
            ]}>
            {category}
          </Text>
          {checked && <View style={styles.secondaryIndicator} />}
        </View>
      </TouchableWithoutFeedback>
    )
  }

  const handleCategoryChecked = (category: Category, checked: boolean) => {
    if (!checked) {
      navigation.setParams({
        categories: categories.filter(c => c.final !== category.final),
      })
      return
    }

    if (categories.length >= categoryLimit) {
      RootLoading.info(`最多可选 ${categoryLimit} 项`)
      return
    }
    navigation.setParams({
      categories: [...categories, category],
    })
  }

  const renderFinalCategoryItem: ListRenderItem<string> = ({ item }) => {
    const checked = categories.map(c => c.final).includes(item)

    return (
      <TouchableWithoutFeedback
        onPress={() =>
          handleCategoryChecked(
            {
              primary: cascadedCategory!.primary,
              secondary: cascadedCategory!.secondary,
              final: item,
            },
            !checked,
          )
        }>
        <View style={styles.finalItem}>
          <Text
            style={[
              styles.finalText,
              checked ? styles.finalTextChecked : undefined,
            ]}>
            {item}
          </Text>
          {checked && (
            <Image
              style={styles.finalIndicator}
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
        title="职位类别"
        headerRight={() => (
          <TextButton
            title="保存"
            onPress={() =>
              navigation.navigate('CandidateFilter', {
                jobCategories: categories,
              })
            }
          />
        )}
      />
      <View style={styles.selectedTagContainer}>
        <Text style={styles.count}>
          已选（{categories.length}/{categoryLimit}）
        </Text>
        <View style={styles.tags}>
          {categories.map(c => (
            <CancelableTag
              style={styles.tag}
              tag={c.final}
              key={c.final}
              onClose={() =>
                navigation.setParams({
                  categories: categories.filter(
                    category => category.final !== c.final,
                  ),
                })
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
        {overlayVisible && cascadedCategory && (
          <View
            style={[StyleSheet.absoluteFillObject, { flexDirection: 'row' }]}>
            <TouchableWithoutFeedback onPress={() => setOverlayVisible(false)}>
              <View style={styles.bezel}></View>
            </TouchableWithoutFeedback>
            <FlatList
              style={styles.secondaryContainer}
              data={secondaryCategories(cascadedCategory.primary)}
              keyExtractor={item => item}
              renderItem={renderSecondaryCategoryItem}
              alwaysBounceVertical={false}
            />
            <FlatList
              style={styles.finalContainer}
              data={finalCategories(
                cascadedCategory.primary,
                cascadedCategory.secondary,
              )}
              keyExtractor={item => item}
              renderItem={renderFinalCategoryItem}
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
    flex: 1,
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
    marginHorizontal: 16,
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
  finalContainer: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  finalItem: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  finalText: {
    color: '#666666',
    fontSize: 15,
    marginHorizontal: 16,
  },
  finalTextChecked: {
    color: '#79D398',
    fontWeight: 'bold',
  },
  finalIndicator: {
    marginLeft: 11,
  },
})
