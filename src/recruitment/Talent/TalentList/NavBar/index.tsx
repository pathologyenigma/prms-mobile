import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import IconButton from '../../../components/IconButton'
import { headerHeight, navigationBarHeight } from '../../../theme'
import LinearGradientMaskedView from '../../../components/LinearGradientMaskedView'
import RadioGroup from '../../../components/RadioGroup'
import RadioLabel from '../../../components/RadioLabel'

export interface JobItem {
  jobId: number
  title: string
}

interface NavBarProps {
  onSearchPress?: () => void
  onPlusPress?: () => void
  jobs: JobItem[]
  checkedJobId?: number
  onJobItemChecked: (jobId: number) => void
}

export default function NavBar({
  onSearchPress,
  onPlusPress,
  jobs,
  checkedJobId,
  onJobItemChecked,
}: NavBarProps) {
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
            <RadioGroup
              value={checkedJobId}
              onValueChecked={value => onJobItemChecked(value)}>
              <View style={styles.labelGroup}>
                {jobs.map((job, index) => (
                  <RadioLabel
                    key={job.jobId}
                    label={job.title}
                    value={job.jobId}
                    style={[
                      styles.labelStyle,
                      { marginLeft: index !== 0 ? 20 : 0 },
                    ]}
                    checkedStyle={styles.checkedLabelStyle}
                  />
                ))}
              </View>
            </RadioGroup>
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
    flex: 1,
    flexDirection: 'row',
  },
  checkedLabelStyle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    // ios 垂直居中
    lineHeight: navigationBarHeight(),
  },
  labelStyle: {
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
