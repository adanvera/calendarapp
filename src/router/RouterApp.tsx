import { Route, Routes } from "react-router-dom"
import { Calendar } from "../calendar"
import { Login } from "../auth/pages"

export const RouterApp = () => {

  const auth = 'not-authenticated'

  return (
    <Routes>
      <Route path="/auth/*" element={<Login />} />
      <Route path="*" element={<Calendar />} />
    </Routes>
  )
}
