import MaskedView from '@react-native-community/masked-view'
import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Rating from '../../../components/Rating'
import Grading from '../Grading'

export default function Dashboard() {
	return (
		<View style={styles.container}>
			<View style={styles.ratingContainer}>
				<View style={styles.scoreContainer}>
					<MaskedView
						style={styles.masked}
						maskElement={<Text style={styles.score}>4.4</Text>}>
						<LinearGradient
							style={styles.linearGradient}
							colors={['#FF6F6F', '#FC384B']}
							locations={[0, 1.0]}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
						/>
					</MaskedView>
					<Text style={styles.scoreUnit}>分</Text>
				</View>
				<Rating style={styles.rating} score={4} />
			</View>
			<View style={styles.divider}></View>
			<View style={styles.gradings}>
				<Grading key="title" label="职位描述：" score={9} />
				<Grading key="company" label="公司情况：" score={9} />
				<Grading key="interviewer" label="面试官：" score={8} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 100,
		backgroundColor: '#FFFFFF',
	},
	ratingContainer: {
		marginLeft: 11,
		height: '100%',
		justifyContent: 'center',
	},
	scoreContainer: {
		flexDirection: 'row',
		height: 40,
		alignItems: 'center',
		marginTop: -6,
	},
	masked: {
		flex: 1,
		width: 40,
	},
	linearGradient: {
		flex: 1,
		height: '100%',
	},
	score: {
		color: '#FF6F6F',
		fontSize: 30,
		fontWeight: 'bold',
	},
	scoreUnit: {
		color: '#888888',
		fontSize: 15,
		marginBottom: Platform.OS === 'ios' ? -4 : -8,
	},
	rating: {
		marginTop: 10,
	},
	divider: {
		width: StyleSheet.hairlineWidth,
		height: 45,
		backgroundColor: '#DDDDDD',
		marginHorizontal: 16,
	},
	gradings: {
		marginRight: 11,
		height: 64,
		flex: 1,
		justifyContent: 'space-between',
	},
	interviewAssessmentButton: {
		marginTop: 24,
	},
	interviewAssessmentButtonText: {
		color: '#57DE9E',
		fontSize: 14,
		fontWeight: 'bold',
	},
})
