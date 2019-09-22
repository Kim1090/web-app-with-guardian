import React, { Component } from 'react'
import { Navbar, Form, FormControl } from 'react-bootstrap'

class Header extends Component {
  constructor (props) {
    super(props)

    this.state = {
      searchText: ''
    }
  }

  handleSearchSubmit = () => {
    if (this.state.searchText) {
      const text = this.state.searchText;
      this.setState({ searchText: '' })
      this.props.history.push({
        pathname: '/',
        state: { searchText: text }
      })
    } else {
      alert('Please enter some search text!')
    }
  }

  handleSearchInput = event => {
    this.setState({
        searchText: event.target.value
    })
  }

  handleSearchKeyUp = event => {
      event.preventDefault()
      if (event.key === 'Enter' && event.keyCode === 13) {
        this.handleSearchSubmit()
      }
  }

  handleFormSubmit = e => e.preventDefault()

  render () {
    return (
      <Navbar bg='dark' variant='dark'>
        <Navbar.Brand className='mr-auto' href='/'>Home</Navbar.Brand>
        <Form inline onSubmit={this.handleFormSubmit}>
          <FormControl
            onChange={this.handleSearchInput}
            value={this.state.searchText}
            onKeyUp={this.handleSearchKeyUp}
            type="text"
            placeholder="Search"
            className="mr-sm-2"
          />
        </Form>
      </Navbar>
    )
  }
}

export default Header
