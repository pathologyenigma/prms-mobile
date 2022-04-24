import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native'
import ImagePicker from './ImagePicker'

interface ImagePickerViewProps {
  limit?: number
  values?: string[]
  onValuesChange?: (values: string[]) => void
  style?: StyleProp<ViewStyle>
}

export default function ImagePickerView({
  limit = 3,
  values = [],
  onValuesChange,
  style,
}: ImagePickerViewProps) {
  const images = values.filter(uri => uri && uri.length > 0)
  return (
    <View style={[styles.container, style]}>
      {images.map((value, index) => (
        <ImagePicker
          key={value + '-' + index}
          style={{ marginRight: 16 }}
          uri={value}
          onImageUriChange={uri => {
            images[index] = uri
            onValuesChange && onValuesChange([...images])
          }}
        />
      ))}
      {images.length < limit && (
        <ImagePicker
          key={'-' + images.length}
          onImageUriChange={uri => {
            images.push(uri)
            onValuesChange && onValuesChange([...images])
          }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
})
