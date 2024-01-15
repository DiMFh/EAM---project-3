/* NewDeclarationPreview.js */
import "./NewDeclarationPreview.css";
import { Breadcrumb } from "react-bootstrap";

const NewDeclarationPreview = ({
  selectedCourses,
  goBackToSelection,
  goToFinish,
}) => {
  return (
    <div className="new-declaration-preview">
      <div className="new-declaration-preview-box">
        <h5 className="new-declaration-preview-message">
          Η αίτηση ολοκληρώθηκε με επιτυχία!
        </h5>
        <h6 className="new-declaration-preview-submessage">
          Παρακάτω μπορείς να δεις τις επιλεγμένες σου δηλώσεις.
        </h6>
        <div className="new-declaration-preview-table">
          <table>
            <thead>
              <tr>
                <th>Κωδικός</th>
                <th>Όνομα</th>
                <th>Εξάμηνο</th>
                <th>Τύπος</th>
                <th>Περιγραφή</th>
              </tr>
            </thead>
            <tbody>
              {selectedCourses.map((course) => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.name}</td>
                  <td>{course.semester}</td>
                  <td>{course.type}</td>
                  <td>{course.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="button" onClick={goBackToSelection}>
          Πίσω ρε μαλάκα
        </button>
        <button className="button" onClick={goToFinish}>
          Υποβολή
        </button>
      </div>
    </div>
  );
};
export default NewDeclarationPreview;
