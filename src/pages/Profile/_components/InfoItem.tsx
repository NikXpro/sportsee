/**
 * @fileoverview InfoItem component for displaying nutritional information with an icon
 * @module InfoItem
 */

import "./InfoItem.scss";

/**
 * Props for the InfoItem component
 * @interface InfoItemProps
 * @property {string} icon - Path to the icon image
 * @property {string} title - Label for the nutritional information
 * @property {string} value - Value of the nutritional information
 */
type InfoItemProps = {
  icon: string;
  title: string;
  value: string;
};

/**
 * Component for displaying a single nutritional information item
 * Shows an icon, value, and label in a consistent format
 *
 * @component
 * @param {InfoItemProps} props - Component props
 * @param {string} props.icon - Path to the icon image
 * @param {string} props.title - Label for the nutritional information
 * @param {string} props.value - Value of the nutritional information
 * @returns {JSX.Element} The rendered info item
 *
 * @example
 * ```tsx
 * <InfoItem
 *   icon="/icons/calories.png"
 *   title="Calories"
 *   value="1,930kCal"
 * />
 * ```
 */
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
