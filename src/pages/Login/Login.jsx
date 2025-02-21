import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import GoogleLoginButton from "../../components/GoogleLoginButton";
import TaskManagerSection from "./TaskManagerSection";

const Login = () => {
  const { user, signIn, signInGoogle, ForgotPassword, redirectPath, setRedirectPath } =
    useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const emailRef = useRef();
  const [Error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    if (!email || !password) {
      setError("Email and Password are required.");
      setLoading(false);
      return;
    }

    signIn(email, password)
      .then((result) => {
        console.log("User signed in successfully:", result);
        setError("");
        setLoading(false);
      })
      .catch((error) => {
        console.log("Sign-in error:", error.message);
        if (error.message.includes("auth/user-not-found")) {
          setError("No user found with this email.");
        } else if (error.message.includes("auth/wrong-password")) {
          setError("Invalid password. Please try again.");
        } else {
          setError(error.message);
        }
        setLoading(false);
      });
  };

  const handleForgotPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      setError("Please enter your email to reset the password.");
      return;
    }

    ForgotPassword(email)
      .then(() => {
        console.log("Password reset email sent successfully.");
        navigate("/forgotpass");
      })
      .catch((error) => {
        console.log("Error resetting password:", error.message);
        setError(error.message);
      });
  };

  useEffect(() => {
    console.log(redirectPath);
    if (user) {
      const destination = "/my-profile";
      navigate(destination, { replace: true })
    }
  }, [user, redirectPath, navigate, setRedirectPath]);


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen w-full container mx-auto p-5 gap-10">
    <div className="flex items-center justify-center w-full ">
      <TaskManagerSection />
    </div>
    <div className="flex flex-col w-full justify-center items-center">
      <h1 className="text-3xl mt-7 ralewayfont font-bold text-center mb-6">
        Please <span className="text-[#309255]">Login</span>
        </h1>
      <form onSubmit={handleLogin} className="w-full mx-auto">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            required
            name="email"
            ref={emailRef}
            placeholder="Email"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            required
            name="password"
            placeholder="Password"
            className="input input-bordered"
          />
          <label className="label">
            <a
              onClick={handleForgotPassword}
              className="label-text-alt link link-hover cursor-pointer"
            >
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button
            className="btn bg-green-50 px-10 hover:bg-green-800 hover:text-white font-medium border border-green-500"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
      {Error && <p className="text-red-600 text-center text-sm my-3">{Error}</p>}
      <p className="text-center mt-4">
        Do not have an account{" "}
        <Link className="text-blue-600 font-bold" to="/register">
          Register
        </Link>
      </p>
      <GoogleLoginButton signInGoogle={signInGoogle}></GoogleLoginButton>
    </div>
</div>
  );
};

export default Login;
