import 'react-native-gesture-handler'
import React, { Component } from 'react'
import HTInitManager from '~/common/init/HTInitManager'
import { HTRouteComponent } from 'react-native-route'

HTInitManager.init()

export default class App extends Component {

	render() {
		return (
			<HTRouteComponent
				{ ...this.props }
			/>
		)
	}

}
