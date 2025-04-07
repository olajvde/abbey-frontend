import React, { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useFetchOfficersQuery,useCreateAccountMutation } from "../api/accountsSlice";
import { toast } from "sonner";
import { useLogoutMutation } from "../api/authSlice";

interface CustomerAccount {
  id: string;
  accountNumber: string;
  customerId: string;
  officerId: string;
  accountType: string;
  customerName: string;
  officerName: string;
  balance: string;
  createdAt: string;
}

interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userType: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  customerAccounts: CustomerAccount[];
}
const Navbar = () => {
  const navigate  = useNavigate()
  const [createAccount] = useCreateAccountMutation()
  const [logout] = useLogoutMutation()
  const [isEmpty, setIsEmpty] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [officerId, setOfficerId] = React.useState("");
  const [accountType, setAccountType] = React.useState("");
  const { data: officers, isLoading } = useFetchOfficersQuery(0);
  const customer: CustomerDetails = JSON.parse(
    sessionStorage.getItem("user") || "{}"
  );

  React.useEffect(() => {
    const isCustomerEmpty = Object.keys(customer).length === 0;
    setIsEmpty(isCustomerEmpty);
  }, [customer]);



  const handleCreateAccount = async(e: React.FormEvent) =>{
    e.preventDefault()

    const body = {
      officerId,
      accountType: accountType.toLowerCase(),
    }

    // console.log(body)

    const {data, error} = await createAccount(body)
    if(error){
      console.log(error)
      toast.error('Something Went Wrong')
      return
    }
    
    if(data.statusCode === 200){
      setShowModal(false)
       toast.success('Account Created Successfully')
      window.location.reload()
    }
  }

  const handleLogout = async(e: React.FormEvent) => {

    e.preventDefault()
    sessionStorage.clear()
    localStorage.removeItem('refresh_token')
    navigate('/login')

    const {data, error} = logout(0)
    console.log(data, error)
  }

  return (
    <header className="py-4 md:py-6">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link
              to="/"
              title=""
              className="flex rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2 text-lg font-bold text-gray-900 hover:text-opacity-70"
            >
              AbbeyVault
            </Link>
          </div>

          <div className="flex lg:hidden">
            <button type="button" className="text-gray-900">
              <svg
                className="w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>

          <div className="hidden lg:flex lg:ml-10 xl:ml-16 lg:items-center lg:justify-center lg:space-x-8 xl:space-x-16">
            <Link
              to="#"
              title=""
              className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
            >
              {" "}
              Solutions{" "}
            </Link>

            <Link
              to="#"
              title=""
              className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
            >
              {" "}
              Industries{" "}
            </Link>

            <Link
              to="#"
              title=""
              className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
            >
              {" "}
              Fees{" "}
            </Link>

            <Link
              to="#"
              title=""
              className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
            >
              {" "}
              About AbbeyVault{" "}
            </Link>
          </div>

          {isEmpty ? (
            <div className="hidden lg:ml-auto lg:flex lg:items-center lg:space-x-8 xl:space-x-10">
              <Link
                to="/login"
                title=""
                className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
              >
                {" "}
                Sign in{" "}
              </Link>

              <Link
                to="/register"
                title=""
                className="px-5 py-2 text-base font-bold leading-7 text-white transition-all duration-200 bg-[#d4242b] border border-transparent rounded-xl hover:bg-gray-600 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                role="button"
              >
                Create free account
              </Link>
            </div>
          ) : (
            <div className="hidden lg:ml-auto lg:flex lg:items-center lg:space-x-8 xl:space-x-10">
              <>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-5 py-2 text-base font-bold leading-7 text-white transition-all duration-200 bg-[#041c64] border border-transparent rounded-xl hover:bg-gray-600 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  Add Bank Account +
                </button>
                {showModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6 z-60">
                      <h2 className="text-lg font-bold mb-4">
                        Create New Account
                      </h2>
                      <form onSubmit={(e)=> handleCreateAccount(e)}>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Account Name
                          </label>
                          <input
                            type="text"
                            value={customer.firstName + " " + customer.lastName}
                            disabled
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#041c64] focus:border-[#041c64] sm:text-sm"
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Account Type
                          </label>
                          <select
                            onChange={(e) => setAccountType(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#041c64] focus:border-[#041c64] sm:text-sm"
                          >
                            <option selected>Select Account Type</option>
                            <option>Savings</option>
                            <option>Current</option>
                            <option>Corporate</option>
                          </select>
                        </div>

                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Account Officer
                          </label>
                          <select
                            onChange={(e) => setOfficerId(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#041c64] focus:border-[#041c64] sm:text-sm"
                          >
                            <option selected>Select Account Officer</option>
                            {officers?.data?.map((officer) => {
                              return (
                                <option key={officer.id} value={officer.id}>
                                  {officer.firstName + " " + officer.lastName}
                                </option>
                              );
                            })}
                          </select>
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="ml-2 px-4 py-2 text-sm font-medium text-white bg-[#041c64] rounded-md hover:bg-[#d4242b]"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </>
              <Link
                to=""
                title=""
                onClick={(e) => handleLogout(e)}
                className="px-5 py-2 text-base font-bold leading-7 text-white transition-all duration-200 bg-[#d4242b] border border-transparent rounded-xl hover:bg-gray-600 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                role="button"
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
