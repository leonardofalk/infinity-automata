import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'antd'
import _ from 'lodash'

export const UML = ({ tree, test, isFinal }: any) => {
  const [idx, setIndex] = React.useState(0)
  const columns = [
    { title: ' ', dataIndex: 'stateKey', width: 32, align: 'center' },
    ...tree.getAlphabet().map((letter: string) => ({
      title: letter,
      dataIndex: letter,
      key: letter,
      width: 32,
      align: 'center',
    })),
  ]
  const dataSource = _.map(tree.getState(), ({ on, type }: any, stateKey) => ({
    key: stateKey,
    stateKey: `${stateKey}${type && type === 'final' ? '*' : ''}`,
    ...on,
  }))

  return (
    <Table
      size="middle"
      pagination={false}
      bordered
      columns={columns}
      dataSource={dataSource}
      rowClassName={row => {
        if (!test || test.length === 0) {
          return ''
        }

        try {
          const { final, validated, state } = tree.getWordProps(test)

          if (row.key !== state) {
            return ''
          }

          if (validated) {
            if (final && isFinal) {
              return 'good-row'
            } else {
              return 'current-row'
            }
          }

          return 'bad-row'
        } catch (e) {
          return 'bad-row'
        }
      }}
    />
  )
}

export const ConnectedUML = connect(state => ({
  tree: _.get(state, 'machine.tree'),
  test: _.get(state, 'machine.test'),
  isFinal: _.get(state, 'machine.isFinal'),
}))(UML)
