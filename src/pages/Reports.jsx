const Reports = () => (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Reports Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold mb-2">Sales Report</h3>
          <p className="text-gray-600">Monthly sales performance</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold mb-2">Inventory Report</h3>
          <p className="text-gray-600">Current stock levels</p>
        </div>
      </div>
    </div>
  );
  
  export default Reports;