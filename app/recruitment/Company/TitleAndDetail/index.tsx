import React from 'react'
import {
  TouchableWithoutFeedback,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native'

interface TitleAndDetailProps {
  title: string
  placeholder?: string
  value?: string
  onPress?: () => void
  renderHint?: () => JSX.Element
  renderDetail?: () => JSX.Element
}

export default function TitleAndDetail({
  title,
  placeholder,
  value,
  onPress,
  renderHint,
  renderDetail,
}: TitleAndDetailProps) {
  const hasValue = !!value
  const showsIndicator = !!onPress

  const _renderDetail = () => {
    if (renderDetail) {
      return renderDetail()
    }
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.detailRow}>
          <Text style={hasValue ? styles.detail : styles.placeholder}>
            {hasValue ? value : placeholder}
          </Text>
          {showsIndicator && (
            <Image
              style={styles.indicator}
              source={require('../../assets/indicator.png')}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{title}</Text>
        {renderHint && renderHint()}
      </View>
      {_renderDetail()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    paddingHorizontal: 11,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ECECEC',
    justifyContent: 'flex-end',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#666666',
    fontSize: 13,
  },
  placeholder: {
    color: '#CCCCCC',
    fontSize: 15,
    fontWeight: 'bold',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 42,
    marginTop: 2,
  },
  detail: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
  },
  indicator: {
    position: 'absolute',
    right: 0,
  },
})
