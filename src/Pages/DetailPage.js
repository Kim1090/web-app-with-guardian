import React, { Component } from 'react'
import { Container, Card, Spinner } from 'react-bootstrap'
import { getItemById } from '../Service'

class Articles extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      item: {}
    }
  }

  async componentDidMount () {
    const res = await getItemById(this.props.location.state.id)
    this.setState({item: res, isLoading: false})
  }

  render () {
    let render = this.state.isLoading ? (
      <div style={{textAlign: 'center'}}>
        <Spinner animation='border' role='status' >
          <span className='sr-only'>Loading...</span>
        </Spinner>
      </div>
    ) : (
      <Card>
        <Card.Body>
          <Card.Title>{this.state.item.sectionName}</Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>{this.state.item.type}</Card.Subtitle>
          <Card.Text>{this.state.item.webTitle}</Card.Text>
          <Card.Link href={this.state.item.webUrl} target='_blank'>click here for open website</Card.Link>
        </Card.Body>
      </Card>
    )
    return (
      <Container style={{marginTop: 20}}>{render}</Container>
    )
  }
}

export default Articles
