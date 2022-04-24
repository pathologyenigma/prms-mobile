import React from 'react'
import IconButton from '../../../components/IconButton'

interface ReportButtonProps {
  onPress?: () => void
}

export default function ReportButton({ onPress }: ReportButtonProps) {
  return <IconButton icon={require('./jubao.png')} onPress={onPress} />
}
