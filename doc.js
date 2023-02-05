export const swaggerDocument = {
  openapi: "3.0.3",
  info: {
    title: "My Bank API",
    description:
      "This is a sample Bank API.\n\nSome useful links:\n- [The My Bank API repository](https://github.com/taiprogrammer/my-bank-api.git)",
    version: "1.0.11",
  },
  tags: [
    {
      name: "account",
      description: "Create accounts, get your money and see what is happening.",
    },
  ],
  paths: {
    "/account": {
      post: {
        tags: ["account"],
        summary: "Create a new account",
        description: "Create a new account if it doesn't exists",
        requestBody: {
          description: "Create a new account",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Client",
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "Successful created",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ClientResponse",
                },
              },
            },
          },
          400: {
            description: "Account already created",
          },
          405: {
            description: "Validation exception",
          },
        },
      },
      get: {
        tags: ["account"],
        summary: "Finds Accounts",
        description: "Get all accounts created",
        responses: {
          200: {
            description: "successful operation",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/ClientResponse",
                  },
                },
              },
            },
          },
          400: {
            description: "Invalid request",
          },
          404: {
            description: "Account not found",
          },
        },
      },
    },
    "/account/{id}": {
      get: {
        tags: ["account"],
        summary: "Find account by ID",
        description: "Returns a single account",
        operationId: "getPetById",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID of account to return",
            required: true,
            schema: {
              type: "integer",
              format: "int64",
            },
          },
        ],
        responses: {
          200: {
            description: "successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ClientResponse",
                },
              },
            },
          },
          400: {
            description: "Invalid ID supplied",
          },
          404: {
            description: "Account not found",
          },
        },
      },
      delete: {
        tags: ["account"],
        summary: "Deletes an account",
        description: "delete an account",
        operationId: "deletePet",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Account id to delete",
            required: true,
            schema: {
              type: "integer",
              format: "int64",
            },
          },
        ],
        responses: {
          400: {
            description: "Invalid account value",
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Client: {
        type: "object",
        properties: {
          nome: {
            type: "string",
            example: "John Doe",
          },
          balance: {
            type: "number",
            format: "double",
            example: 7,
          },
        },
      },
      ClientResponse: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            format: "int64",
            example: 1,
          },
          nome: {
            type: "string",
            example: "John Doe",
          },
          balance: {
            type: "number",
            format: "double",
            example: 10.5,
          },
        },
      },
    },
  },
};
