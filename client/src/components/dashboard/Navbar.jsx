// import React from "react";
// import { useAuth } from "../../context/AuthContext";
// const Navbar = () => {
//   const { user, logout } = useAuth();
//   return (
//     <div className="flex items-center text-white justify-between h-12 bg-teal-600 px-5">
//       <p>Welcome {/*{user.name}*/}</p>
//       <button
//         className="px-4 py-1 bg-teal-700 hover:bg-teal-800"
//         onClick={logout}
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Navbar;

import React from "react";
import { useAuth } from "../../context/authContext.jsx";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // ⬅️ Add this

  return (
    <div className="flex items-center text-white justify-between h-12 bg-teal-600 px-5">
      <p>Welcome</p>
      <button
        className="px-4 py-1 bg-teal-700 hover:bg-teal-800"
        onClick={() => logout(navigate)} // ⬅️ Pass navigate to logout
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
