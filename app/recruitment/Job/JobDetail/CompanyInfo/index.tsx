import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { CompanyItem } from '../useJobDetail'

interface CompanyInfoProps {
  company: CompanyItem
}

export default function CompanyInfo({
  company: { logo, name, labels, address, coordinate },
}: CompanyInfoProps) {
  const key = 'dd24ba9afebd6c9c303a2e79c0c3d7f2'
  const { latitude, longitude } = coordinate
  const label = `公园,0,1,12,0x333333,0xFFFFFF:${longitude},${latitude}`
  const mapUri = `https://restapi.amap.com/v3/staticmap?location=${longitude},${latitude}&zoom=16&size=720*360&markers=mid,,A:${longitude},${latitude}&key=${key}`

  return (
    <View style={styles.container}>
      <Text style={styles.title}>公司信息</Text>
      <View style={styles.meta}>
        <Image
          source={logo ? { uri: logo } : require('./company_default.png')}
          style={styles.logo}
        />
        <Text style={styles.name}>{name}</Text>
        <Image style={styles.authn} source={require('./authn.png')} />
        <Image style={styles.indicator} source={require('./indicator.png')} />
      </View>
      <View style={styles.labels}>
        {labels.map(label => (
          <Text key={label} style={styles.label}>
            {label}
          </Text>
        ))}
      </View>
      <View style={styles.map}>
        <Image
          source={{
            uri: mapUri,
          }}
          style={{ flex: 1 }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginHorizontal: 11,
    marginBottom: 21,
    paddingHorizontal: 11,
    paddingBottom: 25,
  },
  title: {
    marginTop: 22,
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
  },
  meta: {
    flexDirection: 'row',
    marginTop: 14,
    height: 50,
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
  },
  name: {
    marginLeft: 18,
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
    flexShrink: 1,
  },
  authn: {
    marginLeft: 16,
    marginRight: 16,
  },
  indicator: {
    position: 'absolute',
    right: 0,
  },
  labels: {
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  label: {
    color: '#666666',
    fontSize: 13,
    marginRight: 27,
    marginBottom: 16,
  },
  map: {
    borderRadius: 8,
    aspectRatio: 333 / 180,
    width: '100%',
    overflow: 'hidden',
  },
})
