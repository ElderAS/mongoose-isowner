const mongoose = require('mongoose')
const Plugin = require('../src')
let Book

beforeAll(() => {
  let schema = new mongoose.Schema({
    name: String,
    owner: mongoose.Schema.Types.ObjectId,
    category: [String],
  })

  schema.plugin(Plugin, {
    resolver(doc, user) {
      return doc.owner.equals(user.id)
    },
  })

  Book = mongoose.model('Book', schema)
})

describe('Plugin', () => {
  test('isOwner resolves to true', async () => {
    let owner = { id: mongoose.Types.ObjectId() }
    let book = new Book({
      name: 'Harry Potter 1',
      owner: owner.id,
      category: ['Fantasy'],
    })
    expect(await Book.isOwner(book, owner)).toBe(true)
  })

  test('isOwner resolves to false', async () => {
    let owner = { id: mongoose.Types.ObjectId() }
    let book = new Book({
      name: 'Harry Potter 1',
      owner: mongoose.Types.ObjectId(),
      category: ['Fantasy'],
    })
    expect(await Book.isOwner(book, owner)).toBe(false)
  })
})
