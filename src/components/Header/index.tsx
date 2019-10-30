import React from 'react'
import { PageHeader, Icon } from 'antd'

export const Header = () => (
  <PageHeader
    title="Analisador Léxico"
    subTitle="v2.0.0"
    backIcon={<Icon type="github" />}
    onBack={() => (window.location.href = 'https://github.com/leonardofalk/finite-automata-react-lab')}
  />
)
