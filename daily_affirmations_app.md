{
box-sizing: border-box;
margin: 0;
padding: 0;
}

body {
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
min-height: 100vh;
display: flex;
justify-content: center;
align-items: center;
background: linear-gradient(135deg, #a8edd9 0%, #fed6e3 100%);
padding: 20px;
}

.card {
background: rgba(255, 255, 255, 0.9);
padding: 40px 30px;
border-radius: 20px;
box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
max-width: 450px;
width: 100%;
text-align: center;
backdrop-filter: blur(10px);
}

.icon {
font-size: 2.5rem;
margin-bottom: 15px;
}

h1 {
font-size: 1.5rem;
color: #333;
margin-bottom: 20px;
font-weight: 600;
}

p {
font-size: 1.15rem;
color: #555;
line-height: 1.6;
min-height: 80px;
display: flex;
align-items: center;
justify-content: center;
margin-bottom: 25px;
}

button {
background-color: #6c5ce7;
color: #ffffff;
border: none;
padding: 12px 28px;
font-size: 1rem;
font-weight: 600;
border-radius: 25px;
cursor: pointer;
transition: all 0.2s ease-in-out;
box-shadow: 0 4px 12px rgba(108, 92, 231, 0.3);
}

button:hover {
background-color: #5b4bc4;
transform: translateY(-2px);
box-shadow: 0 6px 15px rgba(108, 92, 231, 0.4);
}

button:active {
transform: translateY(0);
}
    
