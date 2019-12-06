import React from 'react'
import { useMachine } from '@xstate/react'

export const Graph = ({ tree }: any) => {
  const [current, send, service] = useMachine(tree.getMachine())

  if (!tree || tree.isEmpty()) {
    return null
  }

  return null
}
