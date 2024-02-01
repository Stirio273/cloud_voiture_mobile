import { useFormInput } from "./utils";

export const useSignupFields = () => {
  return [
    {
      id: "nom",
      label: "Nom",
      required: true,
      input: {
        props: {
          type: "text",
          placeholder: "Votre nom",
        },
        state: useFormInput(""),
      },
    },
    {
      id: "prenom",
      label: "Prenom",
      required: true,
      input: {
        props: {
          type: "text",
          placeholder: "Votre prenom",
        },
        state: useFormInput(""),
      },
    },
    {
      id: "email",
      label: "Email",
      required: true,
      input: {
        props: {
          type: "email",
          placeholder: "@gmail.com",
        },
        state: useFormInput(""),
      },
    },
    {
      id: "dtn",
      label: "Date de naissance",
      required: true,
      input: {
        props: {
          type: "date",
          placeholder: "",
        },
        state: useFormInput(""),
      },
    },
    {
      id: "mdp",
      label: "Mot de passe",
      required: true,
      input: {
        props: {
          type: "password",
          placeholder: "*********",
        },
        state: useFormInput(""),
      },
    },
  ];
};

export const useLoginFields = () => {
  return [
    {
      id: "email",
      label: "Email",
      required: true,
      input: {
        props: {
          type: "email",
          placeholder: "@gmail.com",
        },
        state: useFormInput(""),
      },
    },
    {
      id: "password",
      label: "Mot de passe",
      required: true,
      input: {
        props: {
          type: "password",
          placeholder: "*******",
        },
        state: useFormInput(""),
      },
    },
  ];
};
