import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignInStudent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://lmsdatabase.onrender.com/student_login', {
        email,
        password,
      });

      if (response.data.success) {
        // Redirect to StudentLand component with student ID
        const studentId = response.data.student._id;
        navigate(`/student-land/${studentId}`);
      } else {
        console.log("Login failed:", response.data.error);
        // Handle unsuccessful login, show an error message or take appropriate action
      }
    } catch (error) {
      console.error("Error during sign-in", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900 p-6">
      <div className="card shadow-2xl h-1/2 md:w-1/2 xl:w-1/3 bg-zinc-800 rounded-md">
        <div className="form-container p-6">
          <h2 className="text-white text-xl mb-8">Signin As Student</h2>
          <form onSubmit={handleSignin}>
            <input
              className="w-full xl:h-10 md:h-8 rounded-md p-4 mb-5 bg-zinc-600 text-white"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full xl:h-10 md:h-8 rounded-md p-4 mb-5 bg-zinc-600 text-white"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-orange-500 text-white hover:bg-orange-700 hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full md:w-64"
              type="submit" // Use type="submit" for the form submission
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInStudent;
