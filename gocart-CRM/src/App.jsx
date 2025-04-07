import React from "react";
import { BrowserRouter as Router,Routes,Route,Navigate,useLocation,} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Context from "./pages/Context";
import Header from "./component/Header";
import Sidebar from "./component/Sidebar";
import User from "./pages/User";
import Vendor from "./pages/Vendor";
import VendorManagement from "./pages/VendorProductList";

const Layout = ({ children }) => {
  const location = useLocation();
  const showHeaderAndSidebar =
   true

  return (
    <div className="flex flex-col h-screen">
      {showHeaderAndSidebar && <Header />}
      {showHeaderAndSidebar && <Sidebar />}
        <main className="flex-grow p-6  bg-[#171B2D] overflow-auto">
          {children}
        </main>
      
      
    </div>
  );
};

function App() {
  return (
    <Context>
      <Router>
        <Routes>
          <Route path="/"element={<Layout> <Dashboard /></Layout>}/>
          <Route path="/users"element={<Layout> <User /></Layout>}/>
          <Route path="/vendors"element={<Layout> <Vendor /></Layout>}/>
          <Route path="/vendorslist"element={<Layout> <VendorManagement /></Layout>}/>
        </Routes>
      </Router>
    </Context>
  );
}

export default App;
