import { NodeTree } from './NodeTree'

it('ABC - works', () => {
  const tree = new NodeTree()

  tree.addWords('abc')

  expect(tree.getState()).toEqual({
    q0: { on: { a: 'q1' } },
    q1: { on: { b: 'q2' } },
    q2: { on: { c: 'qZ' } },
    qZ: { type: 'final' },
  })
})

it('ABC, DBA - works', () => {
  const tree = new NodeTree()

  tree.addWords('abc', 'dba')

  expect(tree.getState()).toEqual({
    q0: { on: { a: 'q1', d: 'q3' } },
    q1: { on: { b: 'q2' } },
    q2: { on: { c: 'qZ' } },
    q3: { on: { b: 'q4' } },
    q4: { on: { a: 'qZ' } },
    qZ: { type: 'final' },
  })
})

it('ABC, ABD - works', () => {
  const tree = new NodeTree()

  tree.addWords('abc', 'abd')

  expect(tree.getState()).toEqual({
    q0: { on: { a: 'q1' } },
    q1: { on: { b: 'q2' } },
    q2: { on: { c: 'qZ', d: 'qZ' } },
    qZ: { type: 'final' },
  })
})
