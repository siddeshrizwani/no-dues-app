import React from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card'; // <-- Added missing import for Card

const DuesTable = ({ title = "Dues", dues }) => {
  if (!dues || dues.length === 0) {
    return (
      <Card title={title}> {/* Ensure Card is usable even when no dues */}
        <p className="text-gray-500">No dues to display.</p>
      </Card>
    );
  }

  const getStatusClasses = (status) => {
    // Ensure status is a string before calling toLowerCase
    const statusString = String(status || '').toLowerCase();
    switch (statusString) {
      case 'overdue':
        return 'bg-status-overdue text-text-overdue';
      case 'pending':
        return 'bg-status-pending text-text-pending';
      case 'paid':
        return 'bg-status-paid text-text-paid';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card title={title}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dues.map((due) => (
              <tr key={due.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{due.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{due.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${/* Ensure amount is a number before calling toFixed */}
                  {typeof due.amount === 'number' ? due.amount.toFixed(2) : parseFloat(String(due.amount).replace(/[^0-9.-]+/g,"") || "0").toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{due.dueDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(due.status)}`}>
                    {due.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {String(due.status || '').toLowerCase() !== 'paid' && (
                     <Button variant="link" onClick={() => alert(`Pay Now for ${due.description}`)}>
                        Pay Now
                     </Button> 
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default DuesTable;