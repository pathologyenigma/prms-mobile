import { StackScreenProps } from '@react-navigation/stack'
import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ListRenderItem,
  TouchableWithoutFeedback,
} from 'react-native'
import NavBar from '../../components/NavBar'
import { JobParamList } from '../typing'
import { useJobCategory } from './useJobCategory'

interface CascadedCategory {
  primary: string
  secondary: string
}

type Props = StackScreenProps<JobParamList, 'EditJobCategory'>

export default function EditJobCategory({ navigation }: Props) {
  const { loading, primaryCategories, secondaryCategoris, specificCategoris } =
    useJobCategory()

  const [cascadedCategory, setCascadedCategory] = useState<CascadedCategory>()
  const [overlayVisible, setOverlayVisible] = useState(false)

  const renderPrimaryCategoryItem: ListRenderItem<string> = ({
    item: category,
  }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          setCascadedCategory({
            primary: category,
            secondary: secondaryCategoris(category)[0],
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

  const renderThirdCategoryItem: ListRenderItem<string> = ({ item }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate('PostJob', {
            jobCategory: [
              cascadedCategory!.primary,
              cascadedCategory!.secondary,
              item,
            ],
          })
        }>
        <View style={styles.specificItem}>
          <Text style={styles.specificText}>{item}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <View style={styles.container}>
      <NavBar title="职位类别" />
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
              data={secondaryCategoris(cascadedCategory.primary)}
              keyExtractor={item => item}
              renderItem={renderSecondaryCategoryItem}
              bounces={false}
            />
            <FlatList
              style={styles.specificContainer}
              data={specificCategoris(
                cascadedCategory.primary,
                cascadedCategory.secondary,
              )}
              keyExtractor={item => item}
              renderItem={renderThirdCategoryItem}
              bounces={false}
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
  primaryItem: {
    height: 60,
    justifyContent: 'center',
  },
  primaryItemText: {
    marginHorizontal: 16,
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
  specificContainer: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  specificItem: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  specificText: {
    color: '#666666',
    fontSize: 15,
    marginHorizontal: 16,
  },
})
