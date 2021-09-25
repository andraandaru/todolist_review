import axios from "axios"
import React, { Component } from "react"
import { FormControl, InputGroup, Button } from "react-bootstrap"
import { FaPlus } from "react-icons/fa"

export default class TodoInput extends Component {
  onSubmit = async () => {
    const { fetchData } = this.props
    const { value } = this.refs.input
    if (value === "") {
      alert("Please input some task!")
    } else {
      const newTodo = {
        title: value,
        status: "todo",
      }
      const res = await axios.post("http://localhost:2000/todo", newTodo)
      if (res.status >= 300) {
        alert("Failed to add todo")
      } else {
        alert("Success add todo!")
        this.refs.input.value = ""
        fetchData()
      }
    }
  }

  render() {
    return (
      <div>
        <InputGroup className="mb-3">
          <FormControl placeholder="Add your new todo" ref="input" />
          <Button variant="primary" id="button-addon2" onClick={this.onSubmit}>
            <FaPlus />
          </Button>
        </InputGroup>
      </div>
    )
  }
}
