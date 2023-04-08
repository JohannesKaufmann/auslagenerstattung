import Head from "next/head";
import React from "react";

const INDIVIDUAL = `Johannes Kaufmann
Dolziger Str. 3
10247 Berlin
Deutschland`;

const VERCEL_ADDR = `Vercel Inc.
340 S Lemon Ave #4133
Walnut, CA 91789
USA`;

const VERCEL_PRIVACY = "https://vercel.com/legal/privacy-policy";

const PrivacyPage = () => {
  return (
    <>
      <Head>
        <title>Auslagenerstattung | Impressum und Datenschutzerklärung</title>
      </Head>
      <div className="p-8 text-gray-900">
        <h1 className="font-semibold text-xl">
          Impressum und Datenschutzerklärung
        </h1>

        <div className="mt-8">
          <p>Die Website wird entwickelt und betreut von:</p>
          <EntityCard entity={INDIVIDUAL}>Email: johannes@joina.de</EntityCard>
        </div>

        <Divider />

        <div>
          <p>
            Im Formular werden Daten wie Firmenname, Adresse und IBAN abgefragt.
            Außerdem können Dateien hinzugefügt werden. Dies ist notwendig, um
            die Erstellung des PDFs zu ermöglichen.
            <br />
          </p>
          <div className="h-1.5" />

          <p>
            Diese Daten werden nur für diesen Zweck genutzt und{" "}
            <span className="font-semibold">bleiben lokal im Browser</span>.
            Somit werden diese Daten{" "}
            <span className="font-semibold">
              <span className="underline">nicht</span> an den Server gesendet
            </span>
            , sondern verbleiben beim Nutzer.
          </p>
        </div>

        <Divider />

        <div>
          <p>
            Für die Bereitstellung der Website wird die Cloud-Plattform{" "}
            <span className="font-semibold">Vercel</span> genutzt:
          </p>
          <EntityCard entity={VERCEL_ADDR}>
            Datenschutzerklärung:{" "}
            <Link href={VERCEL_PRIVACY}>{VERCEL_PRIVACY}</Link>
          </EntityCard>
          <p>
            Die Website wird durch Vercel ausgeliefert. Der Browser sendet bei
            einer Anfrage standardmäßig Daten wie IP-Adresse, Browser-Version
            und andere Metadaten mit an den Server. Vercel speichert und
            verarbeitet diese Daten zum Zweck des Betriebs, der
            Aufrechterhaltung und der Verbesserung des Service. Die Verarbeitung
            dieser Daten ist technisch notwendig, um die Nutzung der Website zu
            ermöglichen <LegalQuote place="Art. 6 Abs. 1 Bst. b" />.
          </p>
        </div>
      </div>
    </>
  );
};
export default PrivacyPage;

const Divider = () => <hr className="my-8 border-gray-100" />;
const Link = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);
const EntityCard = ({ entity, children }) => {
  return (
    <div className="italic my-2 text-gray-700 whitespace-pre-wrap">
      {entity}
      <div className="h-1.5" />
      {children}
    </div>
  );
};

// de=DSGVO en=GDPR
const LegalQuote = ({ place, source = "DSGVO" }) => {
  return (
    <span className="italic">
      ({place} {source})
    </span>
  );
};
