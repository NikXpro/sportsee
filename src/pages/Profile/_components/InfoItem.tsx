import "./InfoItem.scss";

type InfoItemProps = {
  icon: string;
  title: string;
  value: string;
};

export function InfoItem({ icon, title, value }: InfoItemProps) {
  return (
    <div className="info-item">
      <img src={icon} alt={title} />
      <div className="info-item-content">
        <h2 className="info-item-title">{value}</h2>
        <p className="info-item-value">{title}</p>
      </div>
    </div>
  );
}
