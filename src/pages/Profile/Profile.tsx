/**
 * @fileoverview Profile page component displaying user statistics and charts
 * @module Profile
 */

import { Layout } from "@components/layout";
import { ChartActivity } from "@pages/Profile/_components/ChartActivity";
import { ChartPerformance } from "@pages/Profile/_components/ChartPerformance";
import { ChartScore } from "@pages/Profile/_components/ChartScore";
import { ChartSessions } from "@pages/Profile/_components/ChartSessions";
import { InfoItem } from "@pages/Profile/_components/InfoItem";
import { Navigate, useParams } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import "./Profile.scss";

/**
 * Mapping of nutritional data keys to their display titles
 * @constant
 * @type {Object.<string, string>}
 */
const nutritionalTitles: { [key: string]: string } = {
  calorieCount: "Calories",
  proteinCount: "Protéines",
  carbohydrateCount: "Glucides",
  lipidCount: "Lipides",
};

/**
 * Profile page component that displays detailed user statistics and performance data
 * Shows various charts and nutritional information for the specified user
 * Handles loading states, errors, and invalid user scenarios
 *
 * @component
 * @returns {JSX.Element} The rendered profile page with user statistics
 *
 * @example
 * ```tsx
 * // URL: /profile/12
 * <Profile />
 * ```
 */
export function Profile() {
  const { id } = useParams<{ id: string }>();
  const userId = id ? Number(id) : 0;
  const { user, isLoading, error } = useUser(userId);

  return (
    <Layout pageActive="profile">
      <div className="profile-container">
        {!id || id.trim() === "" ? (
          <Navigate to="/" replace />
        ) : isNaN(userId) ? (
          <div className="error-message">ID utilisateur invalide</div>
        ) : isLoading ? (
          <div className="loading-message">Chargement...</div>
        ) : error ? (
          <div className="error-message">Erreur : {error.message}</div>
        ) : !user ? (
          <div className="error-message">Utilisateur non trouvé</div>
        ) : (
          <>
            <div className="profile-header">
              <h1>
                Bonjour <span className="name">{user.getFullName()}</span>
              </h1>
              <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
            </div>
            <div className="profile-content">
              <div className="profile-content-left">
                <div className="activity-chart">
                  <ChartActivity data={user.getActivityChartData()} />
                </div>
                <div className="activity-stats">
                  <ChartSessions data={user.getAverageSessionsChartData()} />
                  <ChartPerformance data={user.getPerformanceChartData()} />
                  <ChartScore data={user.getScoreChartData()} />
                </div>
              </div>
              <div className="profile-content-right">
                {Object.entries(user.getNutritionalData()).map(
                  ([key, value]) => (
                    <InfoItem
                      key={key}
                      icon={`/icons/${key}.png`}
                      title={nutritionalTitles[key]}
                      value={value}
                    />
                  )
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
