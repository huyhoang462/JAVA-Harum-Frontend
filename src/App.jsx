import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./app/pages/Home/Home";
import DefaultLayout from "./app/layouts/DefaultLayout";
import Profile from "./app/pages/Profile/Profile";
import NotFound from "./app/pages/NotFound/NotFound";
import AccessLayout from "./app/layouts/AccessLayout";
import Login from "./app/pages/Login/Login";
import Signup from "./app/pages/Signup/Signup";
import { ToastContainer } from "react-toastify";
import PrivatePart from "./app/components/PrivatePart";
import ProfileLayout from "./app/layouts/ProfileLayout";
import ProfileSetting from "./app/pages/ProfileEdit/ProfileSetting";
import ProfileEdit from "./app/pages/ProfileEdit/ProfileEdit";
import Topic from "./app/pages/Topic/Topic";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/profileedit"
              element={
                <PrivatePart>
                  <ProfileSetting />
                </PrivatePart>
              }
            />
            <Route
              path="/changepassword"
              element={
                <PrivatePart>
                  <ProfileSetting />
                </PrivatePart>
              }
            />
            <Route path="/topic/:topicName" element={<Topic />} />
          </Route>
          <Route element={<AccessLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route element={<ProfileLayout />}>
            <Route path="/edit-profile" element={<ProfileEdit />} />
            <Route
              path="/profile"
              element={
                <PrivatePart>
                  <Profile />
                </PrivatePart>
              }
            />
            
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
