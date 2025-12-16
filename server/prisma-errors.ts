/**
 * Converts Prisma errors to user-friendly messages
 */
export function getPrismaErrorMessage(error: unknown): string {
  if (!(error instanceof Error)) {
    return "An error occurred while loading data from the database.";
  }

  const message = error.message;

  // Recognize error type and return appropriate message
  if (message.includes("Can't reach database")) {
    return "Database is not available. Please check if MySQL server is running.";
  }

  if (message.includes("Authentication failed")) {
    return "Invalid database access credentials.";
  }

  if (message.includes("does not exist")) {
    return "Database does not exist. Please check the configuration.";
  }

  if (message.includes("Unique constraint")) {
    return "Data already exists in the database.";
  }

  if (message.includes("Foreign key constraint")) {
    return "Error in data relationships.";
  }

  // Fallback for other errors
  return "An error occurred while loading data from the database.";
}
