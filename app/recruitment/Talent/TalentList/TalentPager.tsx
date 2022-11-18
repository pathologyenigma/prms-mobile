import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useRef, useState, Component } from 'react'
import { Animated, View, StyleSheet } from 'react-native'
import PagerView from 'react-native-pager-view'
import FilterButton from '../../components/FilterButton'
import RadioGroup from '../../components/RadioGroup'
import RadioLabel from '../../components/RadioLabel'
import usePagerView from '../../hooks/usePagerView'
import { TalentParamList } from '../typings'
import TalentPage from './TalentPage'
import { HTPageHeaderView } from 'react-native-selected-page'

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView)

interface SortItem {
  label: string
  value: boolean
}

const sorts: SortItem[] = [
  {
    label: '推荐',
    value: false,
  },
  {
    label: '最新',
    value: true,
  },
]

interface TalentPagerProps {
  navigation: StackNavigationProp<TalentParamList>
  jobName?: string
  jobCategory?: [string]
  keyword?: string
}

export default class TalentPager extends Component {

	constructor(props) {
		super(props)
		this.state = {
			itemList: [
				{ title: '推荐', onPress: () => {
					this.state.filterConfig.sortByUpdatedTime = false
				} },
				{ title: '最新', onPress: () => {
					this.state.filterConfig.sortByUpdatedTime = false
				} },
			],
			filterConfig: {
				keyword: this.props.keyword ?? undefined,
				category: this.props.jobCategory ?? undefined
			}
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		this.state.filterConfig.keyword = nextProps.keyword
		this.state.filterConfig.category = nextProps.jobCategory
		return true
	}

	render() {
		return (
			<View style={styles.container}>
			   <View style={styles.filterbar}>
			       <HTPageHeaderView
						style={{ flex: 1, height: 40 }}
						data={this.state.itemList}
						titleFromItem={item => item.title}
						initScrollIndex={0}
						itemContainerStyle={{ paddingHorizontal: 10 }}
						itemTitleStyle={{ fontSize: 13, fontWeight: '500' }}
						itemTitleNormalStyle={{ color: '#666' }}
						itemTitleSelectedStyle= {{ color: '#7DDBA3' }}
						onSelectedPageIndex={(pageIndex) => {
							this.state.itemList[pageIndex].onPress()
							this.setState(this.state, () => {
								this.contentPage._onRefresh(true, true)
							})
						}}
						cursorStyle={{ width: null, transform: [{ scaleX: 0.4 }], height: 2, backgroundColor: 'transparent' }}
					/>
					<FilterButton
			          text={'筛选'}
			          style={styles.filterButton}
			          onPress={() => this.props.navigation.push('CandidateFilter', { callback: (result) => {
			          	this.setState({ filterConfig: { ...this.state.filterConfig, ...result } }, () => {
			          		this.contentPage._onRefresh(true, true)
			          	})
			          }})}
			        />
				</View>
				<TalentPage
					ref={ref => this.contentPage = ref}
		            filterConfig={this.state.filterConfig}
		            navigation={this.props.navigation}
		        />
		    </View>
		)
	}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterButton: {
    marginRight: 11,
  },
  filterbar: {
    // height: 40,
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#FFFFFF',
  },
  labelGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  checkedLabelStyle: {
    color: '#7DDBA3',
    fontSize: 13,
    fontWeight: 'bold',
    // ios 垂直居中
    lineHeight: 40,
  },
  labelStyle: {
    color: '#666666',
    fontSize: 13,
    fontWeight: 'normal',
    lineHeight: 40,
    paddingHorizontal: 11,
  },
})
