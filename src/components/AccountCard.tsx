

interface AccountCardProps {
  accountNumber: string;
  customerName: string;
  officerName: string;
  balance: number;
}

export default function AccountCard({ accountNumber, customerName, officerName, balance }: AccountCardProps) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold">Account Number: {accountNumber}</h2>
      <p className="text-sm text-gray-600">Customer: {customerName}</p>
      <p className="text-sm text-gray-600">Account Officer: {officerName}</p>
      <p className="text-sm font-medium mt-2">Balance: {balance}</p>
    </div>
  )
}
