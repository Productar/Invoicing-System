import { useSelector } from 'react-redux'
import { Avatar, Dropdown, DropdownMenu, DropdownItem, DropdownTrigger } from '@nextui-org/react'

export const NavbarUserOptions = () => {
  const user = useSelector((state: any) => state.user)
  const token = localStorage.getItem('token')

  const logOut = () => {
    if (token) {
      localStorage.removeItem('token')
      window.location.reload()
    }
  }

  if (user) {
    return (
      <Dropdown>
        <DropdownTrigger>
          <Avatar isBordered as='button' color='secondary' size='sm' />
        </DropdownTrigger>
        <DropdownMenu aria-label='Profile Actions' variant='flat'>
          <DropdownItem key='profile' className='h-14 gap-2 default-text-color'>
            <p className='font-semibold'>Registrado como</p>
            <p className='font-semibold'>{user?.username}</p>
          </DropdownItem>
          <DropdownItem
            key='logout'
            className='text-danger'
            color='danger'
            onClick={() => logOut()}
          >
            Cerrar sesión
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
  } else {
    return (
      <Dropdown>
        <DropdownTrigger>
          <Avatar isBordered as='button' color='secondary' size='sm' />
        </DropdownTrigger>
        <DropdownMenu aria-label='Profile Actions' variant='flat'>
          <DropdownItem
            key='logout'
            // className='text-'
            color='secondary'
          // onClick={() => logOut()}
          >
            Log in
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
  }
}
