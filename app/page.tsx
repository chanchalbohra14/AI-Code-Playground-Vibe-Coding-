"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Wand2, Moon, Sun, Volume2, VolumeX, Copy, Download } from "lucide-react"
import { useTheme } from "next-themes"

const defaultHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Playground</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 500px;
        }
        h1 {
            color: #333;
            margin-bottom: 20px;
            font-size: 2.5em;
        }
        p {
            color: #666;
            font-size: 1.2em;
            line-height: 1.6;
        }
        .btn {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 50px;
            font-size: 1.1em;
            cursor: pointer;
            transition: transform 0.3s ease;
            margin-top: 20px;
        }
        .btn:hover {
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Code Playground!</h1>
        <p>Start coding and see your changes live. Use the AI assistant to generate code based on your ideas.</p>
        <button class="btn" onclick="alert('Hello from the playground!')">Click Me!</button>
    </div>
</body>
</html>`

export default function CodePlayground() {
  const [htmlCode, setHtmlCode] = useState(defaultHTML)
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current
      iframe.srcdoc = htmlCode
    }
  }, [htmlCode])

  const generateCode = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      const data = await response.json()

      if (data.success && data.code) {
        setHtmlCode(data.code)

        // Show message about the generation method
        if (data.message && data.message.includes("template")) {
          // Optional: You can show a toast notification here
          console.log(data.message)
        }
      } else {
        alert("Failed to generate code. Please try again.")
      }
    } catch (error) {
      console.error("Error generating code:", error)
      alert("Network error. Please check your connection and try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const copyCode = () => {
    navigator.clipboard.writeText(htmlCode)
  }

  const downloadCode = () => {
    const blob = new Blob([htmlCode], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "playground-code.html"
    a.click()
    URL.revokeObjectURL(url)
  }

  const runCode = () => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = htmlCode
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <audio ref={audioRef} loop onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)}>
        <source src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" type="audio/wav" />
      </audio>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI Code Playground
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Code, create, and experiment with AI assistance</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={toggleMusic} className="relative">
              {isPlaying ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>

            <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* AI Prompt Section */}
        <Card className="mb-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-purple-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-purple-600" />
              AI Code Generator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Describe what you want to build (e.g., 'a login form with animations')"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && generateCode()}
                className="flex-1"
              />
              <Button
                onClick={generateCode}
                disabled={isGenerating || !prompt.trim()}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {isGenerating ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                ) : (
                  <Wand2 className="h-4 w-4" />
                )}
                Generate
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Editor and Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Editor */}
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-purple-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Code Editor</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyCode}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={downloadCode}>
                  <Download className="h-4 w-4" />
                </Button>
                <Button size="sm" onClick={runCode} className="bg-green-600 hover:bg-green-700">
                  <Play className="h-4 w-4" />
                  Run
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <textarea
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                className="w-full h-[600px] p-4 font-mono text-sm bg-gray-50 dark:bg-gray-900 border-0 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-b-lg"
                placeholder="Write your HTML, CSS, and JavaScript here..."
                spellCheck={false}
              />
            </CardContent>
          </Card>

          {/* Live Preview */}
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-purple-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-b-lg overflow-hidden">
                <iframe
                  ref={iframeRef}
                  className="w-full h-[600px] bg-white"
                  title="Code Preview"
                  sandbox="allow-scripts allow-same-origin"
                  srcDoc={htmlCode}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Templates */}
        <Card className="mt-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-purple-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle>Quick Start Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                "Login form with animations",
                "Landing page with hero section",
                "Todo list app",
                "Card component gallery",
                "Pricing table",
                "Contact form",
                "Image gallery",
                "Dashboard layout",
              ].map((template) => (
                <Button
                  key={template}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setPrompt(template)
                    generateCode()
                  }}
                  className="text-left justify-start h-auto p-3 hover:bg-purple-50 dark:hover:bg-gray-700"
                  disabled={isGenerating}
                >
                  {template}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
