import Book from '../Book/Book'

const books = [
  {
    authors: ['Donald Knuth'],
    id: '1',
    image: 'https://m.media-amazon.com/images/I/91YfNb49PLL._SL1500_.jpg',
    title: 'The Art of Computer Programming',
  },
  {
    authors: ['Erich Gamma', 'Richard Helm', 'Ralph Johnson', 'John Vlissides'],
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

export default function BookGrid() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 place-items-center">
        {books.map((book) => (
          <Book
            key={book.id}
            authors={book.authors}
            title={book.title}
            image={book.image}
          />
        ))}
      </div>
    </>
  )
}
