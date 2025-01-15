const Users = () => (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Users Management</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">1</td>
              <td className="p-2">John Doe</td>
              <td className="p-2">john@example.com</td>
              <td className="p-2">Admin</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
  
  export default Users;