import { BookViewTabLoans } from '@/app/books/[id]/(view)/loans/components/book-view-tab-loans'
import { getHistoricalLoans } from '@/core/loan/infrastructure/actions/get-historical-loans'

interface PageParameters {
  id: string
}

export default async function Page({ params }: { params: PageParameters }) {
  const historicalLoans = await getHistoricalLoans(params.id)

  return <BookViewTabLoans historicalLoans={historicalLoans} />
}
