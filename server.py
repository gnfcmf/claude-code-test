from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

os.chdir('/Users/goncalo/Desktop/Claude code test')
print("Server running at http://localhost:8000")
HTTPServer(('localhost', 8000), SimpleHTTPRequestHandler).serve_forever()
