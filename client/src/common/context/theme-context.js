import { createContext } from "react";

export const ThemeContext = createContext({
   isMenuExpanded: true,
   toggleMenuExpansion: () => {},
});
