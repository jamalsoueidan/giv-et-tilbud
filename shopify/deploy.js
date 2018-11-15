const rp = require("request-promise");
const fs = require("fs");
const path = require("path");
const manifest = require("./build/asset-manifest.json");
const cheerio = require("cheerio");

require("dotenv").config();

// https://stackoverflow.com/questions/4313841/insert-a-string-at-a-specific-index
const insert = (str, index, value) =>
  str.substr(0, index) + value + str.substr(index);

const createScript = async body => {
  const response = await rp({
    uri: `https://${process.env.SHOPIFY_URL}/admin/script_tags.json`,
    auth: {
      user: process.env.SHOPIFY_USERNAME,
      password: process.env.SHOPIFY_PASSWORD
    },
    json: true,
    method: "POST",
    body: {
      script_tag: body
    }
  });
  return response;
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

const createAsset = async (options = {}) => {
  const response = await rp({
    uri: `https://${process.env.SHOPIFY_URL}/admin/themes/${
      options.theme.id
    }/assets.json`,
    auth: {
      user: process.env.SHOPIFY_USERNAME,
      password: process.env.SHOPIFY_PASSWORD
    },
    json: true,
    method: "PUT",
    body: {
      asset: options.asset
    }
  });
  return response.asset;
};

const upload = async () => {
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
          key: `assets/${filename}`,
          value: fs.readFileSync("./shopify/build" + manifest[key], {
            encoding: "utf8"
          })
        });
      }
    }
    return assets;
  }, []);

  return assets.map(async asset => {
    const response = await createAsset({
      theme,
      asset
    });
    console.log("Uploading...", asset.key);
    return response;
  });
};

const execute = async () => {
  const assets = await upload();

  Promise.all(assets).then(async completed => {
    const themes = await getThemes();
    const theme = themes.find(theme => theme.role === "main");

    const $ = cheerio.load(
      fs.readFileSync("./shopify/build/index.html", { encoding: "utf8" })
    );

    $("body")
      .find("script")
      .map(async (i, el) => {
        const src = $(el).attr("src");
        if (!src) {
          const html = $(el).html();
          const addedLiquid = insert(
            html,
            html.indexOf("{") + 1,
            `var asset_url = "{{"a.js" | asset_url}}";asset_url = asset_url.substring(0, asset_url.lastIndexOf("/")+1);`
          );

          const content = addedLiquid
            .replace(`"static/css/"`, "asset_url")
            .replace(`"static/js/"`, "asset_url");

          const process = await createAsset({
            theme,
            asset: {
              key: `assets/process.js.liquid`,
              value: content
            }
          });

          await createScript({
            event: "onload",
            src: process.public_url.replace(".liquid", "")
          });
        } else {
          const asset = completed.find(
            c => path.basename(c.key) === path.basename(src)
          );

          createScript({
            event: "onload",
            src: asset.public_url
          });
        }
      });
  });
};

execute();
