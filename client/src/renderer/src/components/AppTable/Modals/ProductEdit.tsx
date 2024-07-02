import {
  Input,
  Modal,
  Button,
  Select,
  ModalBody,
  SelectItem,
  ModalFooter,
  ModalHeader,
  ModalContent,
  useDisclosure,
  Checkbox,
  Textarea,
} from '@nextui-org/react'
import React from 'react'
import { setCurrentItemId } from '@renderer/features/tableSlice'
import { useDispatch, useSelector } from 'react-redux'

export const EditProductModal = ({ modal }) => {
  const dispatch = useDispatch()
  const [data, setData] = React.useState({})
  const [errors, setErrors] = React.useState({
    name: '',
  })
  const users = useSelector((state: any) => state.table.data)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const currentItemIdEdit = useSelector((state: any) => state.table.currentItemIdEdit)
  const currentUserEdit = users.find((item: { id: any }) => item.id == currentItemIdEdit)

  React.useEffect(() => {
    if (currentItemIdEdit !== -1) onOpen()
  }, [currentItemIdEdit])

  const handleChange = (e: any) => {
    let name = e.target.name
    let value = e.target.value
    let intValues = ['age']

    setData({
      ...data,
      [name]: intValues.includes(name) ? parseInt(value) : value,
    })
    handleValidation(e.target.name, e.target.value)
  }

  const handleValidation = (name, value) => {
    let newErrors = { ...errors }

    switch (name) {
      case 'name':
        if (!validateName(value)) {
          newErrors.name = 'Por favor, ingresa un nombre válido.'
        } else {
          newErrors.name = ''
        }
        break
      default:
        break
    }

    setErrors(newErrors)
  }

  const validateName = (name) => {
    if (!name.trim()) {
      return false // Nombre está vacío
    }
    return true // Nombre no está vacío
  }

  const handleResetCurrentIdEdit = () => dispatch(setCurrentItemId(-1))

  const handleAddNewUser = async () => {
    modal.action(data, currentUserEdit)
    handleResetCurrentIdEdit()
    onClose()
  }

  return (
    <div className='flex flex-col gap-2'>
      <Modal
        isOpen={isOpen}
        onClose={handleResetCurrentIdEdit}
        backdrop='blur'
        onOpenChange={onOpenChange}
        scrollBehavior={'inside'}
        size='5xl'
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            <h3 className='default-text-color'>{modal?.title}</h3>
          </ModalHeader>
          <ModalBody>
            <div className='productsmodaladd w-full flex flex-col gap-3  '>
              <div className='rowmodaladdproduct justify-start items-start flex gap-3'>
                <Input
                  name='name'
                  label='Nombre'
                  isRequired
                  size='sm'
                  labelPlacement='outside'
                  placeholder='Nombre del producto'
                  variant='bordered'
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                ></Input>
                <Select
                  label='Categoria'
                  labelPlacement='outside'
                  placeholder='Selecciona una categoria'
                  variant='bordered'
                  name='category'
                  onChange={handleChange}
                  size='sm'
                  className='text-c-title'
                >
                  <SelectItem key={2}>Proveedor</SelectItem>
                </Select>
                <Input
                  name='quantity'
                  type='cantidad'
                  label='cantidad'
                  size='sm'
                  labelPlacement='outside'
                  placeholder='Cantidad de productos'
                  variant='bordered'
                  onChange={handleChange}
                ></Input>
              </div>
              <div className='rowmodaladdproduct flex gap-3'>
                <Input
                  label='Codigo'
                  size='sm'
                  name='codigo1'
                  labelPlacement='outside'
                  placeholder='Codigo #1'
                  variant='bordered'
                  onChange={handleChange}
                ></Input>
                <Input
                  label='Codigo'
                  size='sm'
                  name='codigo2'
                  labelPlacement='outside'
                  placeholder='Codigo #2'
                  variant='bordered'
                  onChange={handleChange}
                ></Input>
                <Input
                  label='Codigo de barras'
                  size='sm'
                  name='barcode'
                  labelPlacement='outside'
                  placeholder='Codigo de barras'
                  variant='bordered'
                  onChange={handleChange}
                ></Input>
              </div>
              <div className='rowmodaladdproduct select flex items-start justify-start gap-3'>
                <Select
                  label='Proveedores'
                  labelPlacement='outside'
                  placeholder='Selecciona un proveedor'
                  variant='bordered'
                  name='suppliers'
                  onChange={handleChange}
                  size='sm'
                  className='text-c-title'
                >
                  <SelectItem key={2}>Proveedor</SelectItem>
                </Select>
                <Select
                  label='Estado'
                  labelPlacement='outside'
                  placeholder='Disponibilidad'
                  variant='bordered'
                  defaultSelectedKeys={['true']}
                  name='status'
                  onChange={handleChange}
                  size='sm'
                  className='text-c-title'
                >
                  <SelectItem value={'true'} key={'true'}>
                    Disponible
                  </SelectItem>
                  <SelectItem value={'false'} key={'false'}>
                    No disponible
                  </SelectItem>
                </Select>
              </div>

              <div className='rowmodaladdproduct  flex items-start justify-start gap-3'>
                <Input
                  type='number'
                  label='Precio de compra'
                  labelPlacement='outside'
                  placeholder='0.00'
                  variant='bordered'
                  size='sm'
                  name='purchasePrice'
                  onChange={handleChange}
                  endContent={
                    <div className='pointer-events-none flex items-center'>
                      <span className='text-default-400 text-small'>$</span>
                    </div>
                  }
                />
                <Input
                  type='number'
                  label='Precio de costo'
                  labelPlacement='outside'
                  placeholder='0.00'
                  variant='bordered'
                  size='sm'
                  name='costPrice'
                  onChange={handleChange}
                  endContent={
                    <div className='pointer-events-none flex items-center'>
                      <span className='text-default-400 text-small'>$</span>
                    </div>
                  }
                />

                <Select
                  label='Calculo de precio'
                  placeholder='Select an animal'
                  labelPlacement='outside'
                  variant='bordered'
                  name='priceCalculation'
                  onChange={handleChange}
                  defaultSelectedKeys={['cero']}
                  size='sm'
                  className='text-c-title'
                >
                  <SelectItem value={'cero'} key={'cero'}>
                    cero
                  </SelectItem>
                  <SelectItem key={2}>cero</SelectItem>
                </Select>
              </div>
              <div className='rowmodaladdproduct flex items-start justify-start gap-3'>
                <Select
                  label='Politica de precio'
                  labelPlacement='outside'
                  placeholder='Select an animal'
                  variant='bordered'
                  name='pricePolicy'
                  onChange={handleChange}
                  defaultSelectedKeys={['cero']}
                  size='sm'
                  className='text-c-title  '
                >
                  <SelectItem value={'cero'} key={'cero'}>
                    cero
                  </SelectItem>
                </Select>
              </div>

              <div className='rowmodaladdproduct  flex items-start justify-start gap-3'>
                <Input
                  type='number'
                  label='Neto 1'
                  isDisabled
                  labelPlacement='outside'
                  placeholder='0.00'
                  variant='bordered'
                  name='net1'
                  onChange={handleChange}
                  size='sm'
                  endContent={
                    <div className='pointer-events-none flex items-center'>
                      <span className='text-default-400 text-small'>$</span>
                    </div>
                  }
                />
                <Input
                  type='number'
                  label='Neto 2'
                  labelPlacement='outside'
                  isDisabled
                  placeholder='0.00'
                  variant='bordered'
                  name='net2'
                  onChange={handleChange}
                  size='sm'
                  endContent={
                    <div className='pointer-events-none flex items-center'>
                      <span className='text-default-400 text-small'>$</span>
                    </div>
                  }
                />
                <Input
                  type='number'
                  label='Neto 3'
                  labelPlacement='outside'
                  placeholder='0.00'
                  isDisabled
                  variant='bordered'
                  name='net3'
                  onChange={handleChange}
                  size='sm'
                  endContent={
                    <div className='pointer-events-none flex items-center'>
                      <span className='text-default-400 text-small'>$</span>
                    </div>
                  }
                />
                <Input
                  type='number'
                  labelPlacement='outside'
                  label='Neto 4'
                  placeholder='0.00'
                  isDisabled
                  variant='bordered'
                  name='net4'
                  onChange={handleChange}
                  size='sm'
                  endContent={
                    <div className='pointer-events-none flex items-center'>
                      <span className='text-default-400 text-small'>$</span>
                    </div>
                  }
                />
              </div>
              <div className='rowmodalpricesproduct  flex items-start justify-start gap-3'>
                <Select
                  label='Tipo IVA'
                  labelPlacement='outside'
                  placeholder='Selecciona un tipo'
                  variant='bordered'
                  name='taxType'
                  defaultSelectedKeys={['IVA21%']}
                  onChange={handleChange}
                  size='sm'
                  className='text-c-title'
                >
                  <SelectItem key={'IVA21%'}>IVA 21%</SelectItem>
                </Select>
                <Input
                  type='number'
                  label='Precio Financiado'
                  labelPlacement='outside'
                  placeholder='0.00'
                  variant='bordered'
                  name='financedPrice'
                  onChange={handleChange}
                  size='sm'
                  endContent={
                    <div className='pointer-events-none flex items-center'>
                      <span className='text-default-400 text-small'>$</span>
                    </div>
                  }
                />
                <Input
                  type='number'
                  label='Precio Amigo'
                  labelPlacement='outside'
                  placeholder='0.00'
                  variant='bordered'
                  name='friendPrice'
                  onChange={handleChange}
                  size='sm'
                  endContent={
                    <div className='pointer-events-none flex items-center'>
                      <span className='text-default-400 text-small'>$</span>
                    </div>
                  }
                />
                <Input
                  type='number'
                  label='Precio tarjeta'
                  labelPlacement='outside'
                  placeholder='0.00'
                  name='cardPrice'
                  onChange={handleChange}
                  variant='bordered'
                  size='sm'
                  endContent={
                    <div className='pointer-events-none flex items-center'>
                      <span className='text-default-400 text-small'>$</span>
                    </div>
                  }
                />
              </div>

              <Checkbox defaultSelected name='envasedproduct' onChange={handleChange}>
                Producto envasado
              </Checkbox>
              <Input
                type='number'
                label='Cantidad x paquete'
                labelPlacement='outside'
                placeholder='0.00'
                name='quantityPerPackage'
                onChange={handleChange}
                variant='bordered'
                isDisabled
                size='sm'
                endContent={
                  <div className='pointer-events-none flex items-center'>
                    <span className='text-default-400 text-small'>$</span>
                  </div>
                }
              />
              <Textarea
                label='Description'
                variant='bordered'
                name='description'
                onChange={handleChange}
                labelPlacement='outside'
                placeholder='Enter your description'
              ></Textarea>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color='danger'
              variant='light'
              onPress={() => {
                handleResetCurrentIdEdit()
                onClose()
              }}
            >
              Cerrar
            </Button>
            <Button color='primary' onPress={() => handleAddNewUser()}>
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}