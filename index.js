import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASS,
  port: process.env.PGPORT,

  ssl: {
    rejectUnauthorized: false
  },
  max: 10,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    // データベースから今日のtodoを取得
    const todayResult = await db.query(
      "SELECT * FROM items WHERE term = 'Today' ORDER BY id ASC"
    );
    // データベースから今週のtodoを取得
    const thisWeakResult = await db.query(
      "SELECT * FROM items WHERE term = 'ThisWeak' ORDER BY id ASC"
    );
    let todayItems = todayResult.rows;
    let thisWeakItems = thisWeakResult.rows;

    // World Time APIを使用して東京の現在の日時を取得
    const response = await axios.get("http://worldtimeapi.org/api/timezone/Asia/Tokyo");
    const responseDateTime = response.data.datetime;
    var dateTime = responseDateTime.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}/g);

    res.render("index.ejs", {
      todayListTitle: "Today",
      todayListItems: todayItems,
      thisWeakListTitle: "ThisWeak",
      thisWeakListItems: thisWeakItems,
      timeApi: dateTime
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error"); 
  }
});

app.post("/addToday", async (req, res) => {
  const item = req.body.newItem;
  try {
    await db.query("INSERT INTO items (title, term) VALUES ($1, $2)", [
      item,
      "Today",
    ]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/addThisWeak", async (req, res) => {
  const item = req.body.newItem;
  try {
    await db.query("INSERT INTO items (title, term) VALUES ($1, $2)", [
      item,
      "ThisWeak",
    ]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/edit", async (req, res) => {
  const item = req.body.updatedItemTitle;
  const id = req.body.updatedItemId;

  try {
    await db.query("UPDATE items SET title = ($1) WHERE id = $2", [item, id]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/delete", async (req, res) => {
  const id = req.body.deleteItemId;

  try {
    await db.query("DELETE FROM items WHERE id = $1", [id]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
