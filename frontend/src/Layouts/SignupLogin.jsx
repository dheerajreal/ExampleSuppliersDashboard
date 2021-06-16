import LogoBox from "../Components/LogoBox";
import Footer from "../Components/Footer";

const Login = (props) => {
  return (
    <div className="container mt-5 col-10 col-xs-9 col-sm-6 col-md-5 col-lg-4">
      <LogoBox />
      {props.children}
      <Footer />
    </div>
  );
};

export default Login;
