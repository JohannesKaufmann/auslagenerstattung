import { useState, useCallback, useRef, useEffect } from "react";

export interface ICompany {
  name: string;

  street: string;
  zipcode: string;
  city: string;
}
export interface IRecipient {
  account_owner: string;

  iban: string;
  bic: string;
}

export interface IRecord {
  description: string;

  // TODO: change to number
  amount: string;
}

export interface IAttachmentPage {
  page_num: number;

  img_object_url: ObjectURL;

  // dimensions
}
export interface IAttachment {
  filename: string;
  filetype: string;

  file_object_url: ObjectURL;

  pages: IAttachmentPage[];
}

export interface IDocument {
  company: ICompany;
  recipient: IRecipient;

  records: IRecord[];
  attachments: IAttachment[];

  signature: null | string;
}
// export const getInitialDocument = (): IDocument => ({
//   company: {
//     name: "",
//     street: "",
//     zipcode: "",
//     city: "",
//   },
//   recipient: {
//     account_owner: "",
//
//     iban: "",
//     bic: "",
//   },
//
//   records: [],
//   attachments: [],
//
//   signature: null,
// });

export const getInitialDocument = (): IDocument => ({
  company: {
    name: "CODE Education GmbH",
    street: "Lohmühlenstr. 65",
    zipcode: "12435",
    city: "Berlin",
  },
  recipient: {
    account_owner: "Johannes Kaufmann",

    iban: "DE02100500000054540402",
    bic: "BELADEBE",
  },

  records: [
    {
      description:
        "REWE: Essen für das Mittagessen am Wochenende + Montag da Feiertag sowie Materialen für Brainstorming",
      // @ts-ignore
      amount: "405,40 €",
    },
    {
      description: "Metro",
      // @ts-ignore
      amount: "15,00 €",
    },
  ],
  attachments: [],

  signature: null,
});

// - - - - - - - - - - - //

// This is usually "blob:http://localhost:3000/${uuid}"
export type ObjectURL = `blob:${string}`;

export type DataURL = `data:${string}`;

export const dataURLToObjectURL = (b64Data: DataURL): Promise<ObjectURL> => {
  return fetch(b64Data)
    .then((res) => res.blob())
    .then((blob) => URL.createObjectURL(blob) as ObjectURL);
};
export const fileToObjectURL = (file: File): ObjectURL => {
  return URL.createObjectURL(file) as ObjectURL;
};

// - - - - - - - - - - - //

export function useThrottledState<T>(initialState: T) {
  const [isStale, setIsStale] = useState(false);
  const [state, _setState] = useState<T>(initialState);

  const [throttledState, _setThrottledState] = useState<T>(state);

  const setState = useCallback(
    (data) => {
      setIsStale(true);
      _setState(data);
    },
    [setIsStale, _setState]
  );

  const stateRef = useRef();
  // @ts-ignore
  stateRef.current = state;

  const update = useCallback(
    (data = stateRef.current) => {
      setIsStale(false);
      _setThrottledState(data);

      // setTimeout(() => {})
    },
    [setIsStale, _setThrottledState]
  );

  return [state, setState, isStale, throttledState, update] as const;
}
