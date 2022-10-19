import { useState, } from 'react'
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom'

import CreateNew from './components/CreateNew'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import About from './components/About'
import Footer from './components/Footer'
import Menu from './components/Menu'



const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    console.log(anecdote)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <p>{notification}</p>
      <Routes>
        <Route path='/anecdotes/:id' element={<Anecdote anecdotes={anecdotes} />} />
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path='/create' element={<CreateNew addNew={addNew} setNotification={setNotification} />} />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
