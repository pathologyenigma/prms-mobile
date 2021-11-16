import React from 'react'
import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native'

interface SectionProps {
  style?: StyleProp<ViewStyle>
  renderSubtitle?: () => JSX.Element
  renderPeriod?: () => JSX.Element
  title: string
  subtitle?: string
  period?: string
  detail?: string
}

export default function Section({
  style,
  renderSubtitle,
  renderPeriod,
  title,
  subtitle,
  period,
  detail,
}: SectionProps) {
  return (
    <View style={[styles.section, style]}>
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        {!!period && <Text style={styles.period}>{period}</Text>}
        {renderPeriod && renderPeriod()}
      </View>
      {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {renderSubtitle && renderSubtitle()}
      {!!detail && <Text style={styles.detail}>{detail}</Text>}
      <View style={styles.divider} />
    </View>
  )
}

const styles = StyleSheet.create({
  section: {},
  row: {
    paddingHorizontal: 11,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
  },
  subtitle: {
    marginHorizontal: 11,
    color: '#666666',
    fontSize: 13,
    marginTop: 8,
  },
  period: {
    color: '#888888',
    fontSize: 13,
    marginRight: 18,
  },
  detail: {
    marginHorizontal: 11,
    marginTop: 12,
    color: '#666666',
    fontSize: 13,
    lineHeight: 17,
  },
  divider: {
    marginTop: 32,
    backgroundColor: '#ECECEC',
    height: 0.5,
  },
})
