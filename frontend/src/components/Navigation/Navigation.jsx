import { useSelector } from "react-redux";
import './Navigation.css';
import ProfileButton from "./ProfileButton";
import { NavLink } from "react-router-dom";

const Navigation = () => {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
      sessionLinks = (
        <ProfileButton user={sessionUser} />
      );
    } else {
      sessionLinks = (
        <>
          <NavLink to="/login">Log In</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
        </>
      );
    }

    return (
        <ul id="nav-bar">
            <NavLink exact to="/">Home</NavLink>
            {sessionLinks}
        </ul>
    );
}

export default Navigation;