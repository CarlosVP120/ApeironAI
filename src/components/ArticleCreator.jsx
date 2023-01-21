import { useCallback } from "react";
import { useState, useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

export default function ArticleEditor() {
  const code = ``;

  const [value, setValue] = useState(code);
  const [prompt, setPrompt] = useState("");
  const [completion, setCompletion] = useState("");
  const { quill, quillRef } = useQuill();
  const [valueEditor, setValueEditor] = useState();

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        console.log(quillRef.current.firstChild.innerHTML);
        setValueEditor(quillRef.current.firstChild.innerHTML);
      });
    }
  }, [quill]);

  console.log(valueEditor, "this is quill editor");

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

  const onClick = useCallback(() => {
    setValue("");
    setPrompt("");
    setCompletion("");
  }, []);

  return (
    <div className="tw-w-full tw-h-[100vh] tw-bg-white tw-text-black tw-flex tw-justify-center tw-overflow-hidden">
      <div className="tw-h-full tw-w-full tw-flex tw-flex-col tw-justify-center ">
        <div className="tw-w-full tw-h-full tw-flex tw-justify-center tw-pt-10 tw-px-10 tw-text-xl tw-rounded-lg ">
          <div style={{ width: 1200, height: 600 }}>
            <div ref={quillRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
