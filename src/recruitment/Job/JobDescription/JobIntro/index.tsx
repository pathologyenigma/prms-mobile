import React, { useState } from 'react'
import {
  ViewStyle,
  StyleProp,
  TextStyle,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native'

const labels = [
  '技术管理',
  '硬件实施',
  '产品设计',
  '需求采集',
  '产品开发',
  '产品验收',
  '产品内部评审',
]

const detail = `岗位职责：

1、项目管理:统筹并管理项目，规划和跟踪项目范围、成本、质量、风险等;组织项目各关键节点评审，总结和评定项目阶段性成果，优化项目流程和方法，提升团队工作效率和执行力;
2、预研阶段:评估项目可行性，选择更优的组配件降低成本，制定和执行项目预算和项目计划;
3、研发阶段:沟通和实现需求，跟进项目进度确保迭代顺利
4、打样阶段:确认产品结构、电路等可行性和产品总体成本分析核对;
5、量产阶段:督促供应商按时按量完成预定生产计划，跟进和解决项目量产后的技术问题，优化升级产品并总结经验。

任职资格：

1、统招本科及以上学历，2~5年以上工作经验;
2、2年以上智能硬件/智能家居等项目管理经验;

加分项

1、英语过六级`

export default function JobIntro() {
  const [truncated, setTruncated] = useState(detail.length > 300)
  const renderDetail = () => {
    if (truncated) {
      return (
        <Text style={styles.detail}>
          {truncated ? detail.substr(0, 300) : detail}...
          <Text
            suppressHighlighting
            style={styles.more}
            onPress={() => setTruncated(false)}>
            查看全部
          </Text>
        </Text>
      )
    }
    return <Text style={styles.detail}>{detail}</Text>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>职位介绍</Text>
      <View style={styles.labels}>
        {labels.map(label => (
          <Text key={label} style={styles.label}>
            {label}
          </Text>
        ))}
      </View>
      {renderDetail()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 11,
    marginBottom: 12,
    paddingHorizontal: 11,
  },
  title: {
    marginTop: 18,
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
  },
  labels: {
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  label: {
    color: '#888888',
    fontSize: 11,
    lineHeight: 18,
    paddingHorizontal: 9,
    marginRight: 9,
    marginBottom: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
  },
  detail: {
    marginTop: 10,
    marginBottom: 24,
    color: '#333333',
    fontSize: 13,
    lineHeight: 18,
  },
  more: {
    color: '#57DE9E',
  },
})
