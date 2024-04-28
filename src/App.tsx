import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
   return (
      <>
         <ToastContainer
            position="top-center"
            autoClose={3000}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
            theme="colored"
            style={{ width: "500px" }}
         />
         <RouterProvider router={router} />
      </>
   );
}

export default App;
