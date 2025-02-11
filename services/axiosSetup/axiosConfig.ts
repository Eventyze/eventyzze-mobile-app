interface Secrets {
  apiHost: string;
}

interface Config {
  secrets: Secrets;
}

let cache: Config | null = null;

const config = (): Config => {
  if (!cache) {
    const apiHost = "http://192.168.43.83:3050/api/v1"
    // "https://eventyze-backend.onrender.com/api/v1"
    // "http://192.168.43.83:3050/api/v1"

    cache = Object.freeze({
      secrets: {
        apiHost,
      },
    });
  }
  return cache;
};

export default config; 