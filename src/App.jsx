import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { ClientPanel } from "./pages/ClientPanel";
import { TechDashBoard } from "./pages/TechDashboard";
import { Home } from "./pages/Home";
import { TechLogin } from "./pages/TechLogin";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [ticket, setTicket] = useState(() => {
    const chamados = localStorage.getItem("chamados_helpdesk");
    if (chamados) return JSON.parse(chamados);
    return [];
  });

  useEffect(() => {
    localStorage.setItem("chamados_helpdesk", JSON.stringify(ticket));
  }, [ticket]);

  const handleCreateTicket = (newTicket) => {
    const ticketCriado = {
      id: Date.now(),
      status: "open",
      email: newTicket.email,
      title: newTicket.title,
      print: newTicket.print,
    };

    setTicket((prev) => [...prev, ticketCriado]);
  };

  const handleResolveTicket = (id) => {
    setTicket((prev) =>
      prev.map((ticket) => {
        if (ticket.id === id) {
          return { ...ticket, status: "closed" };
        }

        return ticket;
      })
    );
  };

  const handleLogin = ( password) => {
    if( password == "ASenha"){
      setIsAuth(true);
      return true;
    }
    return false;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/Cliente"
          element={
            <ClientPanel
              tickets={ticket}
              onCreateTicket={handleCreateTicket}
            />
          }
        />

        <Route
          path="/Tech"
          element={
            isAuth ?
            <TechDashBoard
              tickets={ticket}
              onResolve={handleResolveTicket}
            />
            :
            <TechLogin onLogin={handleLogin}/>
          }
        />

        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}