
const Table = ({ itemList, userId }) => {
  return (
    <div className="overflow-x-auto p-20">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 w-20 text-center text-gray-700">#</th>
            <th className="px-4 py-2 text-center text-gray-700">Restaurant Name</th>
            <th className="px-4 py-2 text-center text-gray-700">Description</th>
            <th className="px-4 py-2 text-center text-gray-700">City</th>
          </tr>
        </thead>
        <tbody>
          {itemList && itemList.map((item, index) => (
            <tr key={index} className={userId === item.userId ? 'bg-green-100' : 'bg-white'}>
              <td className="px-4 py-2 text-center text-gray-700">{index + 1}</td>
              <td className="px-4 py-2 text-center text-gray-700">{item.name}</td>
              <td className="px-4 py-3 text-center text-gray-700">{item.description}</td>
              <td className="px-4 py-2 text-center text-gray-700">{item.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
