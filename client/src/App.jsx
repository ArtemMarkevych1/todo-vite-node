import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchTodosRequest,
  addTodoRequest,
  toggleTodoRequest,
  deleteTodoRequest,
} from './store/slices/todoSlice'
import {
  Layout,
  List,
  Checkbox,
  Input,
  Button,
  Typography,
  Space,
  Alert,
  Card,
  Spin
} from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import './App.css'

const { Header, Content } = Layout
const { Title } = Typography

function App() {
  const dispatch = useDispatch()
  const { todos, loading, error } = useSelector((state) => state.todos)
  const [newTodoText, setNewTodoText] = useState('')

  useEffect(() => {
    dispatch(fetchTodosRequest())
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newTodoText.trim()) return
    dispatch(addTodoRequest(newTodoText))
    setNewTodoText('')
  }

  const handleToggle = (id, completed) => {
    dispatch(toggleTodoRequest({ id, completed: !completed }))
  }

  const handleDelete = (id) => {
    dispatch(deleteTodoRequest(id))
  }

  return (
    <Layout className="layout">
      <Header className="header">
        <Title level={2} style={{ color: 'white', margin: 0 }}>
          Todo List
        </Title>
      </Header>

      <Content className="content">
        <Card>
          {error && (
            <Alert
              message="Error"
              description={error}
              type="error"
              showIcon
              style={{ marginBottom: 16 }}
            />
          )}

          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <form onSubmit={handleSubmit} className="add-todo-form">
              <Space.Compact style={{ width: '100%' }}>
                <Input
                  value={newTodoText}
                  onChange={(e) => setNewTodoText(e.target.value)}
                  placeholder="Enter new todo"
                  size="large"
                />
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleSubmit}
                  size="large"
                >
                  Add
                </Button>
              </Space.Compact>
            </form>

            <Spin spinning={loading}>
              <List
                dataSource={todos}
                renderItem={(todo) => (
                  <List.Item
                    key={todo._id}
                    actions={[
                      <Button
                        key="delete"
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(todo._id)}
                      />
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Checkbox
                          checked={todo.completed}
                          onChange={() => handleToggle(todo._id, todo.completed)}
                        />
                      }
                      title={
                        <span style={{
                          textDecoration: todo.completed ? 'line-through' : 'none',
                          color: todo.completed ? '#888' : 'inherit'
                        }}>
                          {todo.text}
                        </span>
                      }
                    />
                  </List.Item>
                )}
              />
            </Spin>
          </Space>
        </Card>
      </Content>
    </Layout>
  )
}

export default App
