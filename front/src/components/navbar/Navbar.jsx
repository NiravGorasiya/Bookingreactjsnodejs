import "./navbar.css"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { NavLink } from "react-router-dom"
const Navbar = () => {
  const { user } = useContext(AuthContext)

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">lamabooking</span>
        </Link>
        {user ? user?.user?.name : (
          <div className="navItems">
            <button className="navButton">
              Register
            </button>
            <button className="navButton">
              <NavLink to="/login">
                Login
              </NavLink>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar