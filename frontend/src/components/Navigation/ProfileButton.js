import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from '../../store/session';
import './Navigation.css'

const ProfileButton = ({user}) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
        // showMenu ? null : setShowMenu(true);
    }

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        }

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout())
    }

    return (
        <div id="dropdown-wrap">
          <button onClick={openMenu}>
            <i className="fa-solid fa-user-secret" />
          </button>
          {showMenu && (
            <ul className="profile-dropdown">
              <div>{user.username}</div>
              <div>{user.email}</div>
              <div>
                <button onClick={logout}><i className="fa-solid fa-dungeon" /> Log Out</button>
              </div>
            </ul>
          )}
        </div>
      );

}
export default ProfileButton;