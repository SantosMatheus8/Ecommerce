import { useState } from "react";
import { IconClose } from "../Icons/IconClose";
import ContactModal from "../Modal";
import { getContacts, updateContact } from "@/services/ecommerceService";


export type TableProps = {
  id:number,
  name: string;
  birthday: string;
  email: string;
  telephone: string;
  description: string;
  surname: string;
};

type Props = {
  rows: TableProps[];
  onDelete: (id: number) => void; 
  setContacts:any;
};

export const Table = ({ rows, onDelete, setContacts}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contact, setContact] = useState({} as TableProps);

  const openModal = (row: TableProps) => {
    setContact(row);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (contact: any) => {
    await updateContact(String(contact.id),{ 
      name: contact.name, 
      surname: contact.surname,
       birthday: contact.birthday, 
       email: contact.email, 
       telephone: contact.telephone, 
       description: contact.description });
    closeModal();
    const response = await getContacts()
    setContacts(response.data);
    } 
  return (
    <section className="w-full">
      <ul className="flex bg-slate-700 p-1">
        <li className="text-white w-[14.3%]">Nome</li>
        <li className="text-white w-[14.3%]">Sobrenomes</li>
        <li className="text-white w-[14.3%]">Nascimento</li>
        <li className="text-white w-[20.3%]">Email</li>
        <li className="text-white w-[14.3%]">Telefone</li>
        <li className="text-white w-[14.3%]">Descrição</li>
        <li className="text-white w-[4.3%]"></li>
      </ul>

      {rows.map((row, index) => (
        <div className="flex bg-slate-100 border-b-2 border-slate-400 p-1" key={index}>
          <span className="w-[14.3%]">{row.name}</span>
          <span className="w-[14.3%]">{row.surname}</span>
          <span className="w-[14.3%]">{row.birthday}</span>
          <span className="w-[20.3%]">{row.email}</span>
          <span className="w-[14.3%]">{row.telephone}</span>
          <span className="w-[14.3%]">{row.description}</span>
          <div className="flex w-[8.3%] items-center gap-1">
            <button onClick={() => openModal(row)}>Editar</button>
            <button onClick={() => onDelete(row.id)}> 
              <IconClose />
            </button>
          </div>
        </div>
      ))}
      <ContactModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        contact={contact}
        title="Editar Contato"
      />
    </section>
  );
};
