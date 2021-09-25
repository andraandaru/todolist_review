import React, { Component } from "react"
import { Nav } from "react-bootstrap"
import { FaCheck, FaTasks, FaTrash, FaClipboard } from "react-icons/fa"

export default class Sidebar extends Component {
  render() {
    return (
      <div>
        <Nav className="flex-column align-items-end">
          <Nav.Link eventKey="todo" className="text-secondary" style={{ cursor: "pointer" }}>
            Todo <FaClipboard />
          </Nav.Link>
          <Nav.Link eventKey="completed" className="text-success" style={{ cursor: "pointer" }}>
            Completed <FaCheck />
          </Nav.Link>
          <Nav.Link eventKey="trash" className="text-danger" style={{ cursor: "pointer" }}>
            Trash <FaTrash />
          </Nav.Link>
        </Nav>
      </div>
    )
  }
}
