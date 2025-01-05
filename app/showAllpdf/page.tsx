'use client'

import React, { useEffect, useState } from 'react'

interface File {
  name: string
  path: string
}

export default function ShowAllTxtFiles() {
  const [txtFiles, setTxtFiles] = useState<File[]>([]) // Store file details as an array of objects
  const [loading, setLoading] = useState(false) // Loading state
  const [error, setError] = useState<string | null>(null) // Error state
  const [searchQuery, setSearchQuery] = useState<string>('') // Search query input
  const [searchLoading, setSearchLoading] = useState(false) // Loading state for search

  useEffect(() => {
    // Fetch all text files on component mount
    const fetchTxtFiles = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:7000/api/v1/text/all-txt-file')
        if (!response.ok) {
          throw new Error('Failed to fetch text files')
        }
        const data = await response.json()
        setTxtFiles(data.files) // Set the `files` array from the API response
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTxtFiles()
  }, [])

  const handleSearch = async () => {
    // Search text files by query
    if (!searchQuery.trim()) {
      alert('Please enter a search term')
      return
    }

    try {
      setSearchLoading(true)
      setError(null)
      const response = await fetch(`http://localhost:7000/api/v1/text/search?fileName=${searchQuery}`)
      if (!response.ok) {
        throw new Error('Failed to search text files')
      }
      const data = await response.json()

      if (data.data && data.data.length > 0) {
        const files = data.data.map((item: any) => ({
          name: item.textFilePath.split('/').pop(), // Extract file name from path
          path: item.textFilePath,
        }))
        setTxtFiles(files) // Update the file list with search results
      } else {
        setTxtFiles([]) // Clear file list if no results found
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSearchLoading(false)
    }
  }

  if (loading) return <p>Loading text files...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Show All Text Files</h1>

      {/* Search Bar */}
      <div className="mb-4 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search by file name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={searchLoading}
        >
          {searchLoading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* File List */}
      <div className="space-y-2">
        {txtFiles.length > 0 ? (
          txtFiles.map((file, index) => (
            <div key={index}>
              <a
                href={`http://localhost:7000${file.path}`} // Full URL for file access
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {file.name}
              </a>
            </div>
          ))
        ) : (
          <p>No text files found.</p>
        )}
      </div>
    </div>
  )
}
