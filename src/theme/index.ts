import { createAppTheme } from "./createAppTheme";

const getTheme = (mode: "light" | "dark") => createAppTheme(mode);

export default getTheme;
