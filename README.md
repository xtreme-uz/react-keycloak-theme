<p align="center">
    <img src="https://github.com/garronej/keycloakify-advanced-starter/workflows/ci/badge.svg?branch=main">
</p>

A starter/demo project for [Keycloakify](https://keycloakify.dev)

# ⚠️ Please read the two following notices ⚠️

> This starter is for **Component-level customization**, if you only want to customize **the page at the CSS level**
> heads over to [keycloakify-starter](https://github.com/garronej/keycloakify-starter).

> If you are only looking to create a theme and don't care about integrating it into a React app there
> are a lot of things that you can remove from this starter. [Please read this](#standalone-keycloak-theme).

# Quick start

```bash
yarn
yarn keycloak # Build the theme one time (some assets will be copied to 
              # public/keycloak_static, they are needed to dev your page outside of Keycloak)
yarn start # See the Hello World app
# Uncomment line 15 of src/KcApp/kcContext, reload https://localhost:3000
# You can now develop your Login pages.

# Think your theme is ready? Run
yarn keycloak
# Read the instruction printed on the console to see how to test
# your theme on a real Keycloak instance.
```

# Introduction

This repo constitutes an easily reusable CI setup for SPA React App that generates Keycloaks's theme
using [keycloakify](https://github.com/InseeFrLab/keycloakify).

# The CI workflow

-   This CI is configured to both publish on [GitHub Pages](https://github.com/garronej/keycloakify-starter/blob/71baa789254f00bf521d40dc0a8db6925aa72942/.github/workflows/ci.yaml#L47-L65) and on [DockerHub](https://github.com/garronej/keycloakify-starter/blob/71baa789254f00bf521d40dc0a8db6925aa72942/.github/workflows/ci.yaml#L66-L111). In practice you probably want one
    or the other but not both.  
    We deploy the demo app at [demo-app.keycloakify.dev](https://demo-app.keycloakify.dev) using GitHub page on the branch `gh-pages` (you have to enable it).  
    To configure your own domain name please refer to [this documentation](https://docs.gitlanding.dev/using-a-custom-domain-name).
-   To release **don't create a tag manually**, the CI do it for you. Just update the `package.json`'s version field and push.
-   The `.jar` files that bundle the Keycloak theme will be attached as an asset with every GitHub release. [Example](https://github.com/InseeFrLab/keycloakify-starter/releases/tag/v0.1.0). The permalink to download the latest version is: `https://github.com/USER/PROJECT/releases/latest/download/keycloak-theme.jar`.
    For this demo repo it's [here](https://github.com/garronej/keycloakify-starter/releases/latest/download/keycloak-theme.jar)
-   The CI publishes the app docker image on DockerHub. `<org>/<repo>:main` for each **commit** on `main`, `<org>/<repo>:<feature-branch-name>` for each **pull-request** on `main`
    and when **releasing a new version**: `<org>/<repo>:latest` and `<org>/<repo>:X.Y.Z`
    [See on DockerHub](https://hub.docker.com/r/garronej/keycloakify-starter/tags?page=1&ordering=last_updated)

![image](https://user-images.githubusercontent.com/6702424/187989551-9461fb46-f545-4e99-b20c-e0fe4a0f773d.png)

![image](https://user-images.githubusercontent.com/6702424/187988970-99c71326-5228-4d51-8a07-dab8113387f4.png)  

If you want an example of an app that put that setup in production checkout onyxia-ui: [the repo](https://github.com/InseeFrLab/onyxia-ui), [the login](https://auth.lab.sspcloud.fr/auth/realms/sspcloud/protocol/openid-connect/auth?client_id=onyxia&redirect_uri=https%3A%2F%2Fonyxia.lab.sspcloud.fr), [the app](https://datalab.sspcloud.fr).

# Standalone vs `--external-assets`

The CI creates two jars 
- `keycloak-theme.jar`: Generated with `npx keycloakify --external-assets`, the assets, located `static/**/*`, like for example 
  `static/js/main.<hash>.js` will be downloaded from `https://demo-app.keycloakify.dev/static/js/main.<hash>.js` (`demo-app.keycloakify.dev` is 
  specified in the `package.json`.
- `standalone-keycloak-theme.jar`: Generated with `npx keycloakify`, this theme is fully standalone, all assets will be served by the 
  Keycloak server, for example `static/js/main.<hash>.js` will be downloaded from an url like `http://<your keycloak url>/resources/xxxx/login/keycloakify-starter/build/static/js/main.<hash>.js`.

More info on the `--external-assets` build option [here](https://docs.keycloakify.dev/v/v6/build-options#external-assets).  