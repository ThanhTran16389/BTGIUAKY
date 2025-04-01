// File TodoRemoveContact.tsx
import { useContext, useState } from 'react'
import { ContactContext, Users } from '../Context/CreateDataContext'
import AddContact from './TodoAddContact'
import TodoUnitUser from './TodoUnitUser'

export default function TodoRemoveContact() {
  const { userList, removeUser } = useContext(ContactContext)
  const [updateUser, setUpdateUser] = useState<Users | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortData, setSortData] = useState<'name' | 'phone'>('name')

  const filteredUsers = userList.filter((user) =>
    user.UserNames.toLowerCase().includes(searchQuery.toLowerCase()),
  )
  const sortUsers = filteredUsers.sort((a, b) => {
    if (sortData === 'name') {
      return a.UserNames.localeCompare(b.UserNames)
    } else {
      return a.PhoneNumber.localeCompare(b.PhoneNumber)
    }
  })

  return (
    <div className="container mx-auto mt-8 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Danh Sách Người Dùng</h2>
      <div className="my-1 flex justify-between gap-8 items-center">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mx-1 p-2 border border-gray-300 rounded"
        />
        <select
          value={sortData}
          onChange={(e) => setSortData(e.target.value as 'name' | 'phone')}
          className="mx-1 p-2 border border-gray-300 rounded"
          name=""
          id=""
        >
          <option value="name">Sắp xếp theo tên</option>
          <option value="phone">Sắp xếp theo số điện thoại</option>
        </select>
      </div>

      <ul className="mx-0 text-left">
        {sortUsers.map((user, index) => (
          <TodoUnitUser
            key={index}
            Id={user.Id}
            UserNames={user.UserNames}
            PhoneNumber={user.PhoneNumber}
          >
            <div className="my-0.5 flex justify-items-end items-center">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-xs px-5 py-2.5 text-center me-2 mx-1"
                //   className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-xs"

                onClick={() => removeUser(index)}
              >
                Xóa
              </button>
              <button
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xs px-5 py-2.5 text-center me-2 mx-1"
                onClick={() => setUpdateUser(user)}
              >
                Sửa
              </button>
            </div>
          </TodoUnitUser>
        ))}
      </ul>
      {updateUser && (
        <AddContact user={updateUser} onClose={() => setUpdateUser(null)} />
      )}
    </div>
  )
}
