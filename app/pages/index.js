import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useTodo } from '../hooks/todo'
import Loading from '../components/Loading'
import TodoSection from '../components/todo/TodoSection'
import styles from '../styles/Home.module.css'


const Home = () => {
    const { initialized, initializeStaticUser, loading, transactionPending, completedTodos, incompleteTodos, addTodo, markTodo, removeTodo, markStaticTodo,removeStaticTodo, addStaticTodo, input,  handleChange } = useTodo()


    return (
        <div className={styles.container}>
            <div className={styles.actionsContainer}>
                {initialized ? (
                    <div className={styles.todoInput}>
                        <div className={`${styles.todoCheckbox} ${styles.checked}`} />
                        <div className={styles.inputContainer}>
                            <form onSubmit={addStaticTodo}>
                                <input value = {input} onChange={handleChange} id={styles.inputField} type="text" placeholder='Create a new todo...' />
                            </form>
                        </div>
                        <div className={styles.iconContainer}>
       
                        </div>
                    </div>
                ) : (
                    <button type="button" className={styles.button} onClick={() => initializeStaticUser()} disabled={transactionPending}>
                        Initialize
                    </button>
                )}
                {/* <WalletMultiButton /> */}
            </div>

            <div className={styles.mainContainer}>
                <Loading loading={loading}>
                    <TodoSection title="Tasks" todos={incompleteTodos} action={markStaticTodo} />

                    <TodoSection title="Completed" todos={completedTodos} action={removeStaticTodo} />
                </Loading>
            </div>
        </div>
    )
}

export default Home
