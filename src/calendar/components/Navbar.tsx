import { useAuthStore } from "../../hooks"

export const Navbar = () => {

    const { user, onStartLogout, onStartUpdate, color } = useAuthStore();
    const name = user ? user.name === undefined ? '' : user.name : '';
    const lastname = user ? user.lastname === undefined ? '' : user.lastname : '';
    const fullName = user ? `${name.toLowerCase()} ${lastname.toLowerCase()}` : '';

    const handleColorChange = (preferences: string) => {
        const uid = user ? user.uid : '';
        onStartUpdate({ uid, preferences });
    };

    const handleLogout = () => {
        onStartLogout();
    }

    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <span className="navbar-brand"
                    style={{ color: color }}
                ><i
                    style={{ color: color }}
                    className="fas fa-calendar-alt"></i> &nbsp; <strong>{fullName}</strong> </span>
                <div className="d-flex">
                    <div className="navbar-text d-flex rigthside">
                        <span onClick={() => handleColorChange('#3498db')} className="circle-color color-one mr-1"></span>
                        <span onClick={() => handleColorChange('#e74c3c')} className="circle-color color-two mr-1"></span>
                        <span onClick={() => handleColorChange('#f39c12')} className="circle-color color-three mr-1"></span>
                    </div>
                    <button
                        className="btn btn-outline-danger"
                        onClick={handleLogout}
                    >
                        <i className="fas fa-sign-out-alt"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}
