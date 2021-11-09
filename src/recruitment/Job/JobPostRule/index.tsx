import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native'
import { StackNavigationOptions } from '@react-navigation/stack'

export const JobPostRuleOptions: StackNavigationOptions = {
  title: '职位发布规范',
}

export default function JobPostRule() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{`一、职位名称发布规范`}</Text>
      <Text style={styles.detail}>{`职位名称请勿包含以下信息，包括但不限于:
      1、含违法违规信息
      2、含性别、学历、院校、地区、民族等歧视性信息
      3、含认证、融资、招商、培训、推广、挂靠等非招聘或非提供实际就业机会信息
      4、含特殊字符、一职多岗、薪资体现、与职位名称无关等不规范信息`}</Text>
      <Text style={styles.title}>{`二、职位描述发布规范`}</Text>
      <Text style={styles.detail}>{`职位描述请勿包含以下信息，包括但不限于：
      1、含违法违规信息
      2、含性别、学历、院校、地区、民族等歧视性信息
      3、含认证、融资、招商、培训、推广、产品售卖、挂靠等非招聘或非提供实际就业机会信息`}</Text>
      <Text style={styles.title}>{`三、公司内容简介规范`}</Text>
      <Text style={styles.detail}>{`公司简介请勿包含以下信息，包括但不限于：
      1、含第三方或违法链接
      2、含商标、品牌、专利等侵权信息
      3、含与企业性质、规模等不符或夸大宣传的信息
      4、含特殊字符、彩色字体底纹、图片等不规范信息
      5、含微信、QQ、手机等联系方式信息`}</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 12,
  },
  title: {
    color: '#333333',
    fontSize: 15,
    lineHeight: 22,
    marginVertical: 16,
  },
  detail: {
    color: '#555555',
    fontSize: 13,
    lineHeight: 22,
  },
})
