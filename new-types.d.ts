declare module 'amazon-buddy' {
  declare interface Author {
    author: string
    role: string
  }
  declare interface Product {
    authors: Author[]
    main_image: string
    title: string
  }
  declare function asin({ asin: string }): Promise<{ result: Product[] }>
}
