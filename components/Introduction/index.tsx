import React from "react";

const questions = [
  {
    question: `Wie teuer ist die Nutzung?`,
    answer: `Es ist komplett kostenlos, da die Auslagenerstattung im Browser generiert wird. Und dadurch entfallen keine kosten für einen Server.`,
  },
  {
    question: `Was passiert mit den Daten?`,
    answer: `Die Daten bleiben im Browser und werden niemals an den Server übertragen.`,
  },
  {
    question: `Was macht dieses Tool?`,
    answer: `Dies ist ein Muster für eine Auslagenerstattung. Die sehr einfach online ausgefüllt werden kann.`,
  },
  // TODO: keyword "vorlage"
  {
    question: `Was ist eine Auslagenerstattung?`,
    answer:
      "Mit einer Auslagenerstattung kann man von der Firma Geld zurückbekommen. Zum Beispiel, wenn man etwas für die Firma mit dem eigenen Geld gezahlt hat.",
  },
];

const Introduction = () => {
  return (
    <header className="p-4 md:p-8 pb-0 md:pb-0 space-y-2">
      <h1 className="text-lg font-bold">Auslagenerstattung im Browser</h1>

      <p>
        Eine Auslagenerstattung ist normalerweise mühselig. Und die Buchhaltung
        pocht auf das richtige Format.
      </p>
      <p>
        Dazu stellen sich weitere Fragen:{" "}
        <span className="italic">
          Wie kann ich die Belege an das Formular anhängen?
        </span>{" "}
        <span className="italic">
          Also wie kombiniere ich zwei PDF Dateien?
        </span>
      </p>
      <p>
        Mit dem Online Tool ist das super einfach. Die komplette
        Auslagenerstattung wird{" "}
        <span className="font-semibold">automatisch</span> für dich generiert!
      </p>

      <p className="pt-4">
        Komplett <span className="font-semibold">kostenlos</span> und{" "}
        <span className="font-semibold">
          <span className="underline">ohne</span> Benutzerkonto
        </span>
        . Und das <span className="font-semibold">sicher</span> im Browser!
      </p>

      <details
        itemScope
        itemType="https://schema.org/FAQPage"
        className="p-4 rounded border border-gray-300"
      >
        <summary>
          <h2 itemProp="name" className="inline font-semibold">
            Häufige Fragen
          </h2>
        </summary>

        <div className="mt-4 pt-4 border-t border-gray-300 space-y-2">
          {questions.map((q) => (
            <div
              key={q.question}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <h3 itemProp="name" className="font-semibold">
                {q.question}
              </h3>
              <div
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <p itemProp="text">{q.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </details>
    </header>
  );
};
export default Introduction;
