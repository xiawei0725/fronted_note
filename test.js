// http://www.zhufengpeixun.com/strong/html/103.16.rollup.2.html

const axios = require("axios");
const url = `http://www.zhufengpeixun.com/strong/html/103.16.rollup.2.html`;
axios
  .get(url, {
    responseType: "stream",
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
