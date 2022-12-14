import React, {Component} from 'react';
import { requireNativeComponent, UIManager, findNodeHandle } from 'react-native'

const RNMJRefreshHeader = requireNativeComponent('RNMJRefreshHeader')

export default class MJRefreshHeader extends Component {

	componentDidUpdate() {
		this.endRefresh()
	}

	endRefresh = () => {
		UIManager.dispatchViewManagerCommand(
			findNodeHandle(this.ref),
			'setNativeRefreshing',
			[false]
	    )
	}

	render() {
		return (
			<RNMJRefreshHeader 
				{...this.props}
				ref={(ref) => {
					this.ref = ref
					this.props.ref && this.props.ref(ref)
				}}
				onRefresh={() => {
					this.props.onRefresh(this.endRefresh)
				}}
			/>
		)
	}

}