const rp = require("request-promise");
const fs = require("fs");
const path = require("path");

if (!fs.existsSync("./shopify/build/asset-manifest.json")) {
  console.log("manifest does not exit yet!");
  return;
}

const manifest = require("./build/asset-manifest.json");

require("dotenv").config();

const deleteScripts = scriptTagId =>
  rp({
    uri: `https://${
      process.env.SHOPIFY_URL
    }/admin/script_tags/${scriptTagId}.json`,
    auth: {
      user: process.env.SHOPIFY_USERNAME,
      password: process.env.SHOPIFY_PASSWORD
    },
    json: true,
    method: "DELETE"
  });

const getScripts = async body => {
  const response = await rp({
    uri: `https://${process.env.SHOPIFY_URL}/admin/script_tags.json`,
    auth: {
      user: process.env.SHOPIFY_USERNAME,
      password: process.env.SHOPIFY_PASSWORD
    },
    json: true,
    method: "GET"
  });
  return response.script_tags;
};

const getThemes = async () => {
  const response = await rp({
    uri: `https://${process.env.SHOPIFY_URL}/admin/themes.json`,
    auth: {
      user: process.env.SHOPIFY_USERNAME,
      password: process.env.SHOPIFY_PASSWORD
    },
    json: true,
    method: "GET"
  });
  return response.themes;
};

const deleteAssets = async (options = {}) => {
  try {
    rp({
      uri: `https://${process.env.SHOPIFY_URL}/admin/themes/${
        options.theme.id
      }/assets.json?asset[key]=${options.key}`,
      auth: {
        user: process.env.SHOPIFY_USERNAME,
        password: process.env.SHOPIFY_PASSWORD
      },
      json: true,
      method: "DELETE"
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteAllAssets = async () => {
  try {
    const themes = await getThemes();
    const theme = themes.find(theme => theme.role === "main");

    const assets = Object.keys(manifest).reduce((assets, key) => {
      const filetype = path.extname(key);
      const filename = path.basename(manifest[key]);
      if (filetype === ".js" || filetype === ".css") {
        if (
          filename.indexOf("runtime") === -1 &&
          filename.indexOf("precache-manifest") === -1
        ) {
          assets.push({
            key: `assets/${filename}`
          });
        }
      }
      return assets;
    }, []);

    assets.forEach(async asset => {
      const response = await deleteAssets({
        theme,
        key: asset.key
      });
      console.log("Deleting...", asset.key);
    });
  } catch (error) {
    console.log(error);
  }
};
const execute = async () => {
  deleteAllAssets();

  const scripts = await getScripts();
  scripts.forEach(script => {
    deleteScripts(script.id);
  });
};

execute();
