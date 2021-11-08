import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

interface JobInfoItemPros {
  title: string
  content?: string
  placeholder: string
  renderIndicator?: () => JSX.Element
  renderTitleBadge?: () => JSX.Element
}

export default function JobInfoItem({
  title,
  content,
  placeholder,
  renderIndicator,
  renderTitleBadge,
}: JobInfoItemPros) {
  const _renderTitle = () => {
    return (
      <View style={styles.titleRow}>
        <Text style={styles.title}>{title}</Text>
        {!!renderTitleBadge && renderTitleBadge()}
      </View>
    )
  }

  const _renderContent = () => {
    if (!hasContent(content)) {
      return null
    }
    return (
      <Text style={styles.content} numberOfLines={1} ellipsizeMode="tail">
        {content}
      </Text>
    )
  }

  const _renderPlaceholder = () => {
    if (hasContent(content)) {
      return null
    }
    return (
      <Text style={styles.placeholder} numberOfLines={1} ellipsizeMode="tail">
        {placeholder}
      </Text>
    )
  }

  const _renderIndicator = () => {
    if (renderIndicator !== undefined) {
      return renderIndicator()
    }

    return (
      <Image
        style={styles.indicator}
        source={require('./chakan.png')}
        resizeMode="contain"
      />
    )
  }

  return (
    <View style={styles.container}>
      {_renderTitle()}
      <View style={styles.detail}>
        {_renderContent()}
        {_renderPlaceholder()}
        {_renderIndicator()}
      </View>
      <View style={styles.diviver} />
    </View>
  )
}

function hasContent(content?: string) {
  return content !== undefined && content.length > 0
}

const styles = StyleSheet.create({
  container: {
    height: 88,
    justifyContent: 'flex-end',
    paddingLeft: 11,
    paddingRight: 11,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 21,
    marginBottom: 2,
  },
  title: {
    fontSize: 15,
    color: '#666666',
    marginRight: 9,
  },
  detail: {
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  content: {
    color: '#333333',
    fontSize: 15,
    lineHeight: 21,
    flexGrow: 1,
    flexShrink: 1,
  },
  placeholder: {
    color: '#CCCCCC',
    fontSize: 15,
    lineHeight: 21,
    flexGrow: 1,
    flexShrink: 1,
  },
  indicator: {
    width: 7.5,
    height: 13,
    marginLeft: 28,
  },
  diviver: {
    backgroundColor: '#ECECEC',
    height: 0.5,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
})
