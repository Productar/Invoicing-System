import React from 'react'
import { PlusIcon } from '@renderer/components/Icons/PlusIcon'
import {
  Modal,
  Input,
  Button,
  Select,
  ModalBody,
  SelectItem,
  ModalFooter,
  ModalHeader,
  ModalContent,
  useDisclosure,
  Textarea,
} from '@nextui-org/react'
import { BiDollar } from 'react-icons/bi'
import { Checkbox } from '@nextui-org/react'
import './ProductAdd.scss'

export const AddProductModal = ({ modal }) => {
  const [data, setData] = React.useState<any>({
    name: '',
    category: null,
    quantity: null,
    codigo1: null,
    codigo2: null,
    barcode: null,
    suppliers: null,
    status: true, // default value
    purchasePrice: null,
    costPrice: null,
    priceCalculation: 'cero', // default value
    pricePolicy: 'cero', // default value
    net1: null,
    net2: null,
    net3: null,
    net4: null,
    taxType: 'IVA 21%', // default value
    financedPrice: null,
    friendPrice: null,
    cardPrice: null,
    businessUnit: {
      id: 6,
      name: 'Main Unit',
    },
  })

  const [errors, setErrors] = React.useState({
    name: '',
  })
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const handleChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
    console.log(data)
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

  const handleSubmit = () => {
    let valid = true
    const newErrors = {
      name: '',
    }

    if (!validateName(data.name)) {
      newErrors.name = 'Por favor, ingresa un nombre válido.'
      valid = false
    }

    setErrors(newErrors)
    if (!valid) {
      return
    }
    modal.action(data)
    setData({
      name: '',
      category: null,
      quantity: null,
      codigo1: null,
      codigo2: null,
      barcode: null,
      suppliers: null,
      status: true, // default value
      purchasePrice: null,
      costPrice: null,
      priceCalculation: 'cero', // default value
      pricePolicy: 'cero', // default value
      net1: null,
      net2: null,
      net3: null,
      net4: null,
      taxType: 'IVA 21%', // default value
      financedPrice: null,
      friendPrice: null,
      cardPrice: null,
      businessUnit: {
        id: 6,
        name: 'Main Unit',
      },
    })
    onClose()
  }
  const validateName = (name) => {
    if (!name.trim()) {
      return false // Nombre está vacío
    }
    return true // Nombre no está vacío
  }
  return (
    <div className='flex flex-col gap-2'>
      <Button onPress={onOpen} className='bg-c-primary' color='secondary' endContent={<PlusIcon />}>
        {modal?.buttonTitle}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size='5xl'
        scrollBehavior={'inside'}
        backdrop='blur'
        className='bg-c-card'
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            <h3 className='text-c-title'>{modal?.title}</h3>
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
            <Button color='danger' variant='light' onPress={onClose}>
              Cerrar
            </Button>
            <Button color='primary' onPress={handleSubmit}>
              Agregar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
