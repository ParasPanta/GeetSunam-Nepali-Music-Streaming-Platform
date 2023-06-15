// import { FaMusic } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "@/assets/images/landing/logo.png";
import useGSSelector from "@/redux/useGSSelector";

function Logo() {
  const loginStatus = useGSSelector((state) => state.userState.loginStatus);

  return (
    <div>
      <Link to={loginStatus ? "/home" : "/"} className="logo flex-center">
        <img src={logo} alt="logo" />
      </Link>

      {/* <Link to={"/"} id="home">
        <FaMusic className="logo__music" />
        <div className="logo__text">
          <span className="logo__primary">Geet</span>Sunam
        </div>
      </Link> */}
    </div>
  );
}

export default Logo;
