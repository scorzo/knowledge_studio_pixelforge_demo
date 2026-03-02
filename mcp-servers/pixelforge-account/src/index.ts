#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

interface UserContext {
  userId: string;
  orgId?: string;
  email?: string;
  role?: string;
  metadata?: Record<string, any>;
}

interface ToolMeta {
  userContext?: UserContext;
  dataSources?: Record<string, Record<string, any>>;
  sessionId?: string;
  specialistId?: string;
  instanceId?: string;
}

// ---------------------------------------------------------------------------
// Mock customer database — grounded in PixelForge product knowledge base
// ---------------------------------------------------------------------------

const CUSTOMER_DATABASE: Record<string, any> = {
  "user-123": {
    profile: {
      customerId: "PF-2024-00847",
      name: "John Doe",
      email: "john.doe@pixelforge.com",
      phone: "+1 (503) 555-0142",
      accountTier: "PixelForge Pro",
      memberSince: "2024-03-15",
      shippingAddress: {
        street: "742 Evergreen Terrace",
        city: "Portland",
        state: "OR",
        zip: "97205",
        country: "US",
      },
    },

    registeredPrinters: [
      {
        model: "PixelForge Home E200",
        serialNumber: "PFE2-2024-0039871",
        purchaseDate: "2024-08-10",
        registeredDate: "2024-08-12",
        warrantyExpires: "2025-08-10",
        warrantyStatus: "active",
        extendedWarranty: false,
        firmwareVersion: "v2.1.3",
        latestFirmwareAvailable: "v2.2.0",
        firmwareUpdateAvailable: true,
        connectionType: "WiFi",
        lastConnected: "2026-02-26",
        ipAddress: "192.168.1.47",
        wifiNetwork: "DoeFamily_5G",
        currentAlerts: [
          {
            code: "FW_UPDATE_AVAILABLE",
            severity: "info",
            message: "Firmware update v2.2.0 available",
            since: "2025-12-01",
          },
        ],
        consumables: {
          "PF-63 (Black)": { level: 42, status: "ok" },
          "PF-64 (Tri-Color)": { level: 18, status: "low" },
        },
        totalPagesPrinted: 1847,
      },
      {
        model: "PixelForge Office L500",
        serialNumber: "PFL5-2025-0112450",
        purchaseDate: "2025-02-01",
        registeredDate: "2025-02-03",
        warrantyExpires: "2027-02-01",
        warrantyStatus: "active",
        extendedWarranty: true,
        extendedWarrantyExpires: "2029-02-01",
        firmwareVersion: "v2.1.4",
        latestFirmwareAvailable: "v2.1.4",
        firmwareUpdateAvailable: false,
        connectionType: "Ethernet",
        lastConnected: "2026-02-27",
        ipAddress: "192.168.1.20",
        currentAlerts: [
          {
            code: "NEW_TONER_INSTALLED",
            severity: "info",
            message: "New toner cartridge PF-T500H installed",
            since: "2026-02-20",
          },
        ],
        consumables: {
          "PF-T500H (Black, High Yield)": { level: 95, status: "ok" },
        },
        drumLife: { pagesRemaining: 18200, percentRemaining: 91 },
        totalPagesPrinted: 3612,
      },
      {
        model: "PixelForge PhotoPro P300",
        serialNumber: "PFP3-2024-0005519",
        purchaseDate: "2024-06-20",
        registeredDate: "2024-06-22",
        warrantyExpires: "2025-06-20",
        warrantyStatus: "expired",
        extendedWarranty: false,
        extendedWarrantyEligible: true,
        extendedWarrantyPrice: "$49.99 for +1 year",
        firmwareVersion: "v1.8.0",
        latestFirmwareAvailable: "v1.8.0",
        firmwareUpdateAvailable: false,
        connectionType: "AirDirect",
        lastConnected: "2026-02-14",
        currentAlerts: [
          {
            code: "LOW_INK_LC",
            severity: "warning",
            message: "Light Cyan ink low — order replacement soon",
            since: "2026-02-10",
          },
          {
            code: "LOW_INK_LM",
            severity: "warning",
            message: "Light Magenta ink low — order replacement soon",
            since: "2026-02-12",
          },
          {
            code: "WARRANTY_EXPIRED",
            severity: "info",
            message: "Warranty expired on 2025-06-20. Extended warranty available.",
            since: "2025-06-21",
          },
        ],
        consumables: {
          "PF-71 (Black)": { level: 55, status: "ok" },
          "PF-72 (Cyan)": { level: 38, status: "ok" },
          "PF-73 (Magenta)": { level: 44, status: "ok" },
          "PF-74 (Yellow)": { level: 61, status: "ok" },
          "PF-75 (Light Cyan)": { level: 8, status: "low" },
          "PF-76 (Light Magenta)": { level: 11, status: "low" },
        },
        totalPagesPrinted: 923,
      },
    ],

    inkSubscriptions: [
      {
        subscriptionId: "SUB-2024-1192",
        printer: "PixelForge Home E200",
        plan: "E200 Essentials",
        cartridges: ["PF-63 (Black)", "PF-64 (Tri-Color)"],
        frequency: "Every 2 months",
        status: "active",
        nextShipment: "2026-03-15",
        monthlyPrice: "$18.99",
      },
      {
        subscriptionId: "SUB-2024-1340",
        printer: "PixelForge PhotoPro P300",
        plan: "P300 6-Ink Bundle",
        cartridges: ["PF-71", "PF-72", "PF-73", "PF-74", "PF-75", "PF-76"],
        frequency: "Every 3 months",
        status: "active",
        nextShipment: "2026-04-01",
        monthlyPrice: "$34.99",
      },
    ],

    recentOrders: [
      {
        orderId: "ORD-2026-028741",
        date: "2026-02-18",
        items: [{ name: "PF-T500H High Yield Toner", qty: 1, price: "$89.99" }],
        total: "$89.99",
        status: "delivered",
        deliveredDate: "2026-02-20",
      },
      {
        orderId: "ORD-2026-017223",
        date: "2026-01-05",
        items: [
          { name: "PixelForge Premium Glossy Photo Paper (8x10, 50 sheets)", qty: 2, price: "$24.99" },
        ],
        total: "$49.98",
        status: "delivered",
        deliveredDate: "2026-01-08",
      },
      {
        orderId: "ORD-2025-089102",
        date: "2025-02-01",
        items: [
          { name: "PixelForge Office L500", qty: 1, price: "$249.99" },
          { name: "PF-T500H High Yield Toner", qty: 1, price: "$89.99" },
          { name: "Extended Warranty — Office/Pro (+2 years)", qty: 1, price: "$149.99" },
        ],
        total: "$489.97",
        status: "delivered",
        deliveredDate: "2025-02-03",
      },
    ],

    driverVersion: "v4.2.1",
    operatingSystem: "macOS 15 Sequoia",
  },
};

// ---------------------------------------------------------------------------
// MCP Server
// ---------------------------------------------------------------------------

class PixelForgeAccountServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      { name: "pixelforge-account-mcp", version: "1.0.0" },
      { capabilities: { tools: {} } }
    );

    this.setupHandlers();

    this.server.onerror = (error) => console.error("[MCP Error]", error);
    process.on("SIGINT", async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: "get_customer_account",
          description:
            "Look up the authenticated customer's full account including registered printers, " +
            "warranty status, consumable levels, ink subscriptions, and recent orders. " +
            "Requires an authenticated user session.",
          inputSchema: {
            type: "object",
            properties: {},
            required: [],
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, _meta } = request.params as {
        name: string;
        arguments?: Record<string, unknown>;
        _meta?: ToolMeta;
      };

      const meta = _meta || {};

      if (name === "get_customer_account") {
        return this.getCustomerAccount(meta);
      }

      return {
        content: [{ type: "text", text: JSON.stringify({ error: `Unknown tool: ${name}` }) }],
      };
    });
  }

  private async getCustomerAccount(meta: ToolMeta) {
    if (!meta.userContext?.userId || meta.userContext.userId === "anonymous") {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              error: "Authentication required to access account information",
              code: "AUTHENTICATION_REQUIRED",
              hint: "Please sign in to view your account details.",
            }),
          },
        ],
      };
    }

    const { userId } = meta.userContext;
    const account = CUSTOMER_DATABASE[userId];

    if (!account) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              error: "Customer account not found",
              code: "ACCOUNT_NOT_FOUND",
              userId,
            }),
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            success: true,
            account,
          }),
        },
      ],
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("PixelForge Account MCP server running on stdio");
  }
}

const server = new PixelForgeAccountServer();
server.run().catch(console.error);
