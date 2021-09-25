import React, { Component } from "react"
import { Navbar as NavbarBS, Container } from "react-bootstrap"

export default class Navbar extends Component {
  render() {
    return (
      <NavbarBS bg="light">
        <Container>
          <NavbarBS.Brand>Todo List App</NavbarBS.Brand>
        </Container>
      </NavbarBS>
    )
  }
}
