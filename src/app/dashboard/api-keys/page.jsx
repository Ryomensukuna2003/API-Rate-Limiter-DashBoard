"use client"

import * as React from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Copy, MoreHorizontal } from "lucide-react"
import { createApiKey } from "@/app/actions"
import { CreateApiKeyForm } from "@/components/Layout/create-api-key-form"

const apiKeys = [

]

export default function ApiKeysTable() {
  const [selectedRows, setSelectedRows] = React.useState(0)
  const [keys, setKeys] = React.useState(apiKeys) // Initially use the static data

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }


  const handleDeleteKey = async (keyId) => {
    const formData = new FormData()
    formData.append("keyId", keyId)
    const result = await deleteApiKey(formData)

    if (result.success) {
      setKeys(prev => prev.filter(key => key.id !== keyId))
    } else {
      console.error(result.error)
    }
  }

  return (
    <div className="space-y-4 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">API Keys</h2>
        <CreateApiKeyForm setKeys={setKeys} />
      </div>
      {(keys.length === 0) &&
        <div className="p-4 text-gray-500 bg-card rounded-md">
          No API keys found. Click on the button above to create a new API key.
        </div>
      }
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>API Key</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {keys.map((item) => (
              <TableRow key={item.key}>
                <TableCell>{item.name}</TableCell>
                <TableCell className="font-mono">
                  <div className="flex items-center gap-2">
                    {item.key}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => copyToClipboard(item.key)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>{item.createdAt}</TableCell>
                <TableCell>{item.updatedAt}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${item.status === "active"
                      ? "bg-emerald-500/15 text-emerald-500"
                      : item.status === "inactive"
                        ? "bg-gray-500/15 text-gray-500"
                        : "bg-red-500/15 text-red-500"
                      }`}
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDeleteKey(item.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-gray-500">
          {selectedRows} of {keys.length} row(s) selected.
        </p>
        <div className="space-x-2">
          <Button variant="outline" size="sm">
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}