import { useState } from "react";
import { addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const Form = ({ itemCollectionRef, getItemList }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");

  let auth = getAuth();

  const onSubmitItem = async (e) => {
    e.preventDefault();
    try {
      await addDoc(itemCollectionRef, {
        name,
        description,
        city,
        userId: auth?.currentUser?.uid
      });
      setName('')
      setDescription('')
      setCity('')

      getItemList();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-20">
      <h2 className="text-center font-bold text-xl mb-4">Add Restaurant</h2>
      <form onSubmit={onSubmitItem}>
        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Description</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">City</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            Add Restaurant
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;