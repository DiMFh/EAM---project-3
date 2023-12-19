import "./InfoCard.css";

export default function InfoCard({ Icon, title, items }) {
  return (
    <div className="info-card">
      <Icon className="info-icon" />
      <h2>{title}</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <strong> {item.title}</strong>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
