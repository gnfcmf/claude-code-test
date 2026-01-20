# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development

```bash
python server.py    # Start local dev server at http://localhost:8000
```

## Architecture

Matrix-themed chatbot frontend that connects to an n8n webhook backend.

- `index.html` - Single-page app with embedded CSS and JavaScript
  - Matrix rain canvas animation (blue theme)
  - Chat interface with CRT scanline effect
  - Sends messages via GET to n8n webhook, expects `{ response: string }` back
  - Toggle `CONFIG.useRealWebhook` to switch between live webhook and placeholder responses
- `server.py` - Simple Python HTTP server for local development
