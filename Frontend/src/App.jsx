import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VideoPlayer from "./pages/VideoPlayer";
import Channel from "./pages/Channel";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState } from "react";

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <BrowserRouter>
            <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            <div className="flex bg-black text-white min-h-screen">
                <Sidebar open={sidebarOpen} />
                <div className="flex-1 p-4">
                    <Routes>
                        {/* PUBLIC ROUTES */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* PROTECTED ROUTES */}
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <Home />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/video/:id"
                            element={
                                <ProtectedRoute>
                                    <VideoPlayer />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/channel"
                            element={
                                <ProtectedRoute>
                                    <Channel />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
