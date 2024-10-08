import { Route, Routes } from "react-router-dom"
import { CalendarPage } from "../calendar"
import { Login } from "../auth"

export const RouterApp = () => {

  //const auth = 'not-authenticated'

  return (
    <Routes>
      <Route path="/auth/*" element={<Login />} />
      <Route path="*" element={<CalendarPage />} />
    </Routes>
  )
}
