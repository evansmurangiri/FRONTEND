import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import auth from "../assets/tb2.jpg";
import axiosInstance from "../axiosConfig";
import googleIcon from "../assets/google.png";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/user/login", input);
      if (response.data.success) {
        dispatch(setUser(response.data.user));
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/user/google-login`;
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="hidden md:block flex-1">
        <img src={auth} alt="Login Hero" className="h-full w-full object-cover" />
      </div>

      <div className="flex justify-center items-center flex-1 px-4 md:px-0 bg-gray-50 dark:bg-gray-900">
        <Card className="w-full max-w-md p-6 shadow-2xl rounded-2xl dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
              Login to your account to continue
            </p>
          </CardHeader>

          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={input.email}
                  onChange={handleChange}
                  className="dark:border-gray-600 dark:bg-gray-900"
                  required
                />
              </div>

              <div className="relative">
                <Label>Password</Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={input.password}
                  onChange={handleChange}
                  className="dark:border-gray-600 dark:bg-gray-900"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <Button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded-full flex items-center justify-center gap-2"
              >
                <LogIn size={18} /> Login
              </Button>
            </form>

            <div className="flex items-center my-4">
              <hr className="flex-1 border-gray-300 dark:border-gray-600" />
              <span className="mx-2 text-gray-500 dark:text-gray-400 text-sm">OR</span>
              <hr className="flex-1 border-gray-300 dark:border-gray-600" />
            </div>

            <Button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-full flex items-center justify-center gap-2"
            >
              <img src={googleIcon} alt="Google" className="w-5 h-5" /> Login with Google
            </Button>

            <p className="text-center text-gray-600 dark:text-gray-300 mt-4 text-sm">
              Don't have an account?{" "}
              <Link to="/signup">
                <span className="underline cursor-pointer hover:text-gray-800 dark:hover:text-gray-100">
                  Sign up
                </span>
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
