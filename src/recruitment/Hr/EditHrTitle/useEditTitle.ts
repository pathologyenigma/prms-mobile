import { gql, useMutation } from '@apollo/client'
import { useCallback } from 'react'

export default function useEditTitle() {
  const [edit] = useMutation(mutation)

  const editTitle = useCallback(
    async (title: string) => {
      await edit({
        variables: {
          pos: title,
        },
      })
    },
    [edit],
  )

  return editTitle
}

const mutation = gql`
  mutation ENTEditAccountInfo($pos: String) {
    ENTEditAccountInfo(pos: $pos)
  }
`
