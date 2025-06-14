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
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (iframeRef.current) {
      try {
        const iframe = iframeRef.current
        iframe.srcdoc = htmlCode
      } catch (error) {
        console.log("Preview update skipped due to environment constraints")
      }
    }
  }, [htmlCode])

  const generateCode = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    try {
      // Simulate API call with fallback templates
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ok: true,
            json: () =>
              Promise.resolve({
                success: true,
                code: getTemplateCode(prompt),
                message: "Generated using template",
              }),
          })
        }, 1000)
      })

      const data = await (response as any).json()

      if (data.success && data.code) {
        setHtmlCode(data.code)
      }
    } catch (error) {
      console.error("Error generating code:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const getTemplateCode = (prompt: string): string => {
    const lowerPrompt = prompt.toLowerCase()

    // Ecommerce template
    if (lowerPrompt.includes("ecommerce") || lowerPrompt.includes("shop") || lowerPrompt.includes("store")) {
      return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechStore - Premium Electronics</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
        .header { background: #fff; box-shadow: 0 2px 10px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 100; }
        .nav { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; }
        .logo { font-size: 1.8rem; font-weight: bold; background: linear-gradient(45deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .nav-links { display: flex; list-style: none; gap: 2rem; }
        .nav-links a { text-decoration: none; color: #333; font-weight: 500; transition: color 0.3s ease; }
        .nav-links a:hover { color: #667eea; }
        .cart-btn { background: linear-gradient(45deg, #667eea, #764ba2); color: white; border: none; padding: 0.5rem 1rem; border-radius: 25px; cursor: pointer; font-weight: 600; }
        .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-align: center; padding: 4rem 2rem; }
        .hero h1 { font-size: 3rem; margin-bottom: 1rem; }
        .hero p { font-size: 1.2rem; margin-bottom: 2rem; }
        .cta-button { display: inline-block; background: white; color: #667eea; padding: 1rem 2rem; text-decoration: none; border-radius: 50px; font-weight: bold; transition: all 0.3s ease; }
        .cta-button:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(0,0,0,0.2); }
        .products { max-width: 1200px; margin: 4rem auto; padding: 0 2rem; }
        .products h2 { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; color: #333; }
        .product-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
        .product-card { background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); transition: all 0.3s ease; cursor: pointer; }
        .product-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.15); }
        .product-image { height: 200px; background: linear-gradient(45deg, #f0f0f0, #e0e0e0); display: flex; align-items: center; justify-content: center; font-size: 3rem; color: #999; }
        .product-info { padding: 1.5rem; }
        .product-title { font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem; color: #333; }
        .product-price { font-size: 1.5rem; font-weight: bold; color: #667eea; margin-bottom: 1rem; }
        .product-description { color: #666; margin-bottom: 1rem; font-size: 0.9rem; }
        .add-to-cart { width: 100%; background: linear-gradient(45deg, #667eea, #764ba2); color: white; border: none; padding: 0.75rem; border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.3s ease; }
        .add-to-cart:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3); }
        .footer { background: #333; color: white; text-align: center; padding: 2rem; margin-top: 4rem; }
        .cart-count { background: #ff6b6b; color: white; border-radius: 50%; padding: 0.2rem 0.5rem; font-size: 0.8rem; margin-left: 0.5rem; }
        @media (max-width: 768px) { .nav-links { display: none; } .hero h1 { font-size: 2rem; } .products { padding: 0 1rem; } }
    </style>
</head>
<body>
    <header class="header">
        <nav class="nav">
            <div class="logo">TechStore</div>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#products">Products</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            <button class="cart-btn" onclick="showCart()">Cart <span class="cart-count" id="cartCount">0</span></button>
        </nav>
    </header>
    <section class="hero">
        <h1>Premium Electronics Store</h1>
        <p>Discover the latest technology with unbeatable prices and quality</p>
        <a href="#products" class="cta-button">Shop Now</a>
    </section>
    <section class="products" id="products">
        <h2>Featured Products</h2>
        <div class="product-grid">
            <div class="product-card">
                <div class="product-image">🎧</div>
                <div class="product-info">
                    <div class="product-title">Wireless Headphones</div>
                    <div class="product-price">$199.99</div>
                    <div class="product-description">Premium noise-canceling wireless headphones with 30-hour battery life.</div>
                    <button class="add-to-cart" onclick="addToCart('Wireless Headphones', 199.99)">Add to Cart</button>
                </div>
            </div>
            <div class="product-card">
                <div class="product-image">⌚</div>
                <div class="product-info">
                    <div class="product-title">Smart Watch</div>
                    <div class="product-price">$299.99</div>
                    <div class="product-description">Advanced fitness tracking with heart rate monitor and GPS.</div>
                    <button class="add-to-cart" onclick="addToCart('Smart Watch', 299.99)">Add to Cart</button>
                </div>
            </div>
            <div class="product-card">
                <div class="product-image">💻</div>
                <div class="product-info">
                    <div class="product-title">Laptop Pro</div>
                    <div class="product-price">$1,299.99</div>
                    <div class="product-description">High-performance laptop with 16GB RAM and 512GB SSD storage.</div>
                    <button class="add-to-cart" onclick="addToCart('Laptop Pro', 1299.99)">Add to Cart</button>
                </div>
            </div>
        </div>
    </section>
    <footer class="footer">
        <p>&copy; 2024 TechStore. All rights reserved. | Free shipping on orders over $100</p>
    </footer>
    <script>
        let cart = []; let cartCount = 0;
        function addToCart(productName, price) {
            cart.push({name: productName, price: price, id: Date.now()});
            cartCount++; document.getElementById('cartCount').textContent = cartCount;
            alert(productName + ' added to cart!');
        }
        function showCart() {
            if (cart.length === 0) { alert('Your cart is empty!'); return; }
            let cartSummary = 'Your Cart:\\n\\n'; let total = 0;
            cart.forEach(item => { cartSummary += item.name + ' - $' + item.price + '\\n'; total += item.price; });
            cartSummary += '\\nTotal: $' + total.toFixed(2); alert(cartSummary);
        }
    </script>
</body>
</html>`
    }

    // Login form
    if (lowerPrompt.includes("login") || lowerPrompt.includes("form")) {
      return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Form</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .login-container { background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); padding: 40px; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); width: 100%; max-width: 400px; }
        h2 { text-align: center; color: #333; margin-bottom: 30px; font-size: 2rem; }
        .form-group { margin-bottom: 20px; }
        label { display: block; margin-bottom: 8px; color: #555; font-weight: 500; }
        input { width: 100%; padding: 15px; border: 2px solid #e1e5e9; border-radius: 10px; font-size: 16px; transition: all 0.3s ease; }
        input:focus { outline: none; border-color: #667eea; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2); }
        .btn { width: 100%; padding: 15px; background: linear-gradient(45deg, #667eea, #764ba2); color: white; border: none; border-radius: 10px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; margin-top: 10px; }
        .btn:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3); }
    </style>
</head>
<body>
    <div class="login-container">
        <h2>Welcome Back</h2>
        <form onsubmit="handleLogin(event)">
            <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" required placeholder="Enter your email">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" required placeholder="Enter your password">
            </div>
            <button type="submit" class="btn">Sign In</button>
        </form>
    </div>
    <script>
        function handleLogin(event) {
            event.preventDefault();
            alert('Login successful! (This is a demo)');
        }
    </script>
</body>
</html>`
    }

    // Landing page
    if (lowerPrompt.includes("landing") || lowerPrompt.includes("hero")) {
      return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Landing Page</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', sans-serif; line-height: 1.6; }
        .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-align: center; padding: 100px 20px; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; }
        .hero h1 { font-size: clamp(2.5rem, 5vw, 4rem); margin-bottom: 20px; font-weight: 700; }
        .hero p { font-size: clamp(1.1rem, 2vw, 1.3rem); margin-bottom: 40px; max-width: 600px; margin-left: auto; margin-right: auto; }
        .cta-button { display: inline-block; padding: 15px 30px; background: white; color: #667eea; text-decoration: none; border-radius: 50px; font-weight: bold; transition: all 0.3s ease; }
        .cta-button:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(0,0,0,0.2); }
        .features { padding: 80px 20px; background: #f8f9fa; }
        .features-container { max-width: 1200px; margin: 0 auto; text-align: center; }
        .features h2 { font-size: 2.5rem; margin-bottom: 50px; color: #333; }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; }
        .feature-card { background: white; padding: 40px 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); transition: transform 0.3s ease; }
        .feature-card:hover { transform: translateY(-10px); }
        .feature-icon { width: 60px; height: 60px; background: linear-gradient(45deg, #667eea, #764ba2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 24px; color: white; }
    </style>
</head>
<body>
    <section class="hero">
        <h1>Build Something Amazing</h1>
        <p>Transform your ideas into reality with our powerful platform.</p>
        <a href="#" class="cta-button" onclick="alert('Get Started!')">Get Started Free</a>
    </section>
    <section class="features">
        <div class="features-container">
            <h2>Why Choose Us?</h2>
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">⚡</div>
                    <h3>Lightning Fast</h3>
                    <p>Built for speed and performance.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🔒</div>
                    <h3>Secure & Reliable</h3>
                    <p>Enterprise-grade security.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🚀</div>
                    <h3>Easy to Scale</h3>
                    <p>Grow seamlessly.</p>
                </div>
            </div>
        </div>
    </section>
</body>
</html>`
    }

    // Default template
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Code</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; margin: 0; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; display: flex; align-items: center; justify-content: center; }
        .container { background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); padding: 40px; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); text-align: center; max-width: 600px; }
        h1 { color: #333; margin-bottom: 20px; font-size: 2.5rem; background: linear-gradient(45deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .prompt-display { background: #f8f9fa; padding: 20px; border-radius: 10px; border-left: 4px solid #667eea; margin: 20px 0; }
        .btn { background: linear-gradient(45deg, #667eea, #764ba2); color: white; border: none; padding: 15px 30px; border-radius: 50px; font-size: 1.1em; cursor: pointer; transition: transform 0.3s ease; margin-top: 20px; }
        .btn:hover { transform: translateY(-2px); }
    </style>
</head>
<body>
    <div class="container">
        <h1>Code Template</h1>
        <div class="prompt-display"><strong>Your request:</strong> "${prompt}"</div>
        <p>Template generated successfully! Try "ecommerce website", "login form", or "landing page" for specialized templates.</p>
        <button class="btn" onclick="alert('Template working!')">Test Button</button>
    </div>
</body>
</html>`
  }

  const copyCode = () => {
    try {
      navigator.clipboard.writeText(htmlCode)
      alert("Code copied to clipboard!")
    } catch (error) {
      console.log("Copy functionality limited in this environment")
    }
  }

  const downloadCode = () => {
    try {
      const blob = new Blob([htmlCode], { type: "text/html" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "playground-code.html"
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.log("Download functionality limited in this environment")
    }
  }

  const runCode = () => {
    if (iframeRef.current) {
      try {
        iframeRef.current.srcdoc = htmlCode
      } catch (error) {
        console.log("Preview update limited in this environment")
      }
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI Code Playground
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Code, create, and experiment with templates</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setIsPlaying(!isPlaying)}>
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
              Template Generator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Describe what you want to build (e.g., 'ecommerce website')"
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
                "ecommerce website",
                "login form",
                "landing page",
                "todo app",
                "pricing table",
                "contact form",
                "image gallery",
                "dashboard layout",
              ].map((template) => (
                <Button
                  key={template}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setPrompt(template)
                    setTimeout(() => generateCode(), 100)
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
