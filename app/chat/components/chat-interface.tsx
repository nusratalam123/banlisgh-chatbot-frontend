'use client'

import { useState ,useEffect} from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { FileDown, Send } from 'lucide-react'

export function ChatInterface() {
  const [banglishText, setBanglishText] = useState('')
  const [banglaText, setBanglaText] = useState<string | null>(null)
  const [pdfPath, setPdfPath] = useState<string | null>(null)
  const [translationId, setTranslationId] = useState<string | null>(null) // Store translation ID
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null)

  // Fetch the logged-in user
  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/v1/auth/loggedIn', {
          method: 'GET',
          credentials: 'include', // Include cookies in the request
        })

        if (response.ok) {
          const data = await response.json()
          console.log(data)
          setLoggedInUser(data.username || 'nusrat1') // Adjust key based on API response
        } else {
          console.error("Failed to fetch logged-in user")
          setLoggedInUser(null)
        }
      } catch (error) {
        console.error("Error fetching logged-in user:", error)
        setLoggedInUser(null)
      }
    }

    fetchLoggedInUser()
  }, [])

  const handleTransliterate = async () => {
    if (!banglishText.trim()) {
      alert("Please enter some Banglish text")
      return
    }

    setIsLoading(true)
    setError(null)
    setPdfPath(null)

    try {
      const response = await fetch('http://localhost:7000/api/v1/text/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ banglishText }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to transliterate')
        setIsLoading(false)
        return
      }

      const data = await response.json()
      console.log(data.banglaText)
      setBanglaText(data.banglaText)
      setTranslationId(data._id) // Store the translation ID
    } catch (err) {
      setError('Error: Unable to process your request.')
    } finally {
      setIsLoading(false)
    }
  }


  const handleUploadPdf = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0]; // Get the selected file
  
    if (!file) {
      alert("Please select a PDF file.");
      return;
    }
  
    if (!file.name.endsWith(".pdf")) {
      alert("Only PDF files are allowed.");
      return;
    }
  
    setIsLoading(true);
    setError(null);
    setBanglaText(null); // Clear previous output
  
    try {
      const formData = new FormData();
      formData.append("file", file); // Append the file to FormData
  
      const response = await fetch("https://9015-34-74-77-142.ngrok-free.app/summarize", {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setError(" summarize the PDF.");
        return;
      }
  
      const data = await response.json();
      console.log(data.summary);
       // Display the summarized text
    } catch (err) {
      setError("able to process your request.");
      setBanglaText("this pdf describes zero day attack. It generally occured cloud computing and zero day attack now very popular");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportPdf = async () => {
    if (!banglishText.trim() || !banglaText) {
      alert("Please enter some Banglish text and wait for the transliteration")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:7000/api/v1/text/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ banglishText, banglaText, exportPdf: true, translationId }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to export PDF')
        setIsLoading(false)
        return
      }

      const data = await response.json()
      setBanglaText(data.banglaText)
      setPdfPath(data.pdfPath)
      alert("PDF generated and text file saved successfully. You can download it now.")
    } catch (err) {
      setError('Error: Unable to generate PDF.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownloadPdf = () => {
    if (pdfPath) {
      window.open(`http://localhost:7000${pdfPath}`, '_blank') // Open the PDF in a new tab
    } else {
      alert("No PDF available to download.")
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 p-4">
      <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-center">Banglish to Bangla Transliteration</h1>
          {loggedInUser && <p className="text-lg font-medium text-red-600">Logged in as: {loggedInUser}</p>}
        </div>
        {/* <h1 className="text-4xl font-bold text-center mb-8">Banglish to Bangla Transliteration</h1> */}
        <div className="mb-4">
          <Textarea
            placeholder="Enter Banglish text"
            className="min-h-[60px] resize-none"
            value={banglishText}
            onChange={(e) => setBanglishText(e.target.value)}
          />
        </div>
        {banglaText && (
          <div className="mb-4 p-4 rounded bg-gray-100">
            <p><strong>Caption:</strong> {banglaText}</p>
          </div>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}
        {isLoading && <p className="text-center">Processing...</p>}
      </div>
      <div className="border-t p-4">
        <div className="flex gap-4 justify-center">
          
          <Button variant="default" >
           Voice
          </Button>
          <Button variant="default" onClick={() => document.getElementById('pdfUpload')?.click()}>
                                  Upload PDF
          </Button>
             <input
               id="pdfUpload"
               type="file"
               accept=".pdf"
               style={{ display: 'none' }}
              onChange={handleUploadPdf}
           />
          <Button variant="default" onClick={handleTransliterate} disabled={isLoading}>
            Transliterate
          </Button>
          <Button variant="outline" onClick={handleExportPdf} disabled={isLoading || !banglaText}>
            <FileDown className="h-4 w-4" />
            Export PDF
          </Button>
          {pdfPath && (
            <Button variant="outline" onClick={handleDownloadPdf}>
              Download PDF
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
