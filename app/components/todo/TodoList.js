import styles from '../../styles/Todo.module.css'
import TodoItem from './TodoItem'

const TodoList = ({ todos, action }) => {
    return (
        <ul className={styles.todoList}>
            {todos.map((todo) => (
                <TodoItem key={todo.account.idx} {...todo.account} publicKey={todo.publicKey} action={action} />
            ))}
        </ul>
    )
}

export default TodoList
