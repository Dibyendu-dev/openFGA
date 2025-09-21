import { OpenFgaClient } from "@openfga/sdk";

// Initialize OpenFGA client
export const fgaClient = new OpenFgaClient({
  apiScheme: process.env.OPENFGA_API_SCHEME || "http",
  apiHost: process.env.OPENFGA_API_HOST || "localhost:8080",
  storeId: process.env.OPENFGA_STORE_ID || "01K5KWZ0ZT8AMYSXN3H04S7T0J",
  authorizationModelId: process.env.OPENFGA_AUTHORIZATION_MODEL_ID || "01K5KZD7WZY88EBPK952PBZQJ5",
});

// Initialize the client
export async function initializeFgaClient() {
  try {
    await fgaClient.readAuthorizationModels();
    console.log("✅ OpenFGA client initialized successfully");
  } catch (error) {
    console.error("❌ Failed to initialize OpenFGA client:", error.message);
    throw error;
  }
}

// Write tuples to OpenFGA
export async function writeTuple(user, relation, object) {
  try {
    console.log("Writing tuple:", { user, relation, object });
    const response = await fgaClient.write({
      writes: [
        {
          user: user,
          relation: relation,
          object: object,
        },
      ],
    });
    console.log("Tuple written successfully:", response);
    return response;
  } catch (error) {
    console.error("Error writing tuple:", error);
    throw error;
  }
}

// List objects that user has access to
export async function listUserObjects(user, relation, type) {
  try {
    const response = await fgaClient.listObjects({
      user: user,
      relation: relation,
      type: type,
    });
    return response;
  } catch (error) {
    console.error("Error listing objects:", error);
    throw error;
  }
}

// Check if user has access to specific object
export async function checkAccess(user, relation, object) {
  try {
    const response = await fgaClient.check({
      user: user,
      relation: relation,
      object: object,
    });
    return response.allowed;
  } catch (error) {
    console.error("Error checking access:", error);
    throw error;
  }
}

// Delete tuple from OpenFGA
export async function deleteTuple(user, relation, object) {
  try {
    const response = await fgaClient.write({
      deletes: [
        {
          user: user,
          relation: relation,
          object: object,
        },
      ],
    });
    return response;
  } catch (error) {
    console.error("Error deleting tuple:", error);
    throw error;
  }
}
