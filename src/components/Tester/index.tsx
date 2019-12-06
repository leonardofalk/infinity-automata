import React from 'react'
import { connect } from 'react-redux'
import { Creators } from '../../redux/reducers/machine'
import Input, { InputProps } from 'antd/lib/input'

export const Tester = (props: InputProps) => <Input placeholder="Teste palavras da gramática" {...props} />

export const ConnectedTester = connect(
  null,
  dispatch => ({
    onChange: ({ target }: any) => dispatch(Creators.addTest(target.value)),
  })
)(Tester)
