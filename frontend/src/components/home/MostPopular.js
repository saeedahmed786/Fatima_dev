import { Col, Row } from 'antd'
import React from 'react'

export const MostPopular = () => {
  return (
    <div>
      <Row justify="center">
        <Col lg={{ span: 4 }} xs={{ span: 24}}></Col>
        <Col lg={{ span: 4 }} xs={{ span: 24}}></Col>
        <Col lg={{ span: 4 }} xs={{ span: 24}}></Col>
        <Col lg={{ span: 4 }} xs={{ span: 24}}></Col>
        <Col lg={{ span: 4 }} xs={{ span: 24}}></Col>
      </Row>
      <button className = 'btn show-more'>
           Show more
      </button>
    </div>
  )
}
