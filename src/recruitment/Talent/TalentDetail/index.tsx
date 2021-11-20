import React from 'react'
import { StyleSheet, View } from 'react-native'
import { StackNavigationOptions } from '@react-navigation/stack'
import FavoriteButton from '../TalentDetailView/FavoriteButton'
import ReportButton from '../TalentDetailView/ReportButton'
import TalentDetailView from '../TalentDetailView'

export const TalentDetailOptions: StackNavigationOptions = {
  title: '',
  headerRight: () => (
    <View style={styles.headerButtons}>
      <FavoriteButton checked={true} />
      <ReportButton />
    </View>
  ),
}

export default function TalentDetail() {
  return <TalentDetailView />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerButtons: {
    flexDirection: 'row',
  },
})
