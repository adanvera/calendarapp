import 'react-big-calendar/lib/css/react-big-calendar.css'
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { es } from 'date-fns/locale'; // Importa la localización en español
import { dateFnsLocalizer } from 'react-big-calendar';

const locales = {
  'es-ES': es, // Cambia 'en-US' a 'es-ES'
};

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
