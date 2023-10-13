import { Dispatch, SetStateAction, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import { ContentWrapper } from "./ContentWrapper";
import { Button } from "components/Form";

export type Screen = "nps" | "submitted" | "feedback";

export interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<boolean>;

  score: number;
  setScore: Dispatch<number>;

  screen: Screen;
  setScreen: Dispatch<SetStateAction<Screen>>;
}

const NpsScreen = ({ setIsOpen, score, setScore, setScreen }: Props) => {
  return (
    <ContentWrapper
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-10 h-10"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 001.28.53l4.184-4.183a.39.39 0 01.266-.112c2.006-.05 3.982-.22 5.922-.506 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0012 2.25zM8.25 8.625a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zm2.625 1.125a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
            clipRule="evenodd"
          />
        </svg>
      }
      title={"Ihre Meinung ist gefragt!"}
      content={
        <div>
          <RadioGroup
            className="mt-6 text-slate-800"
            value={score}
            onChange={setScore}
          >
            <RadioGroup.Label>
              Wie wahrscheinlich ist es, dass Sie die Website Freund:innen oder
              Kolleg:innen weiterempfehlen werden?
            </RadioGroup.Label>

            <div className="mt-2 grid grid-cols-10">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => {
                return (
                  <RadioGroup.Option
                    key={value}
                    value={value}
                    // ui-not-active:bg-blue-50 ui-not-active:text-black
                    className={`justify-self-center cursor-pointer rounded-full flex items-center justify-center tabular-nums w-[30px] h-[30px] md:w-[40px] md:h-[40px] ${
                      value <= score ? "bg-blue-500 text-white" : "bg-blue-50"
                    }`}
                  >
                    <span className="text-center align-middle">{value}</span>
                  </RadioGroup.Option>
                );
              })}
            </div>
          </RadioGroup>
          <div className="mt-1 flex justify-between text-gray-400">
            <span>Unwahrscheinlich</span>
            <span>Wahrscheinlich</span>
          </div>
        </div>
      }
      bottom={
        <div className="flex justify-end">
          <Button onClick={() => setIsOpen(false)}>Später beantworten</Button>
          <Button
            className="ml-2"
            primary
            onClick={() => setScreen("submitted")}
          >
            Abschicken
          </Button>
        </div>
      }
    />
  );
};

const SubmittedScreen = ({ setIsOpen, setScreen }: Props) => {
  useEffect(() => {
    console.log("SubmittedScreen useEffect");
    return () => {
      console.log("SubmittedScreen cleanup");
      setScreen("feedback");
    };
  }, [setScreen]);
  return (
    <ContentWrapper
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-10 h-10"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 001.28.53l4.184-4.183a.39.39 0 01.266-.112c2.006-.05 3.982-.22 5.922-.506 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0012 2.25zM8.25 8.625a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zm2.625 1.125a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
            clipRule="evenodd"
          />
        </svg>
      }
      title={"Danke für das Feedback!"}
      content={
        <p className="text-center">
          Sie finden es hilfreich? Sie haben Verbesserungs&shy;vorschläge? Ich
          würde mich freuen, von Ihnen zu hören!
          <br /> <br />
          Schreib Sie mir gerne eine Email an johannes@joina.de
        </p>
      }
      bottom={
        <div className="flex justify-end">
          <Button onClick={() => setIsOpen(false)}>Schließen</Button>
        </div>
      }
    />
  );
};

const FeedbackScreen = ({ setIsOpen, setScreen }: Props) => {
  return (
    <ContentWrapper
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-10 h-10 text-green-600"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
            clipRule="evenodd"
          />
        </svg>
      }
      title={"Das PDF wurde heruntergeladen"}
      content={
        <p className="text-center">
          Sie finden es hilfreich? Sie haben Verbesserungs&shy;vorschläge? Ich
          würde mich freuen, von Ihnen zu hören!
          <br /> <br />
          Schreib Sie mir gerne eine Email an johannes@joina.de
        </p>
      }
      bottom={
        <div className="flex justify-end">
          <Button onClick={() => setIsOpen(false)}>Schließen</Button>
        </div>
      }
    />
  );
};

export const ShowCurrentScreen = (props: Props) => {
  if (props.screen === "nps") {
    return <NpsScreen {...props} />;
  } else if (props.screen === "submitted") {
    return <SubmittedScreen {...props} />;
  } else if (props.screen === "feedback") {
    return <FeedbackScreen {...props} />;
  } else {
    return <p>Unknown modal screen</p>;
  }
};
