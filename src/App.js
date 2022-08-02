import { Button } from "antd";
import Header from "./components/Header";
import { AccountSettings, DetailContent } from "./components/Modal";
import logo from "../src/assets/images.png";
function App() {
  return (
    <div className='bg-[#E2E2E2] h-[625px] w-[1366px]'>
      <Header />
      {/* <AccountSettings /> */}
      <DetailContent
        photo='https://picsum.photos/536/380'
        visible={true}
        title='Title'
        author='Author'
        gen='Gen'
        publisher='Publisher'
        group='Group'
        genre='Genre'
      />
    </div>
  );
}
export default App;
