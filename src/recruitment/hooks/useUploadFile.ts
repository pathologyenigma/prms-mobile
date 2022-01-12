import { gql, useMutation } from '@apollo/client'
import { ReactNativeFile } from 'apollo-upload-client'
import { useCallback } from 'react'
import * as mime from 'react-native-mime-types'

interface UploadFileResult {
  CommonSingleUpload: string
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
  const [upload] = useMutation<UploadFileResult>(UPLOAD_FILE)

  const uploadFile = useCallback(
    async (filepath: string) => {
      const result = await upload({
        variables: {
          file: generateRNFile(
            filepath,
            `file-${Date.now()}.${mime.extension(mime.lookup(filepath))}`,
          ),
        },
      })

      return result.data?.CommonSingleUpload || null
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
