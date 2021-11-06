import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Empty from './Empty'
import TalentList from './TalentList'

function Talent() {
  return <TalentList />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 36,
  },
})

export default Talent
