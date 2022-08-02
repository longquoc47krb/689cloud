import { Button } from "antd";
import Header from "./components/Header";
import { AccountSettings } from "./components/Modal";
import logo from "./logo.svg";
function App() {
  return (
    <div className='bg-[#E2E2E2]'>
      <Header />
      <AccountSettings />
    </div>
  );
}
export default App;
