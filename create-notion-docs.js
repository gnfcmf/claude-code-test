#!/usr/bin/env node

/**
 * Matrix Chatbot Documentation Creator for Notion
 *
 * Usage:
 *   node create-notion-docs.js <NOTION_TOKEN> <PARENT_PAGE_ID>
 *
 * Prerequisites:
 *   1. Create a Notion integration at https://www.notion.so/my-integrations
 *   2. Share a parent page with the integration
 *   3. Get the page ID from the URL: notion.so/Page-Name-[PAGE_ID_HERE]
 */

const { Client } = require('@notionhq/client');

// Get credentials from command line arguments
const [,, notionToken, parentPageId] = process.argv;

if (!notionToken || !parentPageId) {
  console.error('Usage: node create-notion-docs.js <NOTION_TOKEN> <PARENT_PAGE_ID>');
  console.error('');
  console.error('Example:');
  console.error('  node create-notion-docs.js secret_xxx abc123def456');
  process.exit(1);
}

// Initialize Notion client
const notion = new Client({ auth: notionToken });

// Documentation content as Notion blocks
const documentationBlocks = [
  // Overview Section
  {
    object: 'block',
    type: 'heading_2',
    heading_2: {
      rich_text: [{ type: 'text', text: { content: 'Overview' } }]
    }
  },
  {
    object: 'block',
    type: 'paragraph',
    paragraph: {
      rich_text: [{
        type: 'text',
        text: { content: 'Matrix-themed chatbot with CRT effects and n8n webhook backend.' }
      }]
    }
  },
  // Links Section
  {
    object: 'block',
    type: 'heading_2',
    heading_2: {
      rich_text: [{ type: 'text', text: { content: 'Links' } }]
    }
  },
  {
    object: 'block',
    type: 'bulleted_list_item',
    bulleted_list_item: {
      rich_text: [
        { type: 'text', text: { content: 'GitHub: ' } },
        {
          type: 'text',
          text: {
            content: 'https://github.com/gnfcmf/claude-code-test',
            link: { url: 'https://github.com/gnfcmf/claude-code-test' }
          }
        }
      ]
    }
  },
  {
    object: 'block',
    type: 'bulleted_list_item',
    bulleted_list_item: {
      rich_text: [
        { type: 'text', text: { content: 'Live Demo: ' } },
        {
          type: 'text',
          text: {
            content: 'https://matrix-chatbot-eight.vercel.app',
            link: { url: 'https://matrix-chatbot-eight.vercel.app' }
          }
        }
      ]
    }
  },
  // Architecture Section
  {
    object: 'block',
    type: 'heading_2',
    heading_2: {
      rich_text: [{ type: 'text', text: { content: 'Architecture' } }]
    }
  },
  {
    object: 'block',
    type: 'bulleted_list_item',
    bulleted_list_item: {
      rich_text: [{
        type: 'text',
        text: { content: 'Frontend: Single HTML file with embedded CSS/JS' }
      }]
    }
  },
  {
    object: 'block',
    type: 'bulleted_list_item',
    bulleted_list_item: {
      rich_text: [{
        type: 'text',
        text: { content: 'Backend: Vercel serverless function proxying to n8n' }
      }]
    }
  },
  {
    object: 'block',
    type: 'bulleted_list_item',
    bulleted_list_item: {
      rich_text: [{
        type: 'text',
        text: { content: 'Webhook: n8n handles chat responses' }
      }]
    }
  },
  // Files Section
  {
    object: 'block',
    type: 'heading_2',
    heading_2: {
      rich_text: [{ type: 'text', text: { content: 'Files' } }]
    }
  },
  {
    object: 'block',
    type: 'bulleted_list_item',
    bulleted_list_item: {
      rich_text: [
        { type: 'text', text: { content: 'index.html' }, annotations: { code: true } },
        { type: 'text', text: { content: ' - Main UI with Matrix rain animation' } }
      ]
    }
  },
  {
    object: 'block',
    type: 'bulleted_list_item',
    bulleted_list_item: {
      rich_text: [
        { type: 'text', text: { content: 'api/chat.js' }, annotations: { code: true } },
        { type: 'text', text: { content: ' - Vercel serverless proxy' } }
      ]
    }
  },
  {
    object: 'block',
    type: 'bulleted_list_item',
    bulleted_list_item: {
      rich_text: [
        { type: 'text', text: { content: 'server.py' }, annotations: { code: true } },
        { type: 'text', text: { content: ' - Local development server' } }
      ]
    }
  },
  // Local Development Section
  {
    object: 'block',
    type: 'heading_2',
    heading_2: {
      rich_text: [{ type: 'text', text: { content: 'Local Development' } }]
    }
  },
  {
    object: 'block',
    type: 'code',
    code: {
      rich_text: [{ type: 'text', text: { content: 'python server.py  # Starts server at http://localhost:8000' } }],
      language: 'bash'
    }
  },
  // Environment Variables Section
  {
    object: 'block',
    type: 'heading_2',
    heading_2: {
      rich_text: [{ type: 'text', text: { content: 'Environment Variables' } }]
    }
  },
  {
    object: 'block',
    type: 'bulleted_list_item',
    bulleted_list_item: {
      rich_text: [
        { type: 'text', text: { content: 'N8N_WEBHOOK_URL' }, annotations: { code: true } },
        { type: 'text', text: { content: ' - The n8n webhook endpoint (set in Vercel)' } }
      ]
    }
  }
];

async function createNotionDocumentation() {
  try {
    console.log('Creating Matrix Chatbot documentation page in Notion...');

    // Create the page
    const response = await notion.pages.create({
      parent: { page_id: parentPageId },
      icon: {
        type: 'emoji',
        emoji: '🤖'
      },
      properties: {
        title: {
          title: [
            {
              text: {
                content: 'Matrix Chatbot'
              }
            }
          ]
        }
      },
      children: documentationBlocks
    });

    console.log('');
    console.log('Documentation page created successfully!');
    console.log('');
    console.log('Page URL:', response.url);
    console.log('Page ID:', response.id);

    return response;
  } catch (error) {
    console.error('Error creating Notion page:');

    if (error.code === 'unauthorized') {
      console.error('  Invalid API token. Check your integration token.');
    } else if (error.code === 'object_not_found') {
      console.error('  Parent page not found. Make sure:');
      console.error('  1. The page ID is correct');
      console.error('  2. The integration has access to the parent page');
    } else {
      console.error(' ', error.message);
    }

    process.exit(1);
  }
}

createNotionDocumentation();
