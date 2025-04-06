import React from "react";
import AccountCard from "../components/AccountCard";
import Navbar from "../components/Navbar";

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



export default function Dashboard() {
  const [isEmpty, setIsEmpty] = React.useState(false);

  const customer: CustomerDetails = JSON.parse(
    sessionStorage.getItem("user") || "{}"
  );

  // console.log("Customer Details:", customer);
  if (customer?.customerAccounts?.length < 1) {
    setIsEmpty(true);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Navbar />
      <h1 className="mt-10 text-2xl font-bold mb-6">My Accounts</h1>

      {isEmpty ? (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
          No accounts available.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {customer.customerAccounts.map((acc, i) => (
            <AccountCard key={i} {...acc} balance={parseFloat(acc.balance.replace(/[^\d.-]/g, ""))} />
          ))}
        </div>
      )}
    </div>
  );
}
