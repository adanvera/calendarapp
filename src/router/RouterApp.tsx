import { Navigate, Route, Routes } from "react-router-dom"
import { Login } from "../auth"
import { useAuthStore } from "../hooks"
import { useEffect } from "react"
import { CalendarPage } from "../calendar"

export const RouterApp = () => {
  const { status, checkAuthToken } = useAuthStore();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true' ? true : false;

  useEffect(() => {
    checkAuthToken();
  }, []);

  // Loader component
  const Loader = () => (
    <div className="loader-overlay">
      <div className="loader"></div>
    </div>
  );

  return (
    <>

      {status === 'checking' && <Loader />}

      <Routes>
        {
          (status === 'not-authenticated' || status === 'checking' && isAuthenticated === false)
            ? (
              <>
                <Route path="/auth/*" element={<Login />} />
                <Route path="/*" element={<Navigate to="/auth/login" />} />
              </>
            ) : (isAuthenticated === true) ? (
              <>
                <Route path="/" element={<CalendarPage />} />
                <Route path="/*" element={<Navigate to="/" />} />
              </>
            ) : ''
        }
      </Routes>
    </>
  );
}
