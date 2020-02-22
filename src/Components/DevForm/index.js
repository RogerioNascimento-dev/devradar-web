import React, { useState, useEffect } from "react";

function DevForm({ onSubmit }) {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [github_username, setGithubUsername] = useState("");
  const [tecs, setTecs] = useState("");

  //Carrega latitude e longitude do usuário
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      erro => {
        console.log(erro);
      },
      {
        timeout: 30000
      }
    );
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    await onSubmit({
      latitude,
      longitude,
      github_username,
      tecs
    });
    setGithubUsername("");
    setTecs("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_username">Usuário Github</label>
        <input
          name="github_username"
          id="github_username"
          value={github_username}
          required
          onChange={e => setGithubUsername(e.target.value)}
        />
      </div>
      <div className="input-block">
        <label htmlFor="tecs">Tecnologias</label>
        <input
          name="tecs"
          id="tecs"
          value={tecs}
          required
          onChange={e => setTecs(e.target.value)}
        />
      </div>
      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="number"
            name="latitude"
            id="latitude"
            value={latitude}
            onChange={e => setLatitude(e.target.value)}
            required
          />
        </div>
        <div className="input-block">
          <label htmlFor="longitude">Latitude</label>
          <input
            type="number"
            name="longitude"
            id="longitude"
            value={longitude}
            onChange={e => setLongitude(e.target.value)}
            required
          />
        </div>
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
}

export default DevForm;
