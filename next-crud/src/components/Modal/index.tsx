import React, { useEffect, useState } from 'react';
import { TableProps } from '../Table';
import Modal from 'react-modal';
import { Button } from '../Button';


type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: Partial<TableProps>) => void;
  title: string;
  contact?:TableProps;
};

export default function ContactModal({ isOpen, onClose, onSubmit,title,contact }:ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    birthday: '',
    email: '',
    telephone: '',
    description: '',
    surname: '',
  });

  useEffect(() => {
    if (contact){
    setFormData(contact);} 
  }, [isOpen]);
  

  const handleChange = (e:any) => { 
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleResetForm = () => {
    setFormData({  
    name: '',
    birthday: '',
    email: '',
    telephone: '',
    description: '',
    surname: '',});
  };

  const handleClose = () => {
    onClose();
    handleResetForm();
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    onSubmit(formData);
    handleResetForm();
  };

  return (

    <Modal isOpen={isOpen} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60"  >
      <div className="modal-content bg-[rgb(252,252,252)] p-4 rounded-md w-[400px]">
        <h2 className='text-lg mb-8 font-bold'>{title}</h2>
        <form onSubmit={handleSubmit}>
          <div className='flex gap-4 flex-col mb-8'>
            <input className='bg-white rounded-lg	border-2 border-shades-04-40% font-normal	text-[0.875rem] px-2 py-3' type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Nome' />
            <input className='bg-white rounded-lg	border-2 border-shades-04-40% font-normal	text-[0.875rem] px-2 py-3' type="text" name="surname" value={formData.surname} onChange={handleChange} placeholder='Sobrenome' />
            <input className='bg-white rounded-lg	border-2 border-shades-04-40% font-normal	text-[0.875rem] px-2 py-3' type="text" name="birthday" value={formData.birthday} onChange={handleChange} placeholder='Data de nascimento' />
            <input className='bg-white rounded-lg	border-2 border-shades-04-40% font-normal	text-[0.875rem] px-2 py-3' type="text" name="email" value={formData.email} onChange={handleChange} placeholder='Email' />
            <input className='bg-white rounded-lg	border-2 border-shades-04-40% font-normal	text-[0.875rem] px-2 py-3' type="text" name="telephone" value={formData.telephone} onChange={handleChange} placeholder='Telefone' />
            <input className='bg-white rounded-lg	border-2 border-shades-04-40% font-normal	text-[0.875rem] px-2 py-3' type="text" name="description" value={formData.description} onChange={handleChange} placeholder='Descrição' />
          </div>
          <div className='flex gap-4 justify-center'>
            <Button fullWidth  type="submit">Enviar</Button>
            <Button fullWidth onClick={handleClose} variant='outlined'>Fechar</Button>
          </div>
        </form>
      </div>
    </Modal>   
  );
}
