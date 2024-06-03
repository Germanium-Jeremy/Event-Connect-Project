import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineGoogle } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null); // Added state for profile picture
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields and email/password format
    if (!fullName || !email || !password || !username || !phoneNumber) {
      toast.error("Please enter all required fields.");
      return;
    }

    if (!email.match(/^\S+@\S+\.\S+$/)) {
      toast.error("Invalid email format");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      // Prepare form data object
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("username", username);
      formData.append("phoneNumber", phoneNumber);
      if (profilePicture) {
        formData.append("profilePicture", profilePicture); // Append profile picture to form data
      }

      // Make API request
      const response = await fetch(`${process.env.REACT_APP_API_URL}/v1/api/signup`, {
        method: "POST",
        body: formData,
      });

      // Parse JSON response
      const dataRes = await response.json();

      // Check response status
      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Failed to create account");
        } else if (response.status === 500) {
          toast.error("Server error");
        } else {
          toast.error("Something went wrong");
        }
        return;
      }

      // Display success or error message
      if (dataRes) {
        toast.success(dataRes.message);
        navigate("/authentication");
      } else {
        toast.error(dataRes.message);
      }
    } catch (error) {
      // Handle error cases
      console.error("Error during form submission:", error);
      if (error.message === "Network Error") {
        toast.error("Network error, please check your internet connection");
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const googleSignup = () => {
    setLoading(true);
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file); // Update profile picture state
  };

  return (
    <div className="w-full flex flex-col shadow-xl justify-center items-center mt-20">
      {loading && (
        <div className="fixed inset-0 bg-[#20B486] bg-opacity-40 flex justify-center items-center z-10">
          <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-[#20B486]"></div>
        </div>
      )}
      <div className="w-1/2 flex text-xl text-black justify-between self-center font-semibold relative pt-4" id="choose">
        Sign up
        <div className="text-sm align-bottom inline">
          or{" "}
          <Link to="../" className="text-[#20B486] inline">Have Acount&#63;</Link>
        </div>
      </div>
      <div className="flex flex-col w-1/2 pt-3 self-center relative" id="offPro">
        <Link to="./" className="p-1 bg-[#20B486] hover:bg-[#43edb7] hover:shadow-slate-950/30 shadow-lg text-white text-center relative w-full max-h-10 flex justify-center rounded-lg gap-2 mb-4 cursor-pointer" onClick={googleSignup}>
          <AiOutlineGoogle className="text-2xl absolute left-2 p-1" />
          <div>Sign up with Google</div>
        </Link>
      </div>
      <div className="flex text-black text-xl text-center self-center justify-center items-center w-2/12 relative" id="or">
        <span className="border border-black w-full min-w-full"></span>
        <span className="px-4">OR</span>
        <span className="border border-black w-full min-w-full"></span>
      </div>
      <form className="grid grid-flow-row gap-3 md:w-3/5 w-1/2 self-center mx-auto pt-3 rounded-lg px-8 py-5 relative" onSubmit={handleSubmit} id="loginForm">
        <div className="flex flex-col text-gray-800 py-1">
          <input className="p-1 rounded-sm focus:border-blue-500 border border-[#20B486] bg-white indent-3 text-gray-700"
            type="text" placeholder="Your Full Names" value={fullName} onChange={(e) => setFullName(e.target.value)} autoComplete=""/>
        </div>
        <div className="flex flex-col text-gray-800 py-1">
          <input className="p-1 rounded-sm focus:border-blue-500 border border-[#20B486] bg-white indent-3 text-gray-700"
            type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete=""/>
        </div>
        <div className="flex flex-col text-gray-800 py-1">
          <input
            className="p-1 rounded-sm focus:border-blue-500 border border-[#20B486] bg-white indent-3 text-gray-700"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete=""
          />
        </div>
<<<<<<< HEAD
        <div className="flex flex-col text-gray-400 py-1 mt-1">
=======
         <div className="flex flex-col text-gray-700 py-1 mt-1">
>>>>>>> 320fb9c612942b508566440728788d4a2f0c2f34
          <input
            className="p-1 rounded-sm focus:border-blue-500 border border-[#20B486] bg-white indent-3 text-gray-700"
            type="tel"
            placeholder="Tel: +250 7899030993"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            autoComplete=""
          />
        </div>
        <div className="flex flex-col relative text-gray-400 py-1">
          <input
            className="p-1 rounded-sm focus:border-blue-500 border border-[#20B486] bg-white indent-3 text-gray-700"
            type={visible ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete=""
          />
          {visible ? (
            <AiOutlineEye
              className="absolute top-3 right-1 cursor-pointer"
              onClick={() => setVisible(false)}
            />
          ) : (
            <AiOutlineEyeInvisible
              className="absolute top-3 right-1 cursor-pointer"
              onClick={() => setVisible(true)}
            />
          )}
        </div>
        <div className="flex flex-col text-gray-400 py-1">
          <label htmlFor="profilePicture" className="text-sm">Profile Picture</label>
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="p-1 rounded-sm focus:border-blue-500 border border-violet-900 bg-white indent-3"
          />
        </div>
        <div className="text-sm text-center">
          <input
            type="checkbox"
            id="terms"
            className="w-5"
            onClick={() => setTerms(!terms)}
          />
          <label>
            Agree To Our{" "}
            <Link
              className="text-[#20B486] hover:text-[#43edb7] font-semibold"
              to="./"
            >
              Terms of Services
            </Link>{" "}
            and{" "}
            <Link
              className="text-[#20B486] hover:text-[#43edb7] font-semibold"
              to="./"
            >
              Privacy Policy
            </Link>
          </label>
        </div>
        <button
          className={`w-full my-1 py-1 shadow-lg text-white shadow-slate-500/50 font-semibold rounded-lg mt-1 ${
            terms
              ? "bg-[#20B486] hover:shadow-teal-500/40"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={handleSubmit}
          disabled={!terms}
        >
          Create account
        </button>
      </form>
    </div>
  );
}
