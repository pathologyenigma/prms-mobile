import { useLayout } from '@react-native-community/hooks'
import React, { PropsWithChildren } from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'

interface GridViewProps {
  style?: StyleProp<ViewStyle>
  numOfRow?: number
  spacing?: number
}

export default function GridView({
  style,
  numOfRow = 3,
  spacing = 20,
  children,
}: PropsWithChildren<GridViewProps>) {
  const { onLayout, width } = useLayout()
  const itemWidth = (width - (numOfRow - 1) * spacing - 0.5) / numOfRow

  return (
    <View style={[styles.container, style]} onLayout={onLayout}>
      {React.Children.map(children, function (child, index) {
        if (React.isValidElement(child)) {
          const style = child.props.style
          return React.cloneElement(child, {
            style: [
              style,
              {
                width: itemWidth,
                marginLeft: index % numOfRow !== 0 ? spacing : 0,
              },
            ],
          })
        }
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
})
