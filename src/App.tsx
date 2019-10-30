import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import { Layout, Icon, Tabs, Row, Col } from 'antd'
import logger from 'redux-logger'
import _ from 'lodash'
import reducers from './redux/reducers'
import { Creators } from './redux/reducers/machine'
import { Header, Graph, Gramatica } from './components'

const Automata = ({ nodes, edges, addWord }: any) => (
  <Layout>
    <Header />
    <Layout.Content>
      <Row>
        <Col>
          <Gramatica onChange={({ target }) => addWord(target.value)} />
        </Col>
        <Col>
          <Tabs defaultActiveKey="2">
            <Tabs.TabPane
              tab={
                <span>
                  {' '}
                  <Icon type="bars" /> Tabela
                </span>
              }
              key="1"
            ></Tabs.TabPane>
            <Tabs.TabPane
              tab={
                <span>
                  {' '}
                  <Icon type="share-alt" /> Grafo
                </span>
              }
              key="2"
            >
              <Graph
                graph={{
                  nodes,
                  edges,
                }}
              />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </Layout.Content>
  </Layout>
)

const InfinityAutomata = connect(
  state => ({
    nodes: _.get(state, 'machine.nodes'),
    edges: _.get(state, 'machine.edges'),
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

export default App
