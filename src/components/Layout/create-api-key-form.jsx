"use client"

import * as React from "react"
import { Plus, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import generateApiKey from "generate-api-key"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function CreateApiKeyForm({ setKeys }) {
  const [name, setName] = React.useState('')
  const [ttl, setTTL] = React.useState(30)
  const [ttlUnit, setTTLUnit] = React.useState('days')
  const [endpoints, setEndpoints] = React.useState([
    {
      path: '',
      method: 'GET',
      rate: 100,
      time_unit: "minute",
      quota: 10000
    }
  ])
  const [open, setOpen] = React.useState(false)

  const addEndpoint = () => {
    setEndpoints([
      ...endpoints,
      {
        path: '',
        method: 'GET',
        rate: 100,
        time_unit: "minute",
        quota: 10000
      }
    ])
  }

  const removeEndpoint = (index) => {
    setEndpoints(endpoints.filter((_, i) => i !== index))
  }

  const updateEndpoint = (index, field, value) => {
    const newEndpoints = [...endpoints]
    newEndpoints[index] = { ...newEndpoints[index], [field]: value }
    setEndpoints(newEndpoints)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setKeys(keys => [
      ...keys,
      {
      name: name,
      key: generateApiKey(),
      createdAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      updatedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: "active",
      endpoints: endpoints
      }
    ])
    console.log({
      name,
      ttl: { value: ttl, unit: ttlUnit },
      endpoints
    })
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>+ Create API Key</Button>
      </SheetTrigger>
      <SheetContent className="w-[600px] sm:w-[940px]">
        <SheetHeader>
          <SheetTitle>Create New API Key</SheetTitle>
          <SheetDescription>
            Configure your API key settings. You can set multiple endpoints with different rate limits.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-6">
          <div className="space-y-2">
            <Label htmlFor="name">API Key Name</Label>
            <Input
              id="name"
              placeholder="e.g., Production API Key"
              className="w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Endpoints</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addEndpoint}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Endpoint
              </Button>
            </div>
            {endpoints.map((endpoint, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 rounded-lg border p-4"
              >
                <div className="flex-1 space-y-4">
                  <div className="flex gap-4">
                    <div className="w-[100px]">
                      <Label htmlFor={`method-${index}`}>Method</Label>
                      <Select
                        value={endpoint.method}
                        onValueChange={(value) =>
                          updateEndpoint(index, 'method', value)
                        }
                      >
                        <SelectTrigger id={`method-${index}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="GET">GET</SelectItem>
                          <SelectItem value="POST">POST</SelectItem>
                          <SelectItem value="PUT">PUT</SelectItem>
                          <SelectItem value="DELETE">DELETE</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1">
                      <Label htmlFor={`path-${index}`}>Path</Label>
                      <Input
                        id={`path-${index}`}
                        placeholder="/api/v1/users"
                        value={endpoint.path}
                        onChange={(e) =>
                          updateEndpoint(index, 'path', e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="flex-row gap-4">
                    <div className="flex-1">
                      <Label htmlFor={`rate-${index}`}>Rate Limit</Label>
                      <div className="flex gap-2">
                        <Input
                          id={`rate-${index}`}
                          type="number"
                          placeholder="100"
                          value={endpoint.rate}
                          onChange={(e) =>
                            updateEndpoint(index, 'rate', parseInt(e.target.value))
                          }
                        />
                        <Select
                          value={endpoint.time_unit}
                          onValueChange={(value) =>
                            updateEndpoint(index, 'time_unit', value)
                          }
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="second">per second</SelectItem>
                            <SelectItem value="minute">per minute</SelectItem>
                            <SelectItem value="hour">per hour</SelectItem>
                            <SelectItem value="day">per day</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex-1">
                      <Label htmlFor={`quota-${index}`}>Quota</Label>
                      <Input
                        id={`quota-${index}`}
                        type="number"
                        placeholder="10000"
                        value={endpoint.quota}
                        onChange={(e) =>
                          updateEndpoint(index, 'quota', parseInt(e.target.value))
                        }
                      />
                    </div>
                  </div>
                </div>
                {endpoints.length > 1 && (
                  <div className="flex items-center">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeEndpoint(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ttl">Time to Live (TTL)</Label>
            <div className="flex gap-2">
              <Input
                id="ttl"
                type="number"
                placeholder="30"
                className="flex-1"
                value={ttl}
                onChange={(e) => setTTL(parseInt(e.target.value))}
              />
              <Select
                value={ttlUnit}
                onValueChange={setTTLUnit}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hours">Hours</SelectItem>
                  <SelectItem value="days">Days</SelectItem>
                  <SelectItem value="months">Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create API Key</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}