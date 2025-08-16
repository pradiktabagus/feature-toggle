"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog'
import CodeMirror from '@uiw/react-codemirror'
import { json } from '@codemirror/lang-json'
import { oneDark } from '@codemirror/theme-one-dark'

interface JsonViewerModalProps {
  open: boolean
  onClose: () => void
  value: string
  title?: string
}

export default function JsonViewerModal({ open, onClose, value, title = "JSON Value" }: JsonViewerModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="border rounded-md overflow-hidden">
          <CodeMirror
            value={value}
            height="60vh"
            width="100%"
            extensions={[json()]}
            theme={oneDark}
            editable={false}
            basicSetup={{
              lineNumbers: true,
              foldGutter: true,
              dropCursor: false,
              allowMultipleSelections: false,
              searchKeymap: true
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}