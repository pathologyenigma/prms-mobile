import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Platform, TextInput } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import TextButton from '../../components/TextButton'
import { useKeyboard } from '@react-native-community/hooks'
import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper'
import NavBar from '../../components/NavBar'
import { JobParamList } from '../typings'

const placeholder = `请输入岗位职责、任职要求等描述，至少10个字，建 议使用以下格式逐条列出： 
1、…… 
2、……  

任职要求 
1、…… 
2、……`

const offset = isIphoneX() ? getBottomSpace() : 10

type Props = StackScreenProps<JobParamList, 'EditJobDescription'>

export default function EditJobDescription({ navigation, route }: Props) {
	const { initialDescription, callback } = route.params

	const [description, setDescription] = useState(initialDescription || '')

	return (
		<View style={styles.container}>
			<NavBar
				title="职位描述"
				headerRight={() => (
					<TextButton
						title="保存"
						onPress={() => {
							callback && callback(navigation, { jobDescription: description })
							navigation.pop()
						}}
					/>
				)}
			/>
			<View style={styles.box}>
				<Text style={styles.note}>
					请勿输入公司邮箱、联系电话、薪资面议及外链，请不要包含性 歧视语，
					<Text
						style={styles.rule}
						suppressHighlighting={true}
						onPress={() => navigation.push('JobPostRule')}>
						职位发布规范
					</Text>
				</Text>
			</View>

			<TextInput
				style={styles.input}
				multiline={true}
				maxLength={1000}
				placeholder={placeholder}
				value={description}
				onChangeText={setDescription}
				placeholderTextColor="#CCCCCC"
				textAlignVertical="top"
				autoFocus={false}
				scrollEnabled={true}
			/>

			<View style={styles.row}>
				<Text style={styles.count}>{description.length}</Text>
				<Text style={styles.limit}>/1000</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	box: {
		padding: 9,
		backgroundColor: '#F7F7F7',
		borderRadius: 4,
		marginHorizontal: 11,
	},
	note: {
		color: '#888888',
		fontSize: 12,
		lineHeight: 17,
	},
	rule: {
		color: '#54D693',
	},
	input: {
		margin: 14,
		padding: 15,
		flex: 0.5,
	},
	row: {
		marginRight: 15,
		justifyContent: 'flex-end',
		flexDirection: 'row',
	},
	count: {
		color: '#333333',
		fontSize: 15,
		lineHeight: 19,
	},
	limit: {
		color: '#CCCCCC',
		fontSize: 15,
		lineHeight: 19,
	},
})
