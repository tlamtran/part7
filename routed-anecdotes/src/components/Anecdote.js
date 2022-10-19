import { useParams } from 'react-router-dom'

const Anecdote = ({ anecdotes }) => {
    const id = useParams().id
    const anecdote = anecdotes.find(a => a.id === Number(id))
  
    return (
      <div>
        <h1>{anecdote.content} by {anecdote.author}</h1>
        <p>has {anecdote.votes} votes</p>
        <p>for more information <a href={anecdote.info}>{anecdote.info}</a></p>
      </div>
    )
}
  
export default Anecdote