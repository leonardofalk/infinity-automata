import React from 'react'
import BaseGraph from 'react-graph-vis'

export const Graph = (props: any) => (
  <BaseGraph
    options={{
      locale: 'pt-br',
      layout: {
        hierarchical: false,
      },
    }}
    style={{ height: '75vh', width: '100%' }}
    {...props}
  />
)
