const config = {
  port: process.env.PORT || 8000,
  API_HOST: process.env.API_HOST || "http://localhost:8000",
  mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/nflevate-mern",
  expressSessionSecret: "alexsmith9totraviskelce87",
  googleClientID:
    "46618538903-0ells4n4jtv294nc9ldblankfp9n29uk.apps.googleusercontent.com",
  googleClientSecret: "J-l6qdC98ugbkpw6-YITAuNm"
};

export default config;
