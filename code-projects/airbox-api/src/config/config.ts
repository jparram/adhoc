export default () => ({
    okta: {
        domain: process.env.OKTA_DOMAIN,
        clientId: process.env.OKTA_CLIENT_ID,
        clientSecret: process.env.OKTA_CLIENT_SECRET,
        audience: process.env.OKTA_AUDIENCE,
    }
});