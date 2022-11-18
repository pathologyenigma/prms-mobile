import React from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import FavoriteButton from '../TalentDetailView/FavoriteButton'
import ReportButton from '../TalentDetailView/ReportButton'
import TalentDetailView from '../TalentDetailView'
import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper'
import GradientButton from '../../components/GradientButton'
import AlertModal from '../../components/AlertModal'
import { useState } from 'react'
import GhostButton from '../../components/GhostButton'
import NavBar from '../../components/NavBar'

export default function TalentDetailWithJudgment(props) {
  const [alertVisible, setAlertVisible] = useState(false)
  const [noFit, setNoFit] = useState(false)

  const renderBottomBar = () => {
    return (
      <View style={styles.buttons}>
        {!noFit && (
          <GhostButton
            title="不合适"
            style={styles.ghostButton}
            onPress={() => setAlertVisible(true)}
          />
        )}
        <GradientButton
          disabled={noFit}
          title={noFit ? '不合适' : '立即沟通'}
          style={styles.gradientButton}
        />
      </View>
    )
  }

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
      <TalentDetailView id={props.route.params['id']} renderBottomBar={renderBottomBar} />
      <AlertModal
        visible={alertVisible}
        title="确认操作"
        msg="候选人将会被标记为不合适，您不能再发起沟通"
        positiveText="移至不合适"
        positiveTextStyle={styles.positiveTextStyle}
        onPositivePress={() => {
          setAlertVisible(false)
          setNoFit(true)
        }}
        onNegativePress={() => setAlertVisible(false)}
      />
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
  buttons: {
    marginBottom: isIphoneX() ? getBottomSpace() + 5 : 5,
    marginHorizontal: 11,
    marginVertical: 4,
    flexDirection: 'row',
  },
  ghostButton: {
    width: 140,
    height: 40,
    marginRight: 12,
  },
  gradientButton: {
    flex: 1,
  },
  positiveTextStyle: {
    color: '#EE5757',
  },
})
