import { gql, useMutation } from '@apollo/client'
import { ReactNativeFile } from 'apollo-upload-client'
import { useCallback } from 'react'
import * as mime from 'react-native-mime-types'

type CustomFileType = 'Charter' | 'Resume' | 'Photo' | 'Other'

interface UploadExtraAttributes {
  customUploadPath: string
  customFileName: string
  customFileType: CustomFileType
}

function generateRNFile(uri: string, name: string) {
  return uri
    ? new ReactNativeFile({
        uri,
        type: mime.lookup(uri) || 'image',
        name,
      })
    : null
}

export default function useUploadFile() {
  const [upload, { data, loading }] = useMutation(UPLOAD_FILE)

  const uploadFile = useCallback(
    async (filepath: string) => {
      await upload({
        variables: {
          file: generateRNFile(filepath, `file-${Date.now()}`),
          extraAttributes: {
            customFileType: 'photo',
          },
        },
      })
    },
    [upload],
  )

  return uploadFile
}

const UPLOAD_FILE = gql`
  mutation CommonSingleUpload(
    $file: Upload!
    $extraAttributes: UploadExtraAttributes
  ) {
    CommonSingleUpload(file: $file, extraAttributes: $extraAttributes)
  }
`
