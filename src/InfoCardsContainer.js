import InfoCard from "./InfoCard";
import "./InfoCardsContainer.css";
import { ReactComponent as Icon1 } from "./icons/student-icon.svg";
import { ReactComponent as Icon2 } from "./icons/professor-icon.svg";
// import { ReactComponent as Icon3 } from "./icons/certificate-icon.svg";
import { ReactComponent as Icon4 } from "./icons/question-icon.svg";

export default function InfoCards_container() {
  return (
    <div className="info-cards-container">
      <InfoCard
        Icon={Icon1}
        title="Μαθητές"
        items={[
          {
            title: "Δηλώσεις μαθημάτων",
            description: "Δηλώστε τα μαθήματα στα οποία θέλετε να εξεταστείτε",
          },
          {
            title: "Βαθμολογίες",
            description:
              "Προβάλετε και εκτυπώστε τις βαθμολογίες σας από κάθε εξεταστική περίοδο",
          },
          {
            title: "Πρόοδος σχολής",
            description:
              "Ενημερωθείτε για συγγράμματα, καθηγητές, τον μέσο όρο και το υπόλοιπο των μαθημάτων για πτυχίο",
          },
        ]}
      />
      <InfoCard
        Icon={Icon2}
        title="Διδάσκοντες"
        items={[
          {
            title: "Δημιουργία βαθμολογιών",
            description:
              "Καταχωρίστε τις βαθμολογίες των μαθητών και υποβάλετέ τες ηλεκτρονικά",
          },
          {
            title: "Επεξεργασία",
            description:
              "Αποθηκεύστε προσωρινά το βαθμολόγιο, επεξεργαστείτε το και υποβάλλετέ το σε δεύτερο χρόνο",
          },
          {
            title: "Μαθήματα - Φοιτητές",
            description:
              "Παρακολουθήστε τα μαθήματά σας και τους φοιτητές που συμμετέχουν σε αυτά",
          },
        ]}
      />
      {/* <InfoCard
        Icon={Icon3}
        title="Πιστοποιητικά"
        items={[
          {
            title: "Αίτηση",
            description:
              "Σε λίγα βήματα αιτηθείτε πιστοποιητικά φοιτητικής ιδιότητας, φορολογικής / στρατιωτικής χρήσης κ.α",
          },
          {
            title: "Ιστορικό",
            description:
              "Διατηρήστεσε ένα μέρος τα πιστοποιητικά που έχουν εκδοθεί και επανεκτυπώστε τα",
          },
        ]}
      /> */}
      <InfoCard
        Icon={Icon4}
        title="Συχνές ερωτήσεις"
        items={[
          {
            description:
              "Είμαι πρωτοετής φοιτητής, έχω κάνει εγγραφή αλλά δεν μπορώ να συνδεθώ.",
          },
          {
            description:
              "Είμαι μέλος ΔΕΠ, πώς θα αποκτήσω πρόσβαση στη πλατφόρμα;",
          },
          {
            description:
              "Ενδιαφέρομαι να μάθω για το πρόγραμμα σπουδών ενός τμήματος. Πως μπορώ να το βρω;",
          },
        ]}
      />
    </div>
  );
}
