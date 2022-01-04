import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import IconButton from '../../../components/IconButton'
import RadioLabelGroup from '../../../components/RadioLabelGroup'
import { headerHeight, navigationBarHeight } from '../../../theme'
import LinearGradientMaskedView from '../../../components/LinearGradientMaskedView'
import { useState } from 'react'

export interface JobItem {
  jobId: number
  title: string
}

interface NavBarProps {
  onSearchPress?: () => void
  onPlusPress?: () => void
  jobs: JobItem[]
  onJobItemChecked: (jobId: number) => void
}

export default function NavBar({
  onSearchPress,
  onPlusPress,
  jobs,
  onJobItemChecked,
}: NavBarProps) {
  const [index, setIndex] = useState(0)

  return (
    <LinearGradient
      style={styles.header}
      colors={['#79D398', '#83E4AE']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}>
      <View style={styles.navBar}>
        <LinearGradientMaskedView>
          <ScrollView
            style={styles.scrollview}
            horizontal
            showsHorizontalScrollIndicator={false}>
            <RadioLabelGroup
              key={'labelGroup'}
              style={styles.labelGroup}
              labelStyle={styles.labelStyle}
              labelInactiveStyle={styles.labelInactiveStyle}
              labelSpace={24}
              labels={jobs.map(job => job.title)}
              onValueChange={(_, index) => {
                setIndex(index)
                onJobItemChecked(jobs[index].jobId)
              }}
              checkedIndex={index}
            />
          </ScrollView>
        </LinearGradientMaskedView>
        <IconButton icon={require('./guanli.png')} onPress={onPlusPress} />
        <IconButton
          icon={require('./sousuo.png')}
          style={{ marginRight: 8 }}
          iconStyle={styles.iconStyle}
          onPress={onSearchPress}
        />
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
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
  scrollview: {
    alignSelf: 'stretch',
    flex: 1,
  },
  labelGroup: {
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
  iconStyle: {
    width: 36,
    height: 36,
  },
})
