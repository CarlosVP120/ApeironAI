import { useCallback } from "react";
import { useState } from "react";
import Loading from "./Loading";
import styles from "../styles/styles.module.css";

export default function ArticleOutline() {
  const code = ``;

  const [value, setValue] = useState(code);
  const [prompt, setPrompt] = useState("");
  const [completion, setCompletion] = useState("");

  const handleTab = (e) => {
    if (e.keyCode === 9) {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      e.target.value =
        e.target.value.substring(0, start) +
        "\t" +
        e.target.value.substring(end);
      e.target.selectionStart = e.target.selectionEnd = start + 1;
      setValue(e.target.value);
    }
  };

  const handleInput = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const askName = "Explain me this code:";

  const handleClick = useCallback(
    async (e) => {
      setPrompt(askName + value);
      setCompletion("Loading...");
      const response = await fetch("/api/hello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: askName + value }),
      });
      const data = await response.json().then((data) => {
        setCompletion(data.result.choices[0].text.replace(/^\s+|\s+$/g, ""));
      });
    },
    [value]
  );

  return (
    <div className="tw-w-full tw-h-[100vh] tw-bg-white tw-text-black tw-flex tw-justify-center tw-overflow-hidden">
      <div className="tw-h-full tw-w-full tw-flex tw-flex-col tw-justify-center ">
        <h1>Article Outline</h1>
      </div>
    </div>
  );
}
