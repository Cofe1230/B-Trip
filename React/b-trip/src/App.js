import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import MainPage from "./component/pages/MainPage";
import Navigation from "./component/navigation/Navigation";
import OverViewPage from "./component/pages/OverViewPage";
import RecommendPage from "./component/pages/RecommendPage";
import RecommendResultPage from "./component/pages/RecommendResultPage";


function App() {
  return (
    <BrowserRouter>
      <Navigation/>
      <Routes>
        <Route index element={<MainPage/>} />
        <Route path={"/overview"} element={<OverViewPage/>}></Route>
        <Route path={"/recommend"} element={<RecommendPage/>}></Route>
        <Route path={"/result"} element={<RecommendResultPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
