import "./App.css";
import React, { useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterScreen from "./screens/RegisterScreen/Registerscreen.js";
import LoginScreen from "./screens/LoginScreen/Loginscreen.js";
import MyNotes from "./screens/MyNotes/MyNotes.js";
import CreateNote from "./screens/createNote/createNote.js";
import SingleNote from "./screens/singleNote/SingleNote.js";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen.js";





const App = () => {
  const [search, setSearch] = useState("");
  // console.log(search)
  return (
    <BrowserRouter>
      <Header setSearch={(s) => setSearch(s)} />
      <Routes>
        <Route path="/" element={<LandingPage />} exact />
        <Route path="/mynotes" element={<MyNotes search={search} />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />

        <Route path="/note/:id" element={<SingleNote />} />
        <Route path="/createnote" element={<CreateNote />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
