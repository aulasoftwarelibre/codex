import { DeepReadonly } from 'ts-essentials'

type SearchBookPayload = {
  terms: string[]
}

type SearchBookRequest = DeepReadonly<SearchBookPayload>

const SearchBookRequest = {
  with: (properties: SearchBookPayload): SearchBookRequest => properties,
}

export default SearchBookRequest
