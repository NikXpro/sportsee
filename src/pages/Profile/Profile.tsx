import { Layout } from "@components/layout";
import { ChartActivity } from "@pages/Profile/_components/ChartActivity";
import { InfoItem } from "@pages/Profile/_components/InfoItem";
import "./Profile.scss";

export function Profile() {
  return (
    <>
      <Layout pageActive="profile">
        <div className="profile-container">
          <div className="profile-header">
            <h1>
              Bonjour <span className="highlight">Thomas</span>
            </h1>
            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
          </div>
          <div className="profile-content">
            <div className="profile-content-left">
              <div className="activity-chart">
                <ChartActivity />
              </div>
              <div className="activity-stats"></div>
            </div>
            <div className="profile-content-right">
              <InfoItem
                icon={"/icons/calories-icon.png"}
                title={"Calories"}
                value={"150kcal"}
              />
              <InfoItem
                icon={"/icons/protein-icon.png"}
                title={"Proteines"}
                value={"155g"}
              />
              <InfoItem
                icon={"/icons/carbs-icon.png"}
                title={"Glucides"}
                value={"290g"}
              />
              <InfoItem
                icon={"/icons/fat-icon.png"}
                title={"Lipides"}
                value={"50g"}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
