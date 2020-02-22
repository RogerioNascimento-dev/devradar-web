import React from "react";
import { FaTrash } from "react-icons/fa";
import "./styles.css";

function DevItem({ dev, onRemoveDev }) {
  function handleDelete(id) {
    console.log(id);
  }
  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.tecs.join(", ")}</span>
        </div>
        <div className="icone">
          <FaTrash size={15} onClick={() => onRemoveDev(dev._id)} />
        </div>
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`}>
        Acessar perfil no Github
      </a>
    </li>
  );
}

export default DevItem;
