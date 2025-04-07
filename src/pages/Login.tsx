import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useLoginMutation } from '../api/authSlice'
import { toast } from 'sonner'

const Login = () => {
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')


  const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault()

      if (!email || !password) {
        toast.error('Please fill in all fields');
        return;
      }

      const body = {
        email,
        password,
      }

      // console.log(body)

  

      const {data, error}= await login(body)

      if(error){
        console.log(error)

       return toast.error(error?.data?.statusMessage)
      }

      toast.success('Login successful')

      sessionStorage.setItem('user_token', data.data.access_token)
      sessionStorage.setItem('user', JSON.stringify(data.data.user))
      localStorage.setItem('refresh_token', data.data.refresh_token)

    setTimeout(() => {
      navigate('/dashboard')
      
    }, 1000);

      
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-100">
          <div className="text-center">
            <h2 className="text-3xl font-bold" style={{ color: '#041c64' }}>
              Login to your account
            </h2>
           
          </div>

          <form className="mt-8 space-y-6"  onSubmit={(e) => handleLogin(e)}>
            <div className="space-y-4">
            

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#d4242b] focus:border-[#d4242b]"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#d4242b] focus:border-[#d4242b]"
                />
              </div>
            </div>

            <div>
                <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 rounded-lg shadow-sm text-white font-semibold transition"
                style={{
                  backgroundColor: '#041c64',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#d4242b')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#041c64')}
                disabled={isLoading}
                >
                {isLoading ? (
                  <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                  </svg>
                ) : (
                  'Login'
                )}
                </button>
              <p className="mt-2 text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium" style={{ color: '#d4242b' }}>
                Register
              </Link>
            </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login