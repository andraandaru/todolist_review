import axios from "axios"
import React, { Component } from "react"
import { Button, Col, Container, Row, Tab } from "react-bootstrap"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import TodoInput from "./components/TodoInput"
import TodoItem from "./components/TodoItem"

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
    }
  }

  fetchData = async () => {
    const res = await axios.get("http://localhost:2000/todo")
    if (res.status >= 300) {
      alert("Failed to fetch data")
    } else {
      this.setState({ data: res.data })
    }
  }

  onEmpty = async () => {
    const { data } = this.state
    const emptyTrash = data.filter((item) => item.status === "trash")
    emptyTrash.forEach(async (item) => {
      await axios.delete(`http://localhost:2000/todo/${item.id}`)
      this.fetchData()
    })
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    const { data } = this.state
    return (
      <div>
        <Navbar />
        <Container>
          <Tab.Container defaultActiveKey="todo">
            <Row className="my-3">
              <Col sm={2}>
                <Sidebar />
              </Col>
              <Col sm={10}>
                <Tab.Content>
                  <Tab.Pane eventKey="todo">
                    <TodoInput fetchData={this.fetchData} />
                    {data.map((item) => {
                      if (item.status === "todo") {
                        return <TodoItem key={item.id} data={item} fetchData={this.fetchData} />
                      }
                    })}
                  </Tab.Pane>
                  <Tab.Pane eventKey="completed">
                    {data.map((item) => {
                      if (item.status === "completed") {
                        return <TodoItem key={item.id} data={item} fetchData={this.fetchData} />
                      }
                    })}
                  </Tab.Pane>
                  <Tab.Pane eventKey="trash">
                    <Button variant="outline-danger" onClick={this.onEmpty}>
                      Empty Trash
                    </Button>
                    {data.map((item) => {
                      if (item.status === "trash") {
                        return <TodoItem key={item.id} data={item} fetchData={this.fetchData} />
                      }
                    })}
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </div>
    )
  }
}
