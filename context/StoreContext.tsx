import { createContext, useContext } from 'react';
import {NotesStore} from "../mobx/NotesStore";

export const StoreContext = createContext<NotesStore>({} as NotesStore);
export const StoreProvider = StoreContext.Provider;
export const useStore = (): NotesStore => useContext(StoreContext);