import React from "react";
import { NotesStore } from "../mobx/NotesStore";
import { fetchNotes } from "../api";

type RootStateContextValue = {
  notesStore: NotesStore;
};

const RootStateContext = React.createContext<RootStateContextValue>(
  {} as RootStateContextValue
);

const notesStore = new NotesStore();

export const RootStateProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <RootStateContext.Provider value={{ notesStore }}>
      {children}
    </RootStateContext.Provider>
  );
};

export const useRootStore = () => {
  return React.useContext(RootStateContext);
};

// export default notesStore;
