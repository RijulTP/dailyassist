import React from 'react';

const UserList = ({ users }) => {
  return (
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden shadow rounded-lg">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-5 py-3 bg-gray-50 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 bg-gray-50 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                >
                  Account Type
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="odd:bg-gray-100 even:bg-white">
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    {user.username}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    {user.user_type}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
