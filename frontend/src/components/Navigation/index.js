import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { NavLink } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Navigation.css';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Navigation = () => {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();

    let sessionLinks;
    if (sessionUser) {
      sessionLinks = (
        <ProfileButton user={sessionUser} />
      );
    } else {
      sessionLinks = (
        <>
          <LoginFormModal />
          <SignupFormModal />
        </>
      );
    }

    let homeButton = (
      <button onClick={(e) => {history.push('/')}}>Home</button>
    )

  
    return (
      <ul>
          {homeButton}
          {sessionLinks}
      </ul>
    );
}

export default Navigation;