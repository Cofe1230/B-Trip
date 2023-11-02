import {
    Routes, 
    Route
} from "react-router-dom";
import Navigation from "./component/navigation/Navigation";
import OverViewPage from "./component/pages/OverViewPage";

import RecommendPage from "./component/pages/RecommendPage";
import AnalysisPage from "./component/pages/AnalysisPage";
  
function Routers() {
    return (
        <>
            <Navigation/>
            <Routes>
                <Route path={"/overview"} element={<OverViewPage/>}></Route>
                <Route path={"/recommend"} element={<RecommendPage/>}></Route>
                <Route path={"/analysis"} element={<AnalysisPage/>}></Route>
            </Routes>
        </>
    );
}
  
export default Routers;
  