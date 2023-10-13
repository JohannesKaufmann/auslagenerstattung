import { Dialog } from "@headlessui/react";
import { useCallback, useState } from "react";
import { Props, Screen, ShowCurrentScreen } from "./Screens";
import { usePlausible } from "next-plausible";

const LOCALSTORAGE_KEY = "submittedNpsScore";

const retrieveScoreFromStorage = (): number | null => {
  const data = localStorage.getItem(LOCALSTORAGE_KEY);

  if (data === null) {
    return null;
  }

  const parsed = JSON.parse(data);

  return parsed;
};
const saveScoreToStorage = (val: number): void => {
  if (val === null) {
    return;
  }
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(val));
};

const getInitialScreen = (score: number | null): Screen => {
  if (score === null) {
    return "nps";
  } else {
    return "feedback";
  }
};

export const useNps = () => {
  const plausible = usePlausible();

  let [isOpen, setIsOpen] = useState(false);

  let [score, setScore] = useState(retrieveScoreFromStorage());
  let [screen, setScreen] = useState<Screen>(
    getInitialScreen(retrieveScoreFromStorage())
  );

  const setScreenFunc = useCallback(
    (newScreen: Screen) => {
      if (newScreen === "submitted") {
        console.info("submitted score", { score });

        plausible("NPS:Submit", {
          props: {
            score: score,
          },
        });
        saveScoreToStorage(score);
      }

      setScreen(newScreen);
    },
    [plausible, score, setScreen]
  );

  return [isOpen, setIsOpen, score, setScore, screen, setScreenFunc] as const;
};

export const NPSModal = (props: Props) => {
  return (
    <Dialog
      open={props.isOpen}
      onClose={() => props.setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-white shadow-lg p-4">
          <ShowCurrentScreen {...props} />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
