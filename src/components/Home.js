import { useContext } from "react";
import { GlobalContext } from "../context/global";
import { Layout } from "./Layout";


const Home = () => {
  const [global, ] = useContext(GlobalContext);
  return global.activeScreen ? (
    <Layout heading={global.activeScreen.heading}>
      {global.activeScreen.content}
    </Layout>
  ):null;
};

export default Home;