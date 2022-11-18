import React, { useRef } from 'react'
import {
	StyleSheet,
	View,
	FlatList,
	ListRenderItem,
	TextInput,
	Animated,
	Keyboard,
} from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'
import TextButton from '../../components/TextButton'
import useKeyboardAccessory from '../../hooks/useKeyboardAccessory'
import InterviewAssessment from './InterviewAssessment'

interface GradingPageProps {
	tab: string
}

const data = ['1', '2', '3']

export default function GradingPage({}: GradingPageProps) {
	const inputRef = useRef<TextInput>(null)

	const { keyboardAccessoryStyle, keyboardShown, showKeyboard } =
		useKeyboardAccessory(inputRef)

	const renderItem: ListRenderItem<string> = ({ item, index }) => {
		return <InterviewAssessment onReply={showKeyboard} />
	}

	return (
		<View style={StyleSheet.absoluteFillObject} collapsable={false}>
			<FlatList
				keyboardDismissMode="interactive"
				keyboardShouldPersistTaps="handled"
				contentContainerStyle={styles.content}
				keyExtractor={item => item}
				data={data}
				renderItem={renderItem}
			/>
			{keyboardShown && (
				<Animated.View style={[styles.inputContainer, keyboardAccessoryStyle]}>
					<TextInput
						ref={inputRef}
						style={styles.input}
						multiline
						placeholder="回复：莫纯婷"
						placeholderTextColor="#AAAAAA"
					/>
					<TextButton
						style={styles.send}
						title="发送"
						onPress={() => {
							Keyboard.dismiss()
						}}
					/>
				</Animated.View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	content: {
		flexGrow: 1,
		backgroundColor: '#FFFFFF',
		paddingBottom: isIphoneX() ? 44 : 20,
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 11,
		paddingVertical: 5,
		backgroundColor: '#FFFFFF',
	},
	input: {
		paddingTop: 4,
		paddingBottom: 4,
		margin: 0,
		backgroundColor: '#F7F7F7',
		minHeight: 30,
		maxHeight: 90,
		flex: 1,
		borderRadius: 2,
		color: '#333333',
		fontSize: 15,
		lineHeight: 21,
		paddingHorizontal: 14,
	},
	send: {
		marginLeft: 15,
	},
})
