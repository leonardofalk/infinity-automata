import { createReducer, createActions } from 'reduxsauce'
import _ from 'lodash'
import { NodeTree } from '../../structs/NodeTree'

export const INITIAL_STATE = {
  tree: new NodeTree(),
  words: [],
  nodes: [],
  edges: [],
}

export const { Types, Creators } = createActions(
  {
    addWord: ['word'],
    reset: null,
    states: [],
  },
  { prefix: '@machine/' }
)

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_WORD]: (state: any, { word }) => {
    const words: string[] = _.uniq(
      word
        .toString()
        .trim()
        .split(/\W+/)
    )

    const tree = new NodeTree()

    words.forEach(word => tree.insertWord(word))

    const edges: any[] = tree.getEdges()
    const nodes: any[] = tree.getNodes()

    return {
      ...state,
      tree,
      words,
      edges,
      nodes: [...nodes, { label: `q${nodes.length}*`, id: nodes.length }],
    }
  },
  [Types.RESET]: () => INITIAL_STATE,
})
