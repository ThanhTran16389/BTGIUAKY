// File TodoApp.tsx
import { useEffect, useState } from 'react'
import { ContactContext, Users } from '../Context/CreateDataContext'
import AddContact from './TodoAddContact'
import TodoRemoveContact from './TodoRemoveContact'

function TodoApp() {
  const [userList, setUserList] = useState<Users[]>([])
  const [updateContact, setUpdateContact] = useState<Users | null>(null)

  useEffect(() => {
    // Tải danh sách người dùng từ localStorage khi ứng dụng khởi động
    const storedUsers = localStorage.getItem('userList')
    if (storedUsers) {
      setUserList(JSON.parse(storedUsers))
    }
  }, [])

  useEffect(() => {
    // Lưu danh sách người dùng vào localStorage mỗi khi danh sách thay đổi
    localStorage.setItem('userList', JSON.stringify(userList))
  }, [userList])

  // Thêm danh người dùng vào danh sách
  const addUser = (newUsers: Users) => {
    setUserList([...userList, newUsers])
  }
  // Cập nhật Danh Bạ
  const updateUser = (Id: number, UpdateNewUser: Users) => {
    setUserList((preUserList) =>
      preUserList.map((users) => (users.Id === Id ? UpdateNewUser : users)),
    )
  }
  // Xóa danh bạ người dùng từ danh sách
  const removeUser = (index: number) => {
    setUserList((prevContact) =>
      prevContact.slice(0, index).concat(prevContact.slice(index + 1)),
    )
  }
  // Cách viết khác cho việc xóa:
  // const removeUser = (index: number) => {
  //   setUserList((prevUserList) =>
  //     prevUserList.filter((_, i) => i !== index)
  //   );
  // };

  return (
    <>
      <ContactContext.Provider
        value={{ userList, addUser, removeUser, updateUser }}
      >
        <AddContact
          user={updateContact || undefined} // Chuyển đổi updateContact thành undefined nếu là null
          onClose={() => setUpdateContact(null)}
        />
        <TodoRemoveContact />
      </ContactContext.Provider>
    </>
  )
}
export default TodoApp
