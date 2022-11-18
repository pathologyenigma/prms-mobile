import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

export interface ItemProps {
	date: string
	time: string
	name: string
	method: string
	position: string
	salary: string
	status: '已面试' | '即将开始' | '待面试'
	isFirst?: boolean
	isLast?: boolean
}

function colorForStatus(status: '已面试' | '即将开始' | '待面试') {
	const map = {
		已面试: '#666666',
		即将开始: '#FF8B49',
		待面试: '#7DDBA3',
	}
	return map[status]
}

export default function Item({
	date,
	time,
	name,
	method,
	position,
	salary,
	status,
	isFirst,
	isLast,
}: ItemProps) {
	return (
		<View style={styles.container}>
			<View style={styles.timeline}>
				<View style={styles.datetime}>
					<Text style={styles.date}>{date}</Text>
					<Text style={styles.time}>{time}</Text>
				</View>
				<View style={styles.stepContainer}>
					<Image
						source={isFirst ? undefined : require('../../../assets/dashed.png')}
						style={styles.stepLineUper}
						resizeMode="cover"
					/>
					<Image
						source={isLast ? undefined : require('../../../assets/dashed.png')}
						style={styles.stepLineLower}
						resizeMode="cover"
					/>
					<Image
						style={styles.stepIndicator}
						resizeMode="center"
						source={
							status === '即将开始'
								? require('./active.png')
								: require('./inactive.png')
						}
					/>
				</View>
			</View>
			<View style={styles.card}>
				<View style={styles.nameRow}>
					<Text style={styles.name}>{name}</Text>
					<Text style={styles.method}>{method}</Text>
				</View>
				<View style={styles.positionRow}>
					<Text style={styles.position}>{position}</Text>
					<View style={styles.divier} />
					<Text style={styles.salary}>{salary}</Text>
				</View>
				<Text style={[styles.status, { color: colorForStatus(status) }]}>
					{status}
				</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	timeline: {
		width: 104,
	},
	datetime: {
		marginTop: 30,
		marginLeft: 16,
	},
	date: {
		color: '#333333',
		fontSize: 14,
	},
	time: {
		color: '#333333',
		fontSize: 17,
		fontWeight: 'bold',
		marginTop: 6,
	},
	stepContainer: {
		position: 'absolute',
		left: 75,
		top: 0,
		bottom: 0,
		width: 19,
		alignItems: 'center',
		overflow: 'hidden',
	},
	stepIndicator: {
		position: 'absolute',
		top: 30,
		width: 19,
		height: 19,
	},
	stepLineUper: {
		width: 1,
		height: 36,
		overflow: 'hidden',
	},
	stepLineLower: {
		width: 1,
		flex: 1,
		overflow: 'hidden',
	},
	card: {
		flex: 1,
		height: 80,
		marginRight: 11,
		marginTop: 30,
		marginBottom: 20,
		justifyContent: 'center',
		backgroundColor: '#FFFFFF',
		borderRadius: 9,
		shadowOffset: { width: 0, height: 1 },
		shadowColor: '#C5C5C5',
		shadowRadius: 8,
		shadowOpacity: 0.3,
		elevation: 8,
	},
	nameRow: {
		flexDirection: 'row',
	},
	name: {
		marginLeft: 22,
		color: '#333333',
		fontSize: 14,
		fontWeight: 'bold',
	},
	method: {
		marginLeft: 12,
		color: '#666666',
		fontSize: 10,
		fontWeight: 'bold',
		borderColor: '#E4E4E4',
		borderWidth: StyleSheet.hairlineWidth,
		borderRadius: 3,
		lineHeight: 16,
		overflow: 'hidden',
		paddingHorizontal: 3,
	},
	positionRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 8,
	},
	position: {
		marginLeft: 22,
		color: '#666666',
		fontSize: 11,
	},
	salary: {
		color: '#666666',
		fontSize: 11,
	},
	divier: {
		width: StyleSheet.hairlineWidth,
		height: 10,
		backgroundColor: '#666666',
		marginHorizontal: 6,
	},
	status: {
		position: 'absolute',
		right: 22,
		fontSize: 14,
	},
})
