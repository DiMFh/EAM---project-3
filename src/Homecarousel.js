import Carousel from "react-bootstrap/Carousel";
import "./Homecarousel.css";
import InfoCard from "./InfoCard";
import { ReactComponent as Icon1 } from "./icons/student-icon.svg";
import { ReactComponent as Icon2 } from "./icons/professor-icon.svg";
import { ReactComponent as Icon4 } from "./icons/question-icon.svg";

function Homecarousel() {
  return (
    <>
      <div>
        <h1 style={{ marginTop: "60px" }}>MyStudies</h1>

        <Carousel className="home-carousel" interval={5000}>
          <Carousel.Item>
            <div>
              {/* <Firstbackground text="First slide" /> */}
              {/* <InfoCardsContainer /> */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "50vh",
                }}
              >
                <InfoCard
                  Icon={Icon1}
                  title="Μαθητές"
                  button={true}
                  items={[
                    {
                      title: "Δηλώσεις μαθημάτων",
                      description:
                        "Δηλώστε τα μαθήματα στα οποία θέλετε να εξεταστείτε",
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
              </div>
              <Carousel.Caption className="carousel-caption-top"></Carousel.Caption>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: "50vh",
              }}
            >
              <InfoCard
                Icon={Icon2}
                title="Διδάσκοντες"
                button={true}
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
            </div>
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: "50vh",
              }}
            >
              <InfoCard
                Icon={Icon4}
                title="Συχνές ερωτήσεις"
                button={false}
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
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
}

export default Homecarousel;