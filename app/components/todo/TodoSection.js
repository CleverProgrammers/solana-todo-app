import styles from '../../styles/Todo.module.css'
import TodoList from './TodoList'

const TodoSection = ({ title, todos, action }) => {
    return (
        <div className={styles.todoSection}>
            <h1 className="title">
                {title} - {todos.length}
            </h1>

            <TodoList todos={todos} action={action} />
        </div>
    )
}

export default TodoSection
