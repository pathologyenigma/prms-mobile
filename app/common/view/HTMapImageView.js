import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'


export default class HTMapImageView extends Component {

	render() {
		if ((this?.props?.coordinate?.length ?? 0) < 2) {
			return null
		}
		const key = 'dd24ba9afebd6c9c303a2e79c0c3d7f2'
		const [longitude, latitude] = this?.props?.coordinate
		const mapUri = `https://restapi.amap.com/v3/staticmap?location=${longitude},${latitude}&zoom=16&size=720*360&markers=mid,,A:${longitude},${latitude}&key=${key}`
		return (
			<CacheImage
				style={this.props.style}
				source={{ uri: mapUri }}
			/>
		)
	}

}