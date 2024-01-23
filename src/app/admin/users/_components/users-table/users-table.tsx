'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'
import { SortDescriptor } from '@react-types/shared/src/collections'
import { useCallback, useState } from 'react'

import UsersTableCell from '@/app/admin/users/_components/users-table/users-table-cell'
import UserResponse from '@/core/user/dto/responses/user.response'

const COLUMNS = [
  { name: 'Email', uid: 'email' },
  { name: 'Roles', uid: 'roles' },
  { name: 'Acciones', uid: 'actions' },
]

interface UsersTableProperties {
  users: UserResponse[]
}

export default function UsersTable(properties: UsersTableProperties) {
  const { sortDescriptor, sortHandle, users } = useController(properties)

  return (
    <>
      <Table
        aria-label="Lista de usuarios"
        sortDescriptor={sortDescriptor}
        onSortChange={sortHandle}
      >
        <TableHeader columns={COLUMNS}>
          {(column) => (
            <TableColumn allowsSorting key={column.uid}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  <UsersTableCell columnKey={columnKey} user={item} />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}

function useController(properties: UsersTableProperties) {
  const { users } = properties

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'email',
    direction: 'ascending',
  })

  const sortHandle = useCallback(
    (nextSortDescriptor: SortDescriptor) => {
      setSortDescriptor(nextSortDescriptor)

      return {
        items: sortUsers(users, nextSortDescriptor),
      }
    },
    [users],
  )

  return { sortDescriptor, sortHandle, users: sortUsers(users, sortDescriptor) }
}

function sortUsers(users: UserResponse[], sortDescriptor: SortDescriptor) {
  const { column, direction } = sortDescriptor

  return users.sort((a, b) => {
    const first = a[column as keyof UserResponse]
    const second = b[column as keyof UserResponse]
    let cmp = first < second ? -1 : 1

    if (direction === 'descending') {
      cmp *= -1
    }

    return cmp
  })
}
