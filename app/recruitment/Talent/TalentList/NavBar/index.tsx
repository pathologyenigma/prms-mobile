import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import IconButton from '../../../components/IconButton'
import { headerHeight, navigationBarHeight } from '../../../theme'
import LinearGradientMaskedView from '../../../components/LinearGradientMaskedView'
import RadioGroup from '../../../components/RadioGroup'
import RadioLabel from '../../../components/RadioLabel'
import { HTPageHeaderView } from 'react-native-selected-page'

export interface JobItem {
  jobId: number
  title: string
}

interface NavBarProps {
  onSearchPress?: () => void
  onPlusPress?: () => void
  jobs: JobItem[]
  selectedIndex?: number
  onJobItemChecked: (jobId: number) => void
}

export default class NavBar extends Component {

	render() {
		console.log('render')
		const {
			onSearchPress,
			onPlusPress,
			jobs = [],
			selectedIndex,
			onJobItemChecked,
		} = this.props
		let padding = 0
		if ((jobs?.length ?? 0) > 0) {
			padding += (jobs?.[0]?.title?.length ?? 0) * 3.5
		}
		return (
			<LinearGradient
		      style={styles.header}
		      colors={['#79D398', '#83E4AE']}
		      start={{ x: 0, y: 0 }}
		      end={{ x: 1, y: 0 }}>
		      <View style={styles.navBar}>
		        <LinearGradientMaskedView>
		          <HTPageHeaderView
					style={{ flex: 1, height: 44 }}
					data={jobs}
					titleFromItem={item => item.title}
					initScrollIndex={selectedIndex}
					itemContainerStyle={{ paddingHorizontal: padding }}
					itemTitleStyle={{ fontSize: 16, fontWeight: '500' }}
					itemTitleNormalStyle={{ color: 'white' }}
					itemTitleSelectedStyle= {{ color: 'white', fontSize: 19 }}
					onSelectedPageIndex={(pageIndex) => {
						onJobItemChecked(pageIndex)
					}}
					cursorStyle={{ width: null, transform: [{ scaleX: 0.4 }], height: 2, backgroundColor: 'transparent' }}
				  />
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
