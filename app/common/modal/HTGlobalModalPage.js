import React, { Component } from 'react'
import { View, Text } from 'react-native'
import HTToast from './HTToast'
import HTActionToast from './HTActionToast'
import HTHud from './HTHud'
import HTRiseToast from './HTRiseToast'
import HTBottomAnimationView from '~/common/mask/HTBottomAnimationView'
import HTAlert from './HTAlert'
import HTImageListView from './HTImageListView'

export default class HTGlobalModalPage extends Component {

	static navigationOptions = {
		headerShown: false,
		backgroundColor: 'transparent',
		showLoading: false,
		pointerEvents: 'box-none'
	}

	static isFirstLaunch = true

	render() {
		return (
			<View pointerEvents={'box-none'} style={[CONTAINER]}>
				<HTImageListView ref={ref => global.ImageListView = ref} />
				<HTAlert ref={ref => global.Alert = ref} />
				<HTHud ref={ref => global.Hud = ref} />
				<HTToast ref={ref => global.Toast = ref} />
				<HTActionToast ref={ref => global.ActionToast = ref} />
				<HTRiseToast ref={ref => global.RiseToast = ref} />
			</View>
		)
	}

}