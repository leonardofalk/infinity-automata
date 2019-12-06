import React from 'react'
import { connect } from 'react-redux'
import { Creators } from '../../redux/reducers/machine'
import Input, { InputProps } from 'antd/lib/input'

export const Gramatica = (props: InputProps) => <Input placeholder="Insira palavras da gramática" {...props} />

export const ConnectedGramatica = connect(
  null,
  dispatch => ({
    onChange: ({ target }: any) => dispatch(Creators.addWord(target.value)),
  })
)(Gramatica)
