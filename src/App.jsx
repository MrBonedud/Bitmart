import { Outlet } from "react-router-dom";
import Layout from "./components/common/Layout/Layout";
import { CartProvider } from "./contexts/CartContext";
function App() {
  return (
   <CartProvider>
       <Layout>
      <Outlet /> 
    </Layout>
   </CartProvider>
 
  );
}

export default App;