/**
 * @fileoverview Home page component displaying user selection interface
 * @module Home
 */

import { Layout } from "@components/layout";
import { useNavigate } from "react-router-dom";
import "./Home.scss";

/**
 * Home page component that displays the welcome message and user selection buttons
 * Allows users to navigate to specific user profiles
 *
 * @component
 * @returns {JSX.Element} The rendered home page
 *
 * @example
 * ```tsx
 * <Home />
 * ```
 */
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
