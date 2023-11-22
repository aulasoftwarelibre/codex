import Book from '../../domain/model/book.entity'
import BookId from '../../domain/model/id.value-object'
import Books from '../../domain/services/books.repository'

export default class BooksInMemory implements Books {
  private books: Map<string, Book> = new Map();

  constructor(){
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

    booksRaw.map((book) =>
    this.books.set(book.id, Book.create(book.id, book.authors, book.title, book.image))
    )}

  async findById(id: BookId): Promise<Book | null> {
    const book = this.books.get(id.value);
    return (book ) ? book : null; 
  }

  async findAll(): Promise<Book[]> {
    return Array.from(this.books.values())
  }

  async save(book: Book): Promise<void> {
    this.books.set(book.id, book)
  }

  purge(): void {
    this.books = new Map()
  }
}
