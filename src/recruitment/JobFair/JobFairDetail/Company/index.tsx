import React from 'react'
import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import Rating from '../../../components/Rating'

const companies = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

export default function Company() {
  const tags = ['六险一金', '计算机软件', '成立34年', '火热招聘']
  const labels = [
    '深圳·龙岗',
    '不需要融资',
    '2000人以上',
    '硬件智能，IT服务',
    '上市公司',
  ]

  const renderCompanyItem = () => {
    return (
      <View style={styles.item}>
        <View style={styles.itemContent}>
          <Image style={styles.logo} source={require('./assets/logo.png')} />
          <View style={styles.column}>
            <Text style={styles.name}>华为技术有限公司</Text>
            <View style={styles.tags}>
              {tags.map(tag => (
                <Text key={tag} style={styles.tag}>
                  {tag}
                </Text>
              ))}
            </View>
            <View style={styles.row}>
              <Text style={styles.score}>面试评分：</Text>
              <Rating style={styles.stars} score={4} />
              <Text style={styles.headcount}>在招职位545</Text>
            </View>
            <View style={styles.labels}>
              {labels.map((label, index) => (
                <>
                  <Text key={label} style={styles.label}>
                    {label}
                  </Text>
                  {index < labels.length - 1 && (
                    <View key={'divider-' + index} style={styles.divider} />
                  )}
                </>
              ))}
            </View>
          </View>
        </View>
      </View>
    )
  }

  return (
    <FlatList
      listKey="compnay"
      nestedScrollEnabled={false}
      alwaysBounceVertical={false}
      keyExtractor={item => item}
      data={companies}
      renderItem={renderCompanyItem}
      style={styles.container}
      contentContainerStyle={styles.content}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  item: {
    height: 140,
    borderTopColor: '#F0F0F0',
    borderTopWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
  },
  itemContent: {
    flexDirection: 'row',
  },
  logo: {
    marginLeft: 11,
    width: 35,
    height: 35,
  },
  column: {
    marginLeft: 16,
    marginRight: 11,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    marginTop: 8,
  },
  name: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 3,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tag: {
    height: 15,
    lineHeight: 15,
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 4,
    color: '#888888',
    fontSize: 10,
    marginRight: 4,
    marginBottom: 4,
  },
  score: {
    color: '#666666',
    fontSize: 10,
  },
  stars: {},
  headcount: {
    color: '#666666',
    fontSize: 10,
    marginLeft: 17,
  },
  labels: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    alignItems: 'center',
  },
  label: {
    color: '#666666',
    fontSize: 11,
    marginBottom: 5,
  },
  divider: {
    width: StyleSheet.hairlineWidth,
    height: 11,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 6,
  },
})
