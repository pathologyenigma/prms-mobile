import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { PropsWithChildren } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { headerHeight, navigationBarHeight, statusBarHeight } from '../../theme'
import BackImage from '../BackImage'

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
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}>
          <BackImage />
        </TouchableOpacity>
      )
    }
    return null
  }

  const renderHeaderRight = () => {
    if (headerRight) {
      return headerRight()
    }
    return null
  }

  const renderTitle = () => {
    if (title) {
      return <Text style={styles.title}>{title}</Text>
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
        <View style={styles.headerLeft}>{renderHeaderLeft()}</View>
        <View style={styles.headerRight}>{renderHeaderRight()}</View>
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
    justifyContent: 'center',
  },
  headerLeft: {
    position: 'absolute',
    left: 0,
  },
  headerRight: {
    position: 'absolute',
    right: 0,
  },
  title: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: 18,
  },
})
