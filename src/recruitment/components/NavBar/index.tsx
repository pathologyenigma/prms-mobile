import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { PropsWithChildren, useState } from 'react'
import {
  ViewStyle,
  StyleProp,
  TextStyle,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native'
import { headerHeight, navigationBarHeight, statusBarHeight } from '../../theme'
import BackImage from '../BackImage'
import IconButton from '../IconButton'

interface NavBarProps {
  headerLeft?: () => JSX.Element
  headerRight?: () => JSX.Element
  title?: string
}

export default function NavBar({
  headerLeft,
  headerRight,
  title,
  children,
}: PropsWithChildren<NavBarProps>) {
  const navigation = useNavigation<StackNavigationProp<any>>()

  const renderHeaderLeft = () => {
    if (headerLeft) {
      return headerLeft()
    }
    if (navigation.canGoBack()) {
      return (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <BackImage />
        </TouchableOpacity>
      )
    }
    return null
  }

  const renderHeaderRight = () => {
    if (headerRight) {
      return headerHeight()
    }
    return null
  }

  const renderTitle = () => {
    if (title) {
      return (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      )
    }
    return null
  }

  const renderNavBar = () => {
    if (children) {
      return (
        <View style={styles.nav}>
          {renderHeaderLeft()}
          {children}
          {renderHeaderRight()}
        </View>
      )
    }

    return (
      <View style={styles.nav}>
        {renderTitle()}
        {renderHeaderLeft()}
        {renderHeaderRight()}
      </View>
    )
  }

  return <View style={styles.header}>{renderNavBar()}</View>
}

const styles = StyleSheet.create({
  header: {
    height: headerHeight(),
    backgroundColor: '#FFFFFF',
  },
  nav: {
    marginTop: statusBarHeight(),
    height: navigationBarHeight(),
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {},
  titleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  title: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: 18,
  },
})
