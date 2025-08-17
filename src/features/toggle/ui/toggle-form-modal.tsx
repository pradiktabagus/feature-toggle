"use client";

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { Textarea } from '@/shared/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'
import { Switch } from '@/shared/components/ui/switch'
import { useCreateToggleForm } from '../model/use-create-form'
import { ToggleData, ToggleFormMode } from '../model/types'
import { CreateToggleRequest } from '@/shared/api'
import CodeMirror from '@uiw/react-codemirror'
import { json } from '@codemirror/lang-json'
import { oneDark } from '@codemirror/theme-one-dark'

interface ToggleFormModalProps {
  mode: ToggleFormMode
  open: boolean
  data?: ToggleData
  onClose: () => void
  onSubmit: (data: CreateToggleRequest) => void
}

export default function ToggleFormModal({ mode, open, data, onClose, onSubmit }: ToggleFormModalProps) {
  const { form, handleSubmit } = useCreateToggleForm()
  const selectedType = form.watch('type')
  
  // Set default values when editing
  React.useEffect(() => {
    if (open) {
      if (mode === 'edit' && data) {
        form.reset({
          name: data.name,
          description: data.description || '',
          type: data.type,
          value: typeof data.value === 'string' ? data.value : JSON.stringify(data.value, null, 2)
        })
      } else if (mode === 'create') {
        form.reset({
          name: '',
          description: '',
          type: 'STRING',
          value: ''
        })
      }
    }
  }, [mode, data, open, form])
  
  const validateJSON = (value: string) => {
    if (selectedType === 'JSON') {
      try {
        JSON.parse(value)
        return true
      } catch {
        return 'Invalid JSON format'
      }
    }
    return true
  }

  const renderValueInput = () => {
    switch (selectedType) {
      case 'BOOLEAN':
        const currentValue = form.getValues('value')
        const isChecked = currentValue === 'true' || currentValue === 'True' || String(currentValue) === 'true'
        return (
          <div className="flex items-center space-x-2">
            <Switch
              checked={isChecked}
              onCheckedChange={(checked) => {
                form.setValue('value', checked.toString())
                form.clearErrors('value')
              }}
            />
            <Label>Toggle Value ({isChecked ? 'True' : 'False'})</Label>
          </div>
        )
      case 'NUMBER':
        return (
          <Input
            type="number"
            placeholder="Enter number value"
            {...form.register('value')}
          />
        )
      case 'JSON':
        return (
          <div className="space-y-2">
            <div className="border rounded-md overflow-hidden">
              <CodeMirror
                value={form.getValues('value')}
                height="200px"
                width="100%"
                extensions={[json()]}
                theme={oneDark}
                onChange={(value) => {
                  form.setValue('value', value)
                  // Validate JSON on change
                  const validation = validateJSON(value)
                  if (validation !== true) {
                    form.setError('value', { message: validation })
                  } else {
                    form.clearErrors('value')
                  }
                }}
                placeholder='{"key": "value"}'
                basicSetup={{
                  lineNumbers: true,
                  foldGutter: false,
                  dropCursor: false,
                  allowMultipleSelections: false
                }}
              />
            </div>
            <p className="text-xs text-gray-500">Enter valid JSON format</p>
          </div>
        )
      default:
        return (
          <Input
            placeholder="Enter string value"
            {...form.register('value')}
          />
        )
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        form.reset()
        form.clearErrors()
        onClose()
      }
    }}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Create Toggle' : 'Edit Toggle'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit, onClose)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Feature Flag Name"
              {...form.register('name')}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-600">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe what this toggle controls"
              {...form.register('description')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select
              value={form.getValues('type') || 'STRING'}
              onValueChange={(value) => {
                const currentType = form.getValues('type')
                form.setValue('type', value as 'STRING' | 'NUMBER' | 'BOOLEAN' | 'JSON')
                
                // Reset value when type changes
                if (currentType !== value) {
                  if (value === 'BOOLEAN') {
                    form.setValue('value', 'false')
                  } else if (value === 'JSON') {
                    form.setValue('value', '{}')
                  } else {
                    form.setValue('value', '')
                  }
                }
                form.clearErrors('value')
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="STRING">String</SelectItem>
                <SelectItem value="NUMBER">Number</SelectItem>
                <SelectItem value="BOOLEAN">Boolean</SelectItem>
                <SelectItem value="JSON">JSON</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Value</Label>
            {renderValueInput()}
            {form.formState.errors.value && (
              <p className="text-sm text-red-600">{form.formState.errors.value.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => {
              form.reset()
              form.clearErrors()
              onClose()
            }}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === 'create' ? 'Create' : 'Update'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}