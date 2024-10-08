import { Route, Routes } from "react-router-dom"
import { Login } from "../auth"
import { Calendar } from "../calendar"

export const RouterApp = () => {

  const auth = 'not-authenticated'

  return (
    <Routes>
      <Route path="/auth/*" element={<Login />} />
      <Route path="*" element={<Calendar />} />
    </Routes>
  )
}
