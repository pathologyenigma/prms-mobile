import { useMemo } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import {
  Animated,
  Easing,
  Keyboard,
  KeyboardEventListener,
  Platform,
  TextInput,
} from 'react-native'

export default function useAnimatedKeyboard(
  inputRef: React.RefObject<TextInput>,
) {
  const [keyboardShown, setKeyboardShown] = useState(false)

  const keyboardHeight = useRef<Animated.Value>(new Animated.Value(0)).current
  const invertedKeyboardHeight = useMemo(
    () => Animated.multiply(keyboardHeight, -1),
    [],
  )

  useEffect(() => {
    const willKeyboardHide: KeyboardEventListener = e => {
      const { duration } = e
      Animated.timing(keyboardHeight, {
        toValue: 0,
        duration: duration - 50,
        easing: Easing.bezier(0.17, 0.59, 0.4, 0.77),
        useNativeDriver: true,
      }).start(() => {
        setKeyboardShown(false)
      })
    }

    const didKeyboardHide: KeyboardEventListener = e => {
      setKeyboardShown(false)
      inputRef.current?.blur()
      keyboardHeight.setValue(0)
    }

    const willKeyboardShow: KeyboardEventListener = e => {
      const {
        endCoordinates: { height },
        duration,
      } = e
      Animated.timing(keyboardHeight, {
        toValue: height,
        duration: duration,
        easing: Easing.bezier(0.17, 0.59, 0.4, 0.77),
        useNativeDriver: true,
      }).start()
    }

    const didKeyboardShow: KeyboardEventListener = e => {
      keyboardHeight.setValue(e.endCoordinates.height)
    }

    const subscriptions = [
      Keyboard.addListener('keyboardWillHide', willKeyboardHide),
      Keyboard.addListener('keyboardDidHide', didKeyboardHide),
      Keyboard.addListener('keyboardWillShow', willKeyboardShow),
      Keyboard.addListener('keyboardDidShow', didKeyboardShow),
    ]

    return () => {
      subscriptions.forEach(subscription => subscription.remove())
    }
  }, [])

  const showKeyboard = useCallback(() => {
    setKeyboardShown(true)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }, [])

  const keyboardAccessoryStyle = useMemo<StyleProp<any>>(
    () => ({
      position: Platform.OS === 'ios' ? 'absolute' : 'relative',
      bottom: 0,
      width: '100%',
      transform: [
        {
          translateY:
            Platform.OS === 'ios'
              ? invertedKeyboardHeight
              : new Animated.Value(0),
        },
      ],
    }),
    [],
  )

  return { keyboardAccessoryStyle, keyboardShown, showKeyboard }
}
