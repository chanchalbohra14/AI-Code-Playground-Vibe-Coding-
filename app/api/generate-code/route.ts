import type { NextRequest } from "next/server"

export const maxDuration = 30

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json()

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.log("OpenAI API key not found, using fallback templates")
      return Response.json({
        success: true,
        code: generateFallbackCode(prompt),
        message: "Generated using template (AI unavailable - add OPENAI_API_KEY to enable AI generation)",
      })
    }

    // Only import and use OpenAI if API key is available
    const { openai } = await import("@ai-sdk/openai")
    const { generateText } = await import("ai")

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: `You are an expert web developer. Generate clean, modern HTML/CSS/JavaScript code based on the user's request. 
      
      Rules:
      - Return complete, working code that can be rendered in an iframe
      - Include all necessary HTML structure with <!DOCTYPE html>
      - Use modern CSS with flexbox/grid for layouts
      - Include inline CSS in <style> tags and JavaScript in <script> tags
      - Make the design responsive and visually appealing
      - Use semantic HTML elements
      - Add hover effects and smooth transitions
      - Don't use external CDNs or libraries
      - Keep everything self-contained in a single HTML document`,
      prompt: `Create ${prompt}. Make it visually appealing with modern styling.`,
    })

    return Response.json({
      success: true,
      code: text,
      message: "Generated with AI",
    })
  } catch (error) {
    console.error("Error generating code:", error)

    const { prompt } = await req.json()
    return Response.json({
      success: true,
      code: generateFallbackCode(prompt),
      message: "Generated using template (AI generation failed)",
    })
  }
}

function generateFallbackCode(prompt: string): string {
  // Improved keyword matching
  const lowerPrompt = prompt.toLowerCase()

  // Login/Authentication
  if (
    lowerPrompt.includes("login") ||
    lowerPrompt.includes("sign in") ||
    lowerPrompt.includes("auth") ||
    lowerPrompt.includes("form")
  ) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Form</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .login-container {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            width: 100%;
            max-width: 400px;
            animation: slideUp 0.6s ease;
        }
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        h2 {
            text-align: center;
            color: #333;
            margin-bottom: 30px;
            font-size: 2rem;
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 8px;
            color: #555;
            font-weight: 500;
        }
        input {
            width: 100%;
            padding: 15px;
            border: 2px solid #e1e5e9;
            border-radius: 10px;
            font-size: 16px;
            transition: all 0.3s ease;
            background: rgba(255, 255, 255, 0.8);
        }
        input:focus {
            outline: none;
            border-color: #667eea;
            background: white;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);
        }
        .btn {
            width: 100%;
            padding: 15px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 10px;
        }
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }
        .forgot-password {
            text-align: center;
            margin-top: 20px;
        }
        .forgot-password a {
            color: #667eea;
            text-decoration: none;
            font-size: 14px;
        }
        .forgot-password a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <h2>Welcome Back</h2>
        <form onsubmit="handleLogin(event)">
            <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" name="email" required placeholder="Enter your email">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required placeholder="Enter your password">
            </div>
            <button type="submit" class="btn">Sign In</button>
        </form>
        <div class="forgot-password">
            <a href="#" onclick="alert('Password reset functionality would go here!')">Forgot your password?</a>
        </div>
    </div>
    
    <script>
        function handleLogin(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (email && password) {
                alert('Login successful! (This is a demo)');
            }
        }
    </script>
</body>
</html>`
  }
  // Landing page
  else if (lowerPrompt.includes("landing") || lowerPrompt.includes("hero") || lowerPrompt.includes("homepage")) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Landing Page</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            overflow-x: hidden;
        }
        .hero {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
            padding: 100px 20px;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
        }
        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="80" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="60" r="1" fill="rgba(255,255,255,0.1)"/></svg>');
            animation: float 20s infinite linear;
        }
        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            100% { transform: translateY(-100px) rotate(360deg); }
        }
        .hero-content {
            position: relative;
            z-index: 1;
        }
        .hero h1 {
            font-size: clamp(2.5rem, 5vw, 4rem);
            margin-bottom: 20px;
            animation: fadeInUp 1s ease;
            font-weight: 700;
        }
        .hero p {
            font-size: clamp(1.1rem, 2vw, 1.3rem);
            margin-bottom: 40px;
            animation: fadeInUp 1s ease 0.2s both;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }
        .cta-buttons {
            display: flex;
            gap: 20px;
            justify-content: center;
            flex-wrap: wrap;
            animation: fadeInUp 1s ease 0.4s both;
        }
        .cta-button {
            display: inline-block;
            padding: 15px 30px;
            background: white;
            color: #667eea;
            text-decoration: none;
            border-radius: 50px;
            font-weight: bold;
            transition: all 0.3s ease;
            border: 2px solid white;
        }
        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        .cta-button.secondary {
            background: transparent;
            color: white;
            border: 2px solid white;
        }
        .cta-button.secondary:hover {
            background: white;
            color: #667eea;
        }
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .features {
            padding: 80px 20px;
            background: #f8f9fa;
        }
        .features-container {
            max-width: 1200px;
            margin: 0 auto;
            text-align: center;
        }
        .features h2 {
            font-size: 2.5rem;
            margin-bottom: 50px;
            color: #333;
        }
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 40px;
            margin-top: 50px;
        }
        .feature-card {
            background: white;
            padding: 40px 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
        }
        .feature-card:hover {
            transform: translateY(-10px);
        }
        .feature-icon {
            width: 60px;
            height: 60px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            color: white;
        }
    </style>
</head>
<body>
    <section class="hero">
        <div class="hero-content">
            <h1>Build Something Amazing</h1>
            <p>Transform your ideas into reality with our powerful platform. Join thousands of creators who are already building the future.</p>
            <div class="cta-buttons">
                <a href="#" class="cta-button" onclick="alert('Get Started clicked!')">Get Started Free</a>
                <a href="#" class="cta-button secondary" onclick="alert('Learn More clicked!')">Learn More</a>
            </div>
        </div>
    </section>
    
    <section class="features">
        <div class="features-container">
            <h2>Why Choose Us?</h2>
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">⚡</div>
                    <h3>Lightning Fast</h3>
                    <p>Built for speed and performance. Get your projects up and running in minutes, not hours.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🔒</div>
                    <h3>Secure & Reliable</h3>
                    <p>Enterprise-grade security with 99.9% uptime guarantee. Your data is safe with us.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🚀</div>
                    <h3>Easy to Scale</h3>
                    <p>Grow from prototype to production seamlessly. Scale up or down based on your needs.</p>
                </div>
            </div>
        </div>
    </section>
</body>
</html>`
  }
  // Todo/Task management
  else if (lowerPrompt.includes("todo") || lowerPrompt.includes("task") || lowerPrompt.includes("list")) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo App</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 50px auto;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            animation: slideUp 0.6s ease;
        }
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 30px;
            font-size: 2.5rem;
            background: linear-gradient(45deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .input-container {
            display: flex;
            margin-bottom: 30px;
            gap: 10px;
        }
        input[type="text"] {
            flex: 1;
            padding: 15px;
            border: 2px solid #e1e5e9;
            border-radius: 10px;
            font-size: 16px;
            transition: all 0.3s ease;
        }
        input[type="text"]:focus {
            outline: none;
            border-color: #667eea;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);
        }
        .add-btn {
            padding: 15px 25px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        .add-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        }
        .todo-list {
            max-height: 400px;
            overflow-y: auto;
        }
        .todo-item {
            display: flex;
            align-items: center;
            padding: 15px;
            margin-bottom: 10px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            animation: slideIn 0.3s ease;
        }
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        .todo-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(0,0,0,0.15);
        }
        .todo-item.completed {
            opacity: 0.7;
            text-decoration: line-through;
        }
        .todo-checkbox {
            margin-right: 15px;
            transform: scale(1.2);
            cursor: pointer;
        }
        .todo-text {
            flex: 1;
            font-size: 16px;
            color: #333;
        }
        .delete-btn {
            background: #ff6b6b;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
            transition: all 0.3s ease;
        }
        .delete-btn:hover {
            background: #ff5252;
            transform: scale(1.05);
        }
        .stats {
            text-align: center;
            margin-top: 20px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 10px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>My Todo List</h1>
        <div class="input-container">
            <input type="text" id="todoInput" placeholder="Add a new task..." maxlength="100">
            <button class="add-btn" onclick="addTodo()">Add Task</button>
        </div>
        <div class="todo-list" id="todoList">
            <div class="todo-item">
                <input type="checkbox" class="todo-checkbox" onchange="toggleComplete(this)">
                <span class="todo-text">Welcome! Click to complete this sample task</span>
                <button class="delete-btn" onclick="deleteTodo(this)">Delete</button>
            </div>
        </div>
        <div class="stats" id="stats">
            <span id="totalTasks">1</span> total tasks • <span id="completedTasks">0</span> completed
        </div>
    </div>
    
    <script>
        let taskCount = 1;
        
        function addTodo() {
            const input = document.getElementById('todoInput');
            const todoList = document.getElementById('todoList');
            
            if (input.value.trim() !== '') {
                const todoItem = document.createElement('div');
                todoItem.className = 'todo-item';
                todoItem.innerHTML = \`
                    <input type="checkbox" class="todo-checkbox" onchange="toggleComplete(this)">
                    <span class="todo-text">\${input.value}</span>
                    <button class="delete-btn" onclick="deleteTodo(this)">Delete</button>
                \`;
                todoList.appendChild(todoItem);
                input.value = '';
                taskCount++;
                updateStats();
            }
        }
        
        function deleteTodo(button) {
            button.parentElement.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                button.parentElement.remove();
                taskCount--;
                updateStats();
            }, 300);
        }
        
        function toggleComplete(checkbox) {
            const todoItem = checkbox.parentElement;
            if (checkbox.checked) {
                todoItem.classList.add('completed');
            } else {
                todoItem.classList.remove('completed');
            }
            updateStats();
        }
        
        function updateStats() {
            const totalTasks = document.querySelectorAll('.todo-item').length;
            const completedTasks = document.querySelectorAll('.todo-item.completed').length;
            
            document.getElementById('totalTasks').textContent = totalTasks;
            document.getElementById('completedTasks').textContent = completedTasks;
        }
        
        document.getElementById('todoInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTodo();
            }
        });
        
        // Add slide out animation
        const style = document.createElement('style');
        style.textContent = \`
            @keyframes slideOut {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(20px);
                }
            }
        \`;
        document.head.appendChild(style);
    </script>
</body>
</html>`
  }

  // Ecommerce website template
  if (
    lowerPrompt.includes("ecommerce") ||
    lowerPrompt.includes("shop") ||
    lowerPrompt.includes("store") ||
    lowerPrompt.includes("product") ||
    lowerPrompt.includes("cart")
  ) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechStore - Premium Electronics</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .header {
            background: #fff;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            position: sticky;
            top: 0;
            z-index: 100;
        }
        .nav {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 2rem;
        }
        .logo {
            font-size: 1.8rem;
            font-weight: bold;
            background: linear-gradient(45deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .nav-links {
            display: flex;
            list-style: none;
            gap: 2rem;
        }
        .nav-links a {
            text-decoration: none;
            color: #333;
            font-weight: 500;
            transition: color 0.3s ease;
        }
        .nav-links a:hover {
            color: #667eea;
        }
        .cart-btn {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            transition: transform 0.3s ease;
        }
        .cart-btn:hover {
            transform: translateY(-2px);
        }
        .hero {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
            padding: 4rem 2rem;
        }
        .hero h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            animation: fadeInUp 1s ease;
        }
        .hero p {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            animation: fadeInUp 1s ease 0.2s both;
        }
        .cta-button {
            display: inline-block;
            background: white;
            color: #667eea;
            padding: 1rem 2rem;
            text-decoration: none;
            border-radius: 50px;
            font-weight: bold;
            transition: all 0.3s ease;
            animation: fadeInUp 1s ease 0.4s both;
        }
        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        .products {
            max-width: 1200px;
            margin: 4rem auto;
            padding: 0 2rem;
        }
        .products h2 {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 3rem;
            color: #333;
        }
        .product-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
        }
        .product-card {
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            cursor: pointer;
        }
        .product-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
        .product-image {
            height: 200px;
            background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
            color: #999;
        }
        .product-info {
            padding: 1.5rem;
        }
        .product-title {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #333;
        }
        .product-price {
            font-size: 1.5rem;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 1rem;
        }
        .product-description {
            color: #666;
            margin-bottom: 1rem;
            font-size: 0.9rem;
        }
        .add-to-cart {
            width: 100%;
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 0.75rem;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        .add-to-cart:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        }
        .footer {
            background: #333;
            color: white;
            text-align: center;
            padding: 2rem;
            margin-top: 4rem;
        }
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .cart-count {
            background: #ff6b6b;
            color: white;
            border-radius: 50%;
            padding: 0.2rem 0.5rem;
            font-size: 0.8rem;
            margin-left: 0.5rem;
        }
        @media (max-width: 768px) {
            .nav-links {
                display: none;
            }
            .hero h1 {
                font-size: 2rem;
            }
            .products {
                padding: 0 1rem;
            }
        }
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
            <button class="cart-btn" onclick="showCart()">
                Cart <span class="cart-count" id="cartCount">0</span>
            </button>
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
            <div class="product-card" onclick="viewProduct('Wireless Headphones')">
                <div class="product-image">🎧</div>
                <div class="product-info">
                    <div class="product-title">Wireless Headphones</div>
                    <div class="product-price">$199.99</div>
                    <div class="product-description">Premium noise-canceling wireless headphones with 30-hour battery life.</div>
                    <button class="add-to-cart" onclick="addToCart(event, 'Wireless Headphones', 199.99)">Add to Cart</button>
                </div>
            </div>

            <div class="product-card" onclick="viewProduct('Smart Watch')">
                <div class="product-image">⌚</div>
                <div class="product-info">
                    <div class="product-title">Smart Watch</div>
                    <div class="product-price">$299.99</div>
                    <div class="product-description">Advanced fitness tracking with heart rate monitor and GPS.</div>
                    <button class="add-to-cart" onclick="addToCart(event, 'Smart Watch', 299.99)">Add to Cart</button>
                </div>
            </div>

            <div class="product-card" onclick="viewProduct('Laptop Pro')">
                <div class="product-image">💻</div>
                <div class="product-info">
                    <div class="product-title">Laptop Pro</div>
                    <div class="product-price">$1,299.99</div>
                    <div class="product-description">High-performance laptop with 16GB RAM and 512GB SSD storage.</div>
                    <button class="add-to-cart" onclick="addToCart(event, 'Laptop Pro', 1299.99)">Add to Cart</button>
                </div>
            </div>

            <div class="product-card" onclick="viewProduct('Smartphone')">
                <div class="product-image">📱</div>
                <div class="product-info">
                    <div class="product-title">Smartphone</div>
                    <div class="product-price">$799.99</div>
                    <div class="product-description">Latest flagship smartphone with triple camera system and 5G connectivity.</div>
                    <button class="add-to-cart" onclick="addToCart(event, 'Smartphone', 799.99)">Add to Cart</button>
                </div>
            </div>

            <div class="product-card" onclick="viewProduct('Gaming Console')">
                <div class="product-image">🎮</div>
                <div class="product-info">
                    <div class="product-title">Gaming Console</div>
                    <div class="product-price">$499.99</div>
                    <div class="product-description">Next-gen gaming console with 4K gaming and ray tracing support.</div>
                    <button class="add-to-cart" onclick="addToCart(event, 'Gaming Console', 499.99)">Add to Cart</button>
                </div>
            </div>

            <div class="product-card" onclick="viewProduct('Wireless Speaker')">
                <div class="product-image">🔊</div>
                <div class="product-info">
                    <div class="product-title">Wireless Speaker</div>
                    <div class="product-price">$149.99</div>
                    <div class="product-description">Portable Bluetooth speaker with 360-degree sound and waterproof design.</div>
                    <button class="add-to-cart" onclick="addToCart(event, 'Wireless Speaker', 149.99)">Add to Cart</button>
                </div>
            </div>
        </div>
    </section>

    <footer class="footer">
        <p>&copy; 2024 TechStore. All rights reserved. | Free shipping on orders over $100</p>
    </footer>

    <script>
        let cart = [];
        let cartCount = 0;

        function addToCart(event, productName, price) {
            event.stopPropagation();
            
            cart.push({
                name: productName,
                price: price,
                id: Date.now()
            });
            
            cartCount++;
            document.getElementById('cartCount').textContent = cartCount;
            
            // Add animation effect
            const button = event.target;
            const originalText = button.textContent;
            button.textContent = 'Added!';
            button.style.background = '#4CAF50';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
            }, 1000);
            
            showNotification(\`\${productName} added to cart!\`);
        }

        function viewProduct(productName) {
            alert(\`Viewing \${productName}. In a real store, this would open a detailed product page.\`);
        }

        function showCart() {
            if (cart.length === 0) {
                alert('Your cart is empty. Add some products first!');
                return;
            }
            
            let cartSummary = 'Your Cart:\\n\\n';
            let total = 0;
            
            cart.forEach(item => {
                cartSummary += \`\${item.name} - $\${item.price}\\n\`;
                total += item.price;
            });
            
            cartSummary += \`\\nTotal: $\${total.toFixed(2)}\`;
            alert(cartSummary);
        }

        function showNotification(message) {
            const notification = document.createElement('div');
            notification.style.cssText = \`
                position: fixed;
                top: 20px;
                right: 20px;
                background: #4CAF50;
                color: white;
                padding: 1rem 2rem;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 1000;
                animation: slideIn 0.3s ease;
            \`;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }

        // Add CSS for notification animation
        const style = document.createElement('style');
        style.textContent = \`
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        \`;
        document.head.appendChild(style);

        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    </script>
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
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 600px;
            animation: slideUp 0.6s ease;
        }
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        h1 {
            color: #333;
            margin-bottom: 20px;
            font-size: 2.5rem;
            background: linear-gradient(45deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        p {
            color: #666;
            font-size: 1.1em;
            line-height: 1.6;
            margin-bottom: 20px;
        }
        .prompt-display {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            border-left: 4px solid #667eea;
            margin: 20px 0;
        }
        .note {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 20px;
            border-radius: 10px;
            margin-top: 20px;
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
        <h1>Code Template</h1>
        <div class="prompt-display">
            <strong>Your request:</strong> "${prompt}"
        </div>
        <p>This is a template response for your request. The code playground is working perfectly!</p>
        <div class="note">
            <p><strong>💡 Tip:</strong> Try specific prompts like "login form", "landing page", or "todo app" for better templates!</p>
            <p>Add your OpenAI API key to enable AI-powered code generation.</p>
        </div>
        <button class="btn" onclick="alert('Template is working! Try editing the code in the playground.')">Test Button</button>
    </div>
</body>
</html>`
}
