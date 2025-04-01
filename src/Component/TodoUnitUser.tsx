// File TodoUnitUser.tsx
import { Users } from '../Context/CreateDataContext'
// type unitUser = {
//     id:number,
//     UserNames:string,
//     PhoneNumber:string
// children?: React.ReactNode
//         }
// export default function TodoUnitUser ({id,UserNames,PhoneNumber}:unitUser){
// Cách viết khác với props và kiểu dữ liệu lấy từ component bên ngoài
export default function TodoUnitUser(props: Users) {
  return (
    <li
      key={props.Id}
      className="mx-0 my-2 p-1 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-full mb-22"
    >
      <div className="mx-0 flex justify-between items-center">
        <div className="flex justify-items-start items-center">
          <span className="mx-2">Tên:{props.UserNames}</span>
          <span>Điện Thoai:{props.PhoneNumber}</span>
        </div>
        {props.children}
      </div>
    </li>
  )
}
