const unexpected = {
  error: (cause: unknown) => {
    throw new Error(`Unexpected error, but got ${JSON.stringify(cause)}`)
  },
  success: (cause: unknown) => {
    throw new Error(`Expected an error, but got ${JSON.stringify(cause)}`)
  },
}

export default unexpected
