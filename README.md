# PixelForge Printers — Demo Site

A demo customer-facing website for **PixelForge Printers**, built to showcase [Knowledge Studio](https://github.com/scorzo/chat-widget) chat widget integration with authenticated identity tokens and MCP tooling.

## What's Included

- **Landing page** with a sales chat widget (anonymous)
- **Login / Dashboard** with a support chat widget (authenticated via JWT identity token)
- **MCP server** (`mcp-servers/pixelforge-account/`) — a mock customer account lookup tool that returns registered printers, consumable levels, warranty status, ink subscriptions, and order history for the authenticated user

## Running Locally

```sh
npm install
npm run dev
```

The site runs at `http://localhost:8080`.

## Chat Widget Setup

The chat widgets connect to a locally running Knowledge Studio instance. Two widget instances are used:

| Widget | Page | Instance ID | Auth |
|--------|------|-------------|------|
| Sales | Landing page (`/`) | `fac7de20-4a6e-4b5e-b767-54d42d498a69` | Anonymous |
| Support | Dashboard (`/dashboard`) | `08582c12-27d9-473a-afab-496416679148` | JWT identity token |

Widget source URL: `http://localhost:3000/widget/widget.js`

## MCP Server

The `mcp-servers/pixelforge-account/` directory contains a self-contained MCP server that can be connected via Knowledge Studio's GitHub MCP feature:

- **Owner:** `scorzo`
- **Repository:** `knowledge_studio_pixelforge_demo`
- **Branch:** `main`
- **Subdirectory:** `mcp-servers/pixelforge-account`
- **Requires Authentication:** Yes

The MCP exposes a `get_customer_account` tool that returns hardcoded account data for the demo user (John Doe), including three registered printers (E200, L500, P300) with realistic consumable levels, alerts, and warranty statuses grounded in the PixelForge knowledge base.

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- MCP SDK (`@modelcontextprotocol/sdk`)
