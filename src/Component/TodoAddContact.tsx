// File TodoAddContact.tsx
import { useContext, useEffect, useState } from 'react'
import { ContactContext, Users } from '../Context/CreateDataContext'

// export default function AddContact({ user }: { user?: Users }) {
export default function AddContact({
  user,
  onClose,
}: {
  user?: Users // user là một prop tùy chọn
  onClose: () => void // onClose là một hàm không nhận tham số và không trả về giá trị
}) {
  const { addUser, updateUser } = useContext(ContactContext)
  const [names, setName] = useState('')
  const [phone, setPhone] = useState('')
  // const [id, setId] = useState('')
  useEffect(() => {
    if (user) {
      setName(user.UserNames) // Theo dõi trạng thái cập nhật người dùng
      setPhone(user.PhoneNumber)
    }
  }, [user])

  // const CheckName = () => {
  //   const phoneRegex = /^[0-9]+$/ // Kiểm tra định dạng số điện thoại là kiểu số từ 0-9
  //   return names.trim() !== '' && phoneRegex.test(phone) // Tên không được trống ít nhất 1 ký tự
  // }

  const CheckName = () => {
    return names.trim() !== '' // Tên không được trống ít nhất 1 ký tự
  }
  const CheckPhone = () => {
    const phoneRegex = /^[0-9]+$/ // Kiểm tra định dạng số điện thoại là kiểu số từ 0-9
    return phoneRegex.test(phone) // Tên không được trống ít nhất 1 ký tự
  }
  // Hàm theo dõi trạng thái của ô input
  // const handleInputNameChange = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   setName(event.target.value)
  // }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!CheckName()) {
      alert('Vui Lòng Nhập Tên') // Kiểm tra tính hợp lệ của dữ liệu nhập vào
      return
    }
    if (!CheckPhone()) {
      alert('Số Điện Thoại là chữ số từ 0-9') // Kiểm tra tính hợp lệ của dữ liệu nhập vào
      return
    }
    const newUser: Users = {
      Id: user ? user.Id : Date.now(), // Nếu user có, sử dụng ID của họ; nếu không, tạo ID mới
      UserNames: names,
      PhoneNumber: phone,
    }

    if (user) {
      {
        updateUser(newUser.Id, newUser) //Cập nhật thông tin người dùng
      }
    } else {
      addUser(newUser) // Thêm người dùng mới
      setName('')
      setPhone('')
    }
    {
      onClose() //Đóng form lại
    }
  }
  return (
    <div className="my-1">
      <input
        type="text"
        className="my-1 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        value={names}
        // onChange={handleInputNameChange} // có thể viết lại bằng cách tạo hàm bên trên và gắng vào onChange
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Name"
        required
      />
      <input
        type="text"
        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Enter Phone number"
        required
      />
      <div className="my-1 flex justify-center">
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 min-w-fit me-2 my-1"
          // className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xs px-5 py-2.5 text-center me-2 mb-2"
          type="button"
          onClick={handleSubmit}
        >
          {user ? 'Cập Nhật' : 'Thêm Mới'}
        </button>
        <button
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-xs px-5 py-2.5 text-center my-1"
          type="button"
          onClick={onClose}
        >
          Hủy
        </button>
      </div>
    </div>
  )
}
