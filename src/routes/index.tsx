import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Login } from "@/screens/Login";
import { Register } from "@/screens/Register";
import { Outlet, createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
   {
      path: "/",
      element: <Login />,
   },
   {
      path: "/cadastro",
      element: <Register />,
   },
   {
      element: <div>Header <Outlet /></div>,
      children: [
         {
            path: "/home",
            element: <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
         }
      ]
   }
]);