import { useState, useEffect } from "react";

export function useGithubUserName() {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    setUsername(import.meta.env.VITE_USERNAME ?? "guilhermesenci");
  }, []);

  return username;
}
