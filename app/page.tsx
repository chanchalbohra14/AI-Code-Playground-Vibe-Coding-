"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wand2, Copy, Play } from "lucide-react"

const templates = {
  ecommerce: `<!DOCTYPE html>
<html>
<head>
    <title>TechStore</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; }
        .header { background: #fff; box-shadow: 0 2px 5px rgba(0,0,0,0.1); padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.5rem; font-weight: bold; color: #667eea; }
        .cart-btn { background: #667eea; color: white; border: none; padding: 0.5rem 1rem; border-radius: 20px; cursor: pointer; }
        .hero { background: linear-gradient(135deg, #667eea, #764ba2); color: white; text-align: center; padding: 4rem 2rem; }
        .hero h1 { font-size: 2.5rem; margin-bottom: 1rem; }
        .hero p { font-size: 1.1rem; margin-bottom: 2rem; }
        .cta { background: white; color: #667eea; padding: 1rem 2rem; text-decoration: none; border-radius: 25px; font-weight: bold; }
        .products { padding: 3rem 2rem; max-width: 1200px; margin: 0 auto; }
        .products h2 { text-align: center; font-size: 2rem; margin-bottom: 2rem; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; }
        .card { background: white; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); overflow: hidden; transition: transform 0.3s; }
        .card:hover { transform: translateY(-5px); }
        .card-img { height: 150px; background: #f0f0f0; display: flex; align-items: center; justify-content: center; font-size: 2rem; }
        .card-body { padding: 1rem; }
        .card-title { font-size: 1.1rem; font-weight: bold; margin-bottom: 0.5rem; }
        .card-price { color: #667eea; font-size: 1.3rem; font-weight: bold; margin-bottom: 0.5rem; }
        .card-desc { color: #666; font-size: 0.9rem; margin-bottom: 1rem; }
        .add-btn { width: 100%; background: #667eea; color: white; border: none; padding: 0.7rem; border-radius: 5px; cursor: pointer; }
        .add-btn:hover { background: #5a6fd8; }
        .footer { background: #333; color: white; text-align: center; padding: 2rem; }
    </style>
</head>
<body>
    <header class="header">
        <div class="logo">TechStore</div>
        <button class="cart-btn" onclick="alert('Cart: 0 items')">Cart (0)</button>
    </header>
    
    <section class="hero">
        <h1>Premium Electronics</h1>
        <p>Discover the latest technology</p>
        <a href="#products" class="cta">Shop Now</a>
    </section>
    
    <section class="products" id="products">
        <h2>Featured Products</h2>
        <div class="grid">
            <div class="card">
                <div class="card-img">🎧</div>
                <div class="card-body">
                    <div class="card-title">Wireless Headphones</div>
                    <div class="card-price">$199.99</div>
                    <div class="card-desc">Premium noise-canceling headphones</div>
                    <button class="add-btn" onclick="alert('Added to cart!')">Add to Cart</button>
                </div>
            </div>
            <div class="card">
                <div class="card-img">⌚</div>
                <div class="card-body">
                    <div class="card-title">Smart Watch</div>
                    <div class="card-price">$299.99</div>
                    <div class="card-desc">Advanced fitness tracking</div>
                    <button class="add-btn" onclick="alert('Added to cart!')">Add to Cart</button>
                </div>
            </div>
            <div class="card">
                <div class="card-img">💻</div>
                <div class="card-body">
                    <div class="card-title">Laptop Pro</div>
                    <div class="card-price">$1,299.99</div>
                    <div class="card-desc">High-performance laptop</div>
                    <button class="add-btn" onclick="alert('Added to cart!')">Add to Cart</button>
                </div>
            </div>
        </div>
    </section>
    
    <footer class="footer">
        <p>&copy; 2024 TechStore. All rights reserved.</p>
    </footer>
</body>
</html>`,

  login: `<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; background: linear-gradient(135deg, #667eea, #764ba2); min-height: 100vh; display: flex; align-items: center; justify-content: center; }
        .container { background: white; padding: 2rem; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); width: 100%; max-width: 400px; }
        h2 { text-align: center; margin-bottom: 2rem; color: #333; }
        .form-group { margin-bottom: 1rem; }
        label { display: block; margin-bottom: 0.5rem; color: #555; }
        input { width: 100%; padding: 0.8rem; border: 2px solid #ddd; border-radius: 8px; font-size: 1rem; }
        input:focus { outline: none; border-color: #667eea; }
        .btn { width: 100%; padding: 0.8rem; background: linear-gradient(45deg, #667eea, #764ba2); color: white; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer; margin-top: 1rem; }
        .btn:hover { opacity: 0.9; }
        .forgot { text-align: center; margin-top: 1rem; }
        .forgot a { color: #667eea; text-decoration: none; }
    </style>
</head>
<body>
    <div class="container">
        <h2>Welcome Back</h2>
        <form onsubmit="handleLogin(event)">
            <div class="form-group">
                <label>Email</label>
                <input type="email" required placeholder="Enter your email">
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" required placeholder="Enter your password">
            </div>
            <button type="submit" class="btn">Sign In</button>
        </form>
        <div class="forgot">
            <a href="#" onclick="alert('Password reset!')">Forgot Password?</a>
        </div>
    </div>
    <script>
        function handleLogin(event) {
            event.preventDefault();
            alert('Login successful!');
        }
    </script>
</body>
</html>`,

  landing: `<!DOCTYPE html>
<html>
<head>
    <title>Landing Page</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; }
        .hero { background: linear-gradient(135deg, #667eea, #764ba2); color: white; text-align: center; padding: 5rem 2rem; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; }
        .hero h1 { font-size: 3rem; margin-bottom: 1rem; }
        .hero p { font-size: 1.2rem; margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto; }
        .cta { display: inline-block; background: white; color: #667eea; padding: 1rem 2rem; text-decoration: none; border-radius: 25px; font-weight: bold; }
        .cta:hover { transform: translateY(-2px); }
        .features { padding: 4rem 2rem; background: #f8f9fa; }
        .container { max-width: 1200px; margin: 0 auto; text-align: center; }
        .features h2 { font-size: 2.5rem; margin-bottom: 3rem; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
        .feature { background: white; padding: 2rem; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
        .feature-icon { font-size: 3rem; margin-bottom: 1rem; }
        .feature h3 { margin-bottom: 1rem; }
    </style>
</head>
<body>
    <section class="hero">
        <h1>Build Something Amazing</h1>
        <p>Transform your ideas into reality with our powerful platform</p>
        <a href="#features" class="cta">Get Started</a>
    </section>
    
    <section class="features" id="features">
        <div class="container">
            <h2>Why Choose Us?</h2>
            <div class="grid">
                <div class="feature">
                    <div class="feature-icon">⚡</div>
                    <h3>Lightning Fast</h3>
                    <p>Built for speed and performance</p>
                </div>
                <div class="feature">
                    <div class="feature-icon">🔒</div>
                    <h3>Secure</h3>
                    <p>Enterprise-grade security</p>
                </div>
                <div class="feature">
                    <div class="feature-icon">🚀</div>
                    <h3>Scalable</h3>
                    <p>Grows with your business</p>
                </div>
            </div>
        </div>
    </section>
</body>
</html>`,
}

export default function CodePlayground() {
  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html>
<head>
    <title>Code Playground</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: linear-gradient(135deg, #667eea, #764ba2); min-height: 100vh; display: flex; align-items: center; justify-content: center; }
        .container { background: white; padding: 2rem; border-radius: 15px; text-align: center; max-width: 500px; }
        h1 { color: #333; margin-bottom: 1rem; }
        p { color: #666; margin-bottom: 2rem; }
        .btn { background: linear-gradient(45deg, #667eea, #764ba2); color: white; border: none; padding: 1rem 2rem; border-radius: 25px; cursor: pointer; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Code Playground!</h1>
        <p>Start coding and see your changes live</p>
        <button class="btn" onclick="alert('Hello!')">Click Me!</button>
    </div>
</body>
</html>`)

  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const generateCode = () => {
    if (!prompt.trim()) return

    setIsGenerating(true)

    setTimeout(() => {
      const lowerPrompt = prompt.toLowerCase()

      if (lowerPrompt.includes("ecommerce") || lowerPrompt.includes("shop") || lowerPrompt.includes("store")) {
        setHtmlCode(templates.ecommerce)
      } else if (lowerPrompt.includes("login") || lowerPrompt.includes("form")) {
        setHtmlCode(templates.login)
      } else if (lowerPrompt.includes("landing") || lowerPrompt.includes("hero")) {
        setHtmlCode(templates.landing)
      } else {
        setHtmlCode(`<!DOCTYPE html>
<html>
<head>
    <title>Generated: ${prompt}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: linear-gradient(135deg, #667eea, #764ba2); min-height: 100vh; display: flex; align-items: center; justify-content: center; }
        .container { background: white; padding: 2rem; border-radius: 15px; text-align: center; max-width: 600px; }
        h1 { color: #333; margin-bottom: 1rem; }
        .prompt { background: #f0f0f0; padding: 1rem; border-radius: 8px; margin: 1rem 0; }
        .btn { background: linear-gradient(45deg, #667eea, #764ba2); color: white; border: none; padding: 1rem 2rem; border-radius: 25px; cursor: pointer; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Template Generated!</h1>
        <div class="prompt">Request: "${prompt}"</div>
        <p>Try: "ecommerce website", "login form", or "landing page"</p>
        <button class="btn" onclick="alert('Working!')">Test Button</button>
    </div>
</body>
</html>`)
      }

      setIsGenerating(false)
    }, 800)
  }

  const copyCode = () => {
    navigator.clipboard?.writeText(htmlCode)
    alert("Code copied!")
  }

  const runCode = () => {
    const newWindow = window.open()
    if (newWindow) {
      newWindow.document.write(htmlCode)
      newWindow.document.close()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            AI Code Playground
          </h1>
          <p className="text-gray-600">Generate and edit code templates</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-purple-600" />
              Template Generator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Try: ecommerce website, login form, landing page"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && generateCode()}
                className="flex-1"
              />
              <Button
                onClick={generateCode}
                disabled={isGenerating || !prompt.trim()}
                className="bg-gradient-to-r from-purple-600 to-blue-600"
              >
                {isGenerating ? "..." : "Generate"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Code Editor</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyCode}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button size="sm" onClick={runCode} className="bg-green-600 hover:bg-green-700">
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <textarea
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                className="w-full h-[500px] p-4 font-mono text-sm bg-gray-50 border-0 resize-none focus:outline-none rounded-b-lg"
                spellCheck={false}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="border rounded-b-lg overflow-hidden">
                <iframe
                  className="w-full h-[500px] bg-white"
                  srcDoc={htmlCode}
                  title="Preview"
                  sandbox="allow-scripts"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Quick Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {["ecommerce website", "login form", "landing page", "todo app", "pricing table", "contact form"].map(
                (template) => (
                  <Button
                    key={template}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setPrompt(template)
                      setTimeout(generateCode, 100)
                    }}
                    className="justify-start"
                    disabled={isGenerating}
                  >
                    {template}
                  </Button>
                ),
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
