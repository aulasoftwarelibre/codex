import Book from '../../domain/model/book.entity'
import Books from '../../domain/services/book.repository'

export default class BooksInMemory implements Books {
  async findAll(): Promise<Book[]> {
    const booksRaw = [
      {
        authors: ['Donald Knuth'],
        id: '1',
        image: 'https://m.media-amazon.com/images/I/91YfNb49PLL._SL1500_.jpg',
        title: 'The Art of Computer Programming',
      },
      {
        authors: [
          'Erich Gamma',
          'Richard Helm',
          'Ralph Johnson',
          'John Vlissides',
        ],
        id: '2',
        image: 'https://m.media-amazon.com/images/I/91YfNb49PLL._SL1500_.jpg',
        title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
      },
      {
        authors: ['Martin Fowler'],
        id: '3',
        image: 'https://m.media-amazon.com/images/I/91YfNb49PLL._SL1500_.jpg',
        title: 'Refactoring: Improving the Design of Existing Code',
      },
      {
        authors: ['Andrew S. Tanenbaum'],
        id: '4',
        image: 'https://m.media-amazon.com/images/I/91YfNb49PLL._SL1500_.jpg',
        title: 'Computer Networks',
      },
      {
        authors: ['Robert C. Martin'],
        id: '5',
        image: 'https://m.media-amazon.com/images/I/91YfNb49PLL._SL1500_.jpg',
        title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      },
      {
        authors: ['Bjarne Stroustrup'],
        id: '6',
        image: 'https://m.media-amazon.com/images/I/91YfNb49PLL._SL1500_.jpg',
        title: 'The C++ Programming Language',
      },
      {
        authors: ['Brian W. Kernighan', 'Dennis M. Ritchie'],
        id: '7',
        image: 'https://m.media-amazon.com/images/I/91YfNb49PLL._SL1500_.jpg',
        title: 'The C Programming Language',
      },
      {
        authors: ['Eric S. Raymond'],
        id: '8',
        image: 'https://m.media-amazon.com/images/I/91YfNb49PLL._SL1500_.jpg',
        title: 'The Cathedral and the Bazaar',
      },
      {
        authors: [
          'Alfred V. Aho',
          'Monica S. Lam',
          'Ravi Sethi',
          'Jeffrey D. Ullman',
        ],
        id: '9',
        image: 'https://m.media-amazon.com/images/I/91YfNb49PLL._SL1500_.jpg',
        title: 'Compilers: Principles, Techniques, and Tools',
      },
      {
        authors: ['Douglas C. Schmidt'],
        id: '10',
        image: 'https://m.media-amazon.com/images/I/91YfNb49PLL._SL1500_.jpg',
        title: 'Pattern-Oriented Software Architecture',
      },
    ]

    return await booksRaw.map((book) =>
      Book.create(book.id, book.authors, book.title, book.image),
    )
  }
  save(book: Book): Promise<void> {
    throw new Error('Method not implemented.' + book.tittle)
  }
}
