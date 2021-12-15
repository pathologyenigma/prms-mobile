import React from 'react'
import { StyleSheet, View } from 'react-native'
import FavoriteButton from '../TalentDetailView/FavoriteButton'
import ReportButton from '../TalentDetailView/ReportButton'
import TalentDetailView from '../TalentDetailView'
import NavBar from '../../components/NavBar'

export default function TalentDetail() {
  return (
    <View style={styles.container}>
      <NavBar
        headerRight={() => (
          <View style={styles.headerButtons}>
            <FavoriteButton checked={true} />
            <ReportButton />
          </View>
        )}
      />
      <TalentDetailView />
    </View>
  )
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
