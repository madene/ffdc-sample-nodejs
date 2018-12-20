const openIdClient = require("openid-client");

module.exports = function (discoveryType = "auto") {
  console.log(process.env);
  if (discoveryType === "auto") {
    // openid-client gives this function to automatically discover endpoints.
    // It just adds prefix to URL like /.well-known/openid-configuratio or /.well-known/oauth-authorization-server
    // and fetches object describing end points from url answering with 200 code.

    return openIdClient.Issuer.discover(process.env.AUTHORIZATION_WELLKNOWN);
  }

  const manuallyConfiguredIssuer = new openIdClient.Issuer({
    issuer: process.env.ISS_HEADER,
    authorization_endpoint: process.env.AUTHORIZATION_ENDPOINT,
    token_endpoint: process.env.TOKEN_ENDPOINT,
    userinfo_endpoint: process.env.USERINFO_ENDPOINT,
    jwks_uri: process.env.GOOGLE_JWKS_URI
  });
  
  return Promise.resolve(manuallyConfiguredIssuer); 
}
