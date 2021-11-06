import React from 'react'
import { View, StyleSheet, StatusBar, ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import IconButton from '../../components/IconButton'
import RadioLabelGroup from '../../components/RadioLabelGroup'
import { headerHeight, navigationBarHeight } from '../../theme'
import LinearGradientMaskedView from '../../components/LinearGradientMaskedView'

export default function TalentList() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        style={styles.header}
        colors={['#79D398', '#83E4AE']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <View style={styles.navBar}>
          <LinearGradientMaskedView>
            <ScrollView
              style={styles.jobs}
              horizontal
              showsHorizontalScrollIndicator={false}>
              <RadioLabelGroup
                key={'labelGroup'}
                style={styles.group}
                labelStyle={styles.labelStyle}
                labelInactiveStyle={styles.labelInactiveStyle}
                labelSpace={24}
                labels={['产品经理', 'UE设计师', 'APP设计师', 'APP设计师']}
                checkedIndex={0}
              />
            </ScrollView>
          </LinearGradientMaskedView>
          <IconButton icon={require('./guanli.png')} />
          <IconButton
            icon={require('./sousuo.png')}
            style={{ marginRight: 8 }}
          />
        </View>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    height: navigationBarHeight(),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  header: {
    height: headerHeight(),
    justifyContent: 'flex-end',
  },
  jobs: {
    alignSelf: 'stretch',
    flex: 1,
  },
  group: {
    paddingHorizontal: 10,
  },
  labelStyle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '500',
    // ios 垂直居中
    lineHeight: navigationBarHeight(),
  },
  labelInactiveStyle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'normal',
    lineHeight: navigationBarHeight(),
  },
})
