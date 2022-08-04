import styles from '../../styles/Todo.module.css'
import { CalendarIcon, TrashIcon } from '@heroicons/react/outline'

const TodoItem = ({ idx, content, marked, dateline, publicKey, action }) => {
    const handleMarkTodo = () => {
        // Only allow unchecked todo to be marked
        if (marked) return
       
        action(idx)
        
    }

    const handleRemoveTodo = () => {
        // Only allow checked todo to be removed
        if(!marked) return

        action(idx)

    }

    return (
        <li key={idx} className={styles.todoItem}>
            <div onClick={handleMarkTodo} className={`${styles.todoCheckbox} ${marked && styles.checked}`} />
            <div>
                <span className="todoText">{content}</span>
                {dateline && (
                    <div className={styles.todoDateline}>
                        <CalendarIcon className={styles.calendarIcon} />
                        <span>{dateline}</span>
                    </div>
                )}
            </div>
            <div className={styles.iconContainer}>
                <TrashIcon onClick={handleRemoveTodo} className={`${styles.trashIcon} ${!marked && styles.checked}`} />
            </div>
        </li>
    )
}

export default TodoItem
