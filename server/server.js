const express = require("express");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const routes = require("./routes");

app.use("/api", routes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
app.get("/comments/:postId", (req, res) => {
  const postId = req.params.postId;

  db.query(
    "SELECT * FROM comments WHERE post_id=?",
    [postId],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json(result);
    },
  );
});
app.post("/comments", (req, res) => {
  const { post_id, username, comment } = req.body;

  db.query(
    "INSERT INTO comments(post_id, username, comment) VALUES(?,?,?)",
    [post_id, username, comment],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        id: result.insertId,
      });
    },
  );
});
