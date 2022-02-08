export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "someDeployedURL";
export const LOCAL_STORAGE_TOKEN_NAME = "learnIt-mern";
