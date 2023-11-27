describe('Loan book', () => {
  it.skip('should loan a available book to a user', async () => {
    // Arrange
    // Requires:
    //    book repository with a book
    //    current session service with a logged user
    //    loan book service
    // Act
    // Run the command: load book x to user y
    //    Logic:
    //      1. check book is still available
    //      2. call to book.loanTo(user, loanService)
    //      3. mark the book as no available
    //    Internal logic to avoid race condition. Inside a transaction:
    //      1. create the loan tuple
    //      1. update the book to assign the loan only if book is still available (where clause)
    // Assert
    // Book is not available and loan exists in loan table
  })
})
