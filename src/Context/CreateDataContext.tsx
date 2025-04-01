// file: CreateDataContext.tsx
import { createContext } from 'react'
export type Users = {
  Id: number
  UserNames: string
  PhoneNumber: string
  children?: React.ReactNode
}
export type ContactContextType = {
  userList: Users[]
  addUser: (useradd: Users) => void
  removeUser: (index: number) => void
  updateUser: (Id: number, updateContact: Users) => void
}

const ContactContext = createContext<ContactContextType>({
  userList: [],
  addUser: () => {},
  removeUser: () => {},
  updateUser: () => {},
})
export { ContactContext }

// Khai báo kiểu interface:
// interface Contact {
//   id: number
//   name: string
//   phone: string
// }

// interface ContactContextType {
//   contacts: Contact[]
//   addContact: (contact: Contact) => void
//   updateContact: (id: number, updatedContact: Contact) => void
//   deleteContact: (id: number) => void
// }
