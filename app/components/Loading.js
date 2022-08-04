const Loading = ({ loading, children }) => {
    if (loading) return <p>Loading...</p>

    return <>{children}</>
}

export default Loading
