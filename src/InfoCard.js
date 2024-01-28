import "./InfoCard.css";
import { DropdownButton, Dropdown } from "react-bootstrap";

export default function InfoCard({ Icon, title, items, button }) {
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
      {button && (
        <DropdownButton
          drop={"up"}
          variant="primary"
          title="Συνδεθείτε"
          flip={false}
        >
          <Dropdown.Item href="/login">Είσοδος</Dropdown.Item>
          <Dropdown.Item href="/register">Εγγραφή</Dropdown.Item>
        </DropdownButton>
      )}
    </div>
  );
} 