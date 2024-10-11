import { useAuthStore } from "../../hooks"

export const Navbar = () => {

    const { user, onStartLogout } = useAuthStore();
    const fullName = user ? `${user.name} ${user.lastname}` : '';

    const handleLogout = () => {
        onStartLogout();
    }

    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <span className="navbar-brand">
                    <i className="fas fa-calendar-alt"></i>
                    &nbsp; {fullName}
                </span>
                <button
                    className="btn btn-outline-danger"
                    onClick={handleLogout}
                >
                    <i className="fas fa-sign-out-alt"></i>
                </button>
            </div>
        </div>
    )
}
