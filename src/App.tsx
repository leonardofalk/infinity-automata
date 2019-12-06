import React from 'react'
import { hot } from 'react-hot-loader/root'
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import { Layout, Row, Col, Divider, ConfigProvider } from 'antd'
import ptBR from 'antd/lib/locale/pt_BR'
import logger from 'redux-logger'
import _ from 'lodash'
import reducers from './redux/reducers'
import { Creators } from './redux/reducers/machine'
import { Header, ConnectedUML, ConnectedGramatica, ConnectedTester } from './components'

const Automata = () => {
  return (
    <ConfigProvider locale={ptBR}>
      <Layout>
        <Header />
        <Layout.Content>
          <Row type="flex" align="middle" justify="center">
            <Col span={20}>
              <ConnectedGramatica />
            </Col>
            <Divider />
            <Col span={20}>
              <ConnectedTester />
            </Col>
            <Divider />
            <Col span={20}>
              <ConnectedUML />
            </Col>
          </Row>
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  )
}

const InfinityAutomata = connect(
  state => ({
    tree: _.get(state, 'machine.tree'),
  }),
  Creators
)(Automata)

const App = () => {
  return (
    <Provider store={createStore(reducers, applyMiddleware(logger))}>
      <InfinityAutomata />
    </Provider>
  )
}

export default hot(App)
