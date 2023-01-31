// const url = "http://www.zhufengpeixun.com/strong/index.html";
const baseUrl = "http://www.zhufengpeixun.com/strong/";
const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");
const md5 = require("md5");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function getHtml(url, filename) {
  axios
    .get(url, { responseType: "stream", timeout: 0 })
    .then((res) => {
      let steam = fs.createWriteStream(filename);
      res.data.pipe(steam);
      steam.on("finish", () => {
        let data = fs.readFileSync(filename, "utf8");
        let text = data.replaceAll(`珠峰架构师成长计划`, `前端笔记`);
        text = text.replaceAll(`珠峰架构`, ``);
        text = text.replaceAll(
          `../static/css/main.css`,
          `./assets/css/main.css`
        );
        text = text.replaceAll(`static/css/main.css`, `./assets/css/main.css`);
        text = text.replaceAll(
          `https://static.zhufengpeixun.com/bootstrapmin_1645176572503.css`,
          `./assets/css/bootstrapmin_1645176572503.css`
        );
        text = text.replaceAll(
          `https://static.zhufengpeixun.com/jquerymin_1645176580555.js`,
          `./assets/js/jquerymin_1645176580555.js`
        );
        text = text.replaceAll(
          `https://static.zhufengpeixun.com/bootstrapmin_1645176554753.js`,
          `./assets/js/bootstrapmin_1645176554753.js`
        );
        fs.writeFileSync(filename, text);
        console.log(`写入成功${filename}`);
      });
    })
    .catch((err) => {
      getHtml(url, filename);
    });
}

let result = fs.readFileSync("entry.html", { encoding: "utf8", flag: "r" });
const $ = cheerio.load(result);
let arr = [];
$(".mynavlist > li").each(function (i, el) {
  let filename = $(this).find("a").attr("href");

  let url = baseUrl + encodeURI(filename);
  if (filename === "index.html") {
    filename = "html/" + filename;
  }
  arr.push({
    url,
    filename,
  });
});

// async function getData(){
//   for (let i = 0; i < arr.length; i++) {
//     let item = arr[i];
//     await sleep(500)
//     getHtml(item.url, item.filename);
//   }
// }

// getData()

function downImg(url) {
  let hash = md5(url);
  let ext = url.substring(url.lastIndexOf(".") + 1);
  if (!["jpg", "jpeg", "png", "gif", "svg", "jfif"].includes(ext)) {
    ext = "jpg";
  }
  return new Promise((resolve, reject) => {
    axios
      .get(url, { responseType: "stream", timeout: 0 })
      .then((res) => {
        let imgSrc = "./assets/img/" + hash + "." + ext;
        let steam = fs.createWriteStream(imgSrc);
        res.data.pipe(steam);
        steam.on("finish", () => {
          resolve(imgSrc);
        });
      })
      .catch(() => {
        resolve("");
      });
  });
}

function getImg() {
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    const result = fs.readFileSync(item.filename, "utf8");
    let str = result;
    const $ = cheerio.load(result);
    if ($("img").length) {
      $("img").each(async function (i, el) {
        const img = $(this).attr("src");
        if (img && img.startsWith("http")) {
          const newImg = await downImg(img);
          console.log(img, newImg);
          if (newImg) {
            str = str.replace(img, newImg);
          }
        }
        // 虽然会重复写 但是不影响
        fs.writeFileSync("newhtml/" + item.filename, str, {
          encoding: "utf8",
        });
      });
    }else{
      fs.writeFileSync("newhtml/" + item.filename, result, {
        encoding: "utf8",
      });
    }
  }
}

getImg();
