// env.js
const env = document.querySelector('meta[name="env"]').getAttribute('content');
console.log("Environment from env.js:", env);

const ENV_VARS = {
  apiUrl: env === "deployment" ? "https://www.danielvazquez.dev/api/send" : "http://localhost:3000/send"
};
