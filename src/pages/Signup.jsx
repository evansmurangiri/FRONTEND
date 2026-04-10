import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import auth from "../assets/tb2.jpg";
import axiosInstance from "../axiosConfig";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/user/register", user);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="hidden md:block flex-1">
        <img src={auth} alt="Signup Hero" className="h-full w-full object-cover" />
      </div>

      <div className="flex justify-center items-center flex-1 px-4 md:px-0 bg-gray-50 dark:bg-gray-900">
        <Card className="w-full max-w-md p-6 shadow-2xl rounded-2xl dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
            <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
              Enter your details below to create your account
            </p>
          </CardHeader>

          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                    className="dark:border-gray-600 dark:bg-gray-900"
                    required
                  />
                </div>
                <div className="flex-1">
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                    className="dark:border-gray-600 dark:bg-gray-900"
                    required
                  />
                </div>
              </div>

              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="john.doe@example.com"
                  value={user.email}
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
                  placeholder="Create a Password"
                  value={user.password}
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
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded-full"
              >
                Sign Up
              </Button>

              <p className="text-center text-gray-600 dark:text-gray-300 mt-4 text-sm">
                Already have an account?{" "}
                <Link to="/login">
                  <span className="underline cursor-pointer hover:text-gray-800 dark:hover:text-gray-100">
                    Sign in
                  </span>
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
