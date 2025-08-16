"use client";

import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { oneDark } from "@codemirror/theme-one-dark";
import { useTheme } from "next-themes";

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function JsonEditor({ value, onChange, placeholder, className }: JsonEditorProps) {
  const { theme } = useTheme();

  return (
    <div className={className}>
      <CodeMirror
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        extensions={[json()]}
        theme={theme === "dark" ? oneDark : undefined}
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          dropCursor: false,
          allowMultipleSelections: false,
          indentOnInput: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          highlightSelectionMatches: false,
        }}
        height="300px"
        style={{
          fontSize: '14px',
          maxHeight: '300px',
          overflow: 'auto'
        }}
      />
    </div>
  );
}