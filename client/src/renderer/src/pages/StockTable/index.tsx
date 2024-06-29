import toast from 'react-hot-toast'
import { AppTable } from '@renderer/components/AppTable'
import { AddItemModal } from '@renderer/components/AppTable/Modals/AddItem'
import { EditItemModal } from '@renderer/components/AppTable/Modals/EditItem'
import { useDispatch, useSelector } from 'react-redux'
import { columnsData, modalInputs } from './data'
import { addItem, editItem, deleteItem } from '@renderer/features/tableSlice'

export const StockTable = () => {
  const dispatch = useDispatch()
  const table = useSelector((state: any) => state.table)

  const tableActions = {
    delete: async (id: any) => {
      try {
        dispatch(deleteItem(id))
        toast.success('Producto eliminado correctamente')
      } catch (error: any) {
        toast.error(error.response.data.message)
      }
    },
    create: async (data: any) => {
      try {
        dispatch(addItem({ ...data, id: table.data.length }))
        toast.success('Producto guardado correctamente')
      } catch (error: any) {
        toast.error(error.response.data.message)
      }
    },
    edit: async (data: any, currentUserEdit: any) => {
      try {
        dispatch(editItem({ data, id: currentUserEdit?.id }))
        toast.success('Producto editado correctamente')
      } catch (error) {
        console.log(error)
      }
    },
  }

  const newUserModal = {
    title: 'Agrega un nuevo producto',
    buttonTitle: 'Agregar producto',
    ...modalInputs,
    action: tableActions.create,
  }

  const editUserModal = {
    title: 'Editar producto',
    ...modalInputs,
    action: tableActions.edit,
  }

  return (
    <AppTable
      columnsData={columnsData}
      tableActions={tableActions}
      addItemModal={<AddItemModal modal={newUserModal} />}
      editItemModal={<EditItemModal modal={editUserModal} />}
    />
  )
}