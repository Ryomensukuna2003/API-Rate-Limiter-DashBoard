"use client"

import * as React from "react"
import { Copy, MoreHorizontal } from 'lucide-react'
import { Button } from "@/components/ui/button";
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


const apiKeys = [
  {
    name: "Production API Key",
    key: "9e6d336a...af62",
    createdAt: "10 May 2024",
    updatedAt: "10 May 2025",
    status: "active",
  },
  {
    name: "Development API Key",
    key: "8a2d834b...4c24",
    createdAt: "15 Apr 2023",
    updatedAt: "15 Apr 2024",
    status: "inactive",
  },
  {
    name: "Development test",
    key: "4b6f472a...f5b6",
    createdAt: "1 Mar 2023",
    updatedAt: "1 Mar 2024",
    status: "active",
  },
  {
    name: "Production test",
    key: "d4e3b829...a42f",
    createdAt: "12 Dec 2022",
    updatedAt: "12 Dec 2023",
    status: "expired",
  },
]

export default function ApiKeysTable() {

  const [selectedRows, setSelectedRows] = React.useState(0)

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  return (

    <div className="space-y-4 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Api Keys</h2>
        <Button>+ Create Api Key</Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Api Key</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apiKeys.map((item) => (
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
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
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
          {selectedRows} of {apiKeys.length} row(s) selected.
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

