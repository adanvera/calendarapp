import { useState } from 'react';
import ReactModal, { Styles } from 'react-modal';
import './modal.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { addHours, differenceInSeconds } from 'date-fns';
import { es } from 'date-fns/locale';

registerLocale('es', es);
  

const customStyles: Styles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  content: {
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '10px',
    padding: '20px',
    width: '500px',
    height: 'fit-content',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'absolute',
    zIndex: 999,
  }
}

export const CalendarModal = () => {

  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false)
  }

  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2)
  });

  const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    });
  }

  const onDateChange = (date: Date | null, changing: string) => {
    if (!date) return;
    setFormValues({
      ...formValues,
      [changing]: date
    });
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const diferencia = differenceInSeconds(formValues.end, formValues.start);
    if(isNaN(diferencia) || diferencia < 0){
      console.log('error en la fecha');
      return;
    }

    if(formValues.title.trim().length <= 0){
      console.log('error en el titulo');
      return;
    }

    console.log(formValues);

    
    
    //closeModal();
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => closeModal()}
      style={customStyles}
      overlayClassName={'modal-fondo'}
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>

        <div className="form-group mb-2">
          <div className='row d-flex date-class'>
            <label>Fecha y hora inicio</label>
            <DatePicker
              className="form-control"
              placeholderText="Fecha inicio"
              selected={formValues.start}
              name='start'
              onChange={(date: Date | null) => onDateChange(date, 'start')}
              dateFormat={'dd/MM/yyyy HH:mm:ss'}
              showTimeSelect
              locale={'es'}
              timeCaption='Hora'
            />
          </div>
        </div>
        <div className="form-group mb-2">
          <div className='row d-flex  date-class'>
            <label>Fecha y hora fin</label>
            <DatePicker
              className="form-control"
              placeholderText="Fecha fin"
              selected={formValues.end}
              minDate={formValues.start}
              name='end'
              onChange={(date: Date | null) => onDateChange(date, 'end')}
              dateFormat={'dd/MM/yyyy HH:mm:ss'}
              showTimeSelect
              locale={'es'}
              timeCaption='Hora'
            />
          </div>
        </div>
        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className="form-control"
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group mb-2">
          <textarea
            className="form-control"
            placeholder="Notas"
            rows={5}
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>

      </form>
    </ReactModal>
  )
}
