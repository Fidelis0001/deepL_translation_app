const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors({{origin: "https://3-birds-with-one-stone.netlify.app"}}));

const deeplApiKey = process.env.DEEPL_API_KEY;

app.post("/translate", async (req, res) => {
  const { text } = req.body;
  const languages = ["DE", "FR", "NL"]; // Languages to translate into
  const translations = {};

  for (const lang of languages) {
    try {
      const response = await axios.post(
        "https://api-free.deepl.com/v2/translate",
        `text=${text}&target_lang=${lang}&auth_key=${deeplApiKey}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      translations[lang] = response.data.translations[0].text;
    } catch (error) {
      console.error(`Error translating to ${lang}: ${error.message}`);
      translations[lang] = "Translation not available";
    }
  }

  res.json(translations);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
