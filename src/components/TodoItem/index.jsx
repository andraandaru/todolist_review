import axios from "axios"
import React, { Component } from "react"
import { FormControl, InputGroup, Button } from "react-bootstrap"
import { FaCheck, FaTrash } from "react-icons/fa"
import cx from "classnames"

export default class TodoItem extends Component {
  onCheck = async (id) => {
    const { fetchData } = this.props
    const res = await axios.patch(`http://localhost:2000/todo/${id}`, { status: "completed" })
    if (res.status >= 300) {
      alert("Failed to mark data as completed")
    } else {
      alert(`Data with id ${id} mark as completed`)
      fetchData()
    }
  }

  onTrash = async (id) => {
    const { fetchData } = this.props
    const res = await axios.patch(`http://localhost:2000/todo/${id}`, { status: "trash" })
    if (res.status >= 300) {
      alert("Failed to mark data as trash")
    } else {
      alert(`Data with id ${id} mark as trash`)
      fetchData()
    }
  }

  render() {
    const { id, title, status } = this.props.data
    const itemStatus = cx({
      "bg-success text-white": status === "completed",
      "bg-danger text-white": status === "trash",
    })
    return (
      <InputGroup className="my-3">
        <FormControl value={title} disabled className={itemStatus} />
        {status !== "trash" && (
          <>
            <Button variant="outline-danger" onClick={() => this.onTrash(id)}>
              <FaTrash />
            </Button>
            {status !== "completed" && (
              <Button variant="success" onClick={() => this.onCheck(id)}>
                <FaCheck />
              </Button>
            )}
          </>
        )}
      </InputGroup>
    )
  }
}
