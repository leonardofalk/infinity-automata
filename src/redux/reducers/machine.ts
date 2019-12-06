import { createReducer, createActions } from 'reduxsauce'
import _ from 'lodash'
import { NodeTree } from '../../structs/NodeTree'

export const INITIAL_STATE = {
  tree: new NodeTree(),
  test: null,
  isFinal: false,
}

export const { Types, Creators } = createActions(
  {
    addWord: ['word'],
    addTest: ['test'],
    reset: null,
    states: [],
  },
  { prefix: '@machine/' }
)

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_TEST]: (state: any, { test: bTest }) => {
    const isFinal = bTest[bTest.length - 1] === ' '
    const test = _.last(
      bTest
        .toString()
        .trim()
        .split(/\W+/)
    )

    return {
      ...state,
      isFinal,
      test,
    }
  },

  [Types.ADD_WORD]: (state: any, { word }) => {
    const words = _.uniq<string>(
      word
        .toString()
        .trim()
        .split(/\W+/)
    )
    const tree = new NodeTree()

    tree.addWords(...words)

    return {
      ...state,
      tree,
    }
  },
  [Types.RESET]: () => INITIAL_STATE,
})
