import React, { Component } from 'react'
import { Container, Card, Row, Spinner, Button } from 'react-bootstrap'
import { 
  IoIosArrowDropdown,
  IoIosArrowDropup,
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle 
} from 'react-icons/io'
import { getItem } from '../Service'

class Articles extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      visible: 10,
      items: [],
      orderItem: null,
      page: 1
    }
  }

  async componentDidMount () {
    this.handleSearch()
    this.setState({items: []})
  }

  componentDidUpdate (prevProps) {
    let prevText = prevProps.location.state ? prevProps.location.state.searchText : ''
    let newText = this.props.location.state ? this.props.location.state.searchText : ''
    if (prevText !== newText) {
      this.setState({isLoading: true})
      this.handleSearch(newText)
    }
  }

  async handleSearch (searchText) {
    const filters = searchText ? { q: searchText } : {}
    const res = await getItem(filters)
    this.setState({
      isLoading: false,
      searchText: searchText,
      items: res,
      page: 1
    })
  }

  async onLoadMore () {
    const page = this.state.page + 1
    const filters = { page }
    // check order item that oready select
    if (this.state.orderItem) {
      filters['order-by'] = this.state.orderItem
    }
    // check this load more on search text
    if (this.props.location.state && this.props.location.state.searchText) {
      filters.q = this.props.location.state.searchText
    }
    const res = await getItem(filters)
    this.setState({
      items: this.state.items.concat(res),
      page: page
    })
  }

  onDetailPage (id) {
    this.props.history.push({
      pathname: '/detail',
      state: { id }
    })
  }

  async onOrder (orderBy) {
    this.setState({ isLoading: true })
    const filters = { 'order-by': orderBy }
    if (this.props.location.state && this.props.location.state.searchText) {
      filters.q = this.props.location.state.searchText
    }
    const res = await getItem(filters)
    this.setState({
      orderItem: orderBy,
      items: res,
      isLoading: false,
      page: 1
    })
  }

  render () {
    // for render icon search
    let renderOrderIcon = this.state.orderItem ? (
      this.state.orderItem === 'oldest' ? (
        <>
          <IoIosArrowDropdownCircle size='2em' onClick={() => this.onOrder('oldest')} /> &nbsp;&nbsp;
          <IoIosArrowDropup size='2em' onClick={() => this.onOrder('newest')} />
        </>
      ) : (
        <>
          <IoIosArrowDropdown size='2em' onClick={() => this.onOrder('oldest')} /> &nbsp;&nbsp;
          <IoIosArrowDropupCircle size='2em' onClick={() => this.onOrder('newest')} />
        </>
      )
    ) : (
      <>
        <IoIosArrowDropdown size='2em' onClick={() => this.onOrder('oldest')} /> &nbsp;&nbsp;
        <IoIosArrowDropup size='2em' onClick={() => this.onOrder('newest')} />
      </>
    )

    // for render item list
    let render = this.state.isLoading ? (
      <div style={{textAlign: 'center'}}>
        <Spinner animation="border" role="status" >
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
      ) : (
        this.state.items.length === 0 ? (
          <Row className="justify-content-md-center" style={{marginBottom: 15, paddingRight: 10}}>
            <h4>No result, please try again !</h4>
          </Row>
        ) : (
          <>
            <Row className="justify-content-md-end" style={{marginBottom: 15, paddingRight: 10}}>
              <h4>Order List: </h4>&nbsp;&nbsp;
              {renderOrderIcon}
            </Row>
            {this.state.items.map((item, index) => {
              return (
                <Card style={{marginBottom: 20}} key={item.id} onClick={() => this.onDetailPage(item.id)}>
                  <Card.Header>{item.sectionName}</Card.Header>
                  <Card.Body>
                    <Card.Text>{item.webTitle}</Card.Text>
                  </Card.Body>
                </Card>
              )
            })}
            <Button onClick={() => this.onLoadMore()} variant='secondary' size='lg' block>Load more</Button>
          </>
        )
    )
    return (
      <Container style={{marginTop: 20}}>
        {render}
      </Container>
    )
  }
}

export default Articles
