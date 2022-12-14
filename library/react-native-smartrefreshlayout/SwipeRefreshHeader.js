import React, {Component} from 'react';
import { RefreshControl, requireNativeComponent, UIManager } from 'react-native'
import MJRefreshHeader from './MJRefreshHeader'

export default class SwipeRefreshHeader extends MJRefreshHeader {

	render() {
		return (
			<RefreshControl 
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