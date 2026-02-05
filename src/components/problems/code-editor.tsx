"use client";

import Editor, { OnChange } from "@monaco-editor/react";
import { Loader } from "lucide-react";

interface CodeEditorProps {
  language: string;
  value: string;
  onChange: OnChange;
}

export function CodeEditor({ language, value, onChange }: CodeEditorProps) {
  const editorOptions = {
    fontSize: 14,
    padding: {
      top: 16,
      bottom: 16,
    },
    selectOnLineNumbers: true,
    minimap: {
      enabled: false,
    },
    scrollBeyondLastLine: false,
    automaticLayout: true,
  };

  return (
    <div className="h-full w-full">
      <Editor
        height="100%"
        language={language}
        theme="vs-dark"
        value={value}
        options={editorOptions}
        onChange={onChange}
        loading={<Loader className="animate-spin" />}
      />
    </div>
  );
}
