import { Layout } from "@components/layout";
import { useNavigate } from "react-router-dom";
import "./Home.scss";

export function Home() {
  const navigate = useNavigate();

  return (
    <Layout pageActive="home">
      <div className="home-container">
        <h1>Bienvenue sur SportSee</h1>
        <p>Veuillez sélectionner un utilisateur pour voir son profil :</p>
        <div className="user-selection">
          <button
            onClick={() => navigate("/profile/12")}
            className="user-button"
          >
            Karl
          </button>
          <button
            onClick={() => navigate("/profile/18")}
            className="user-button"
          >
            Cecilia
          </button>
        </div>
      </div>
    </Layout>
  );
}
