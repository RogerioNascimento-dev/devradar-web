import React, { useState, useEffect } from "react";
import DevItem from "./Components/DevItem";
import DevForm from "./Components/DevForm";
import api from "./services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Global.css";
import "./Main.css";
import "./Aside.css";
import "./App.css";
import "./Animacoes.css";

function App() {
  const [devs, setDevs] = useState([]);
  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("/devs");
      setDevs(response.data);
    }
    loadDevs();
  }, []);

  async function handleAddDev(data) {
    try {
      const response = await api.post("/devs", data);
      setDevs([...devs, response.data]);
      toast.success("Dev Adicionado com sucesso!");
    } catch (err) {
      toast.error(
        err.request.response
          ? err.request.response
          : "Algo inesperado aconteceu!"
      );
    }
  }

  async function handleRemoveDev(id) {
    try {
      await api.delete(`/devs/${id}`);
      toast.success("Removido com sucesso!");
      setDevs(devs.filter(dev => dev._id != id));
    } catch (err) {
      toast.error(
        err.request.response
          ? err.request.response
          : "Algo inesperado aconteceu!"
      );
    }
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
        <ToastContainer autoClose={2000} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} onRemoveDev={handleRemoveDev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
