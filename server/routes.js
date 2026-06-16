const express = require("express");

const router = express.Router();

const db = require("./db");

// Get all posts
router.get("/posts", (req, res) => {
  const sql = `
    SELECT posts.*, users.email
    FROM posts
    JOIN users
    ON posts.user_id = users.id
    ORDER BY posts.id DESC
    `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
});
router.get("/users/:firebase_uid", (req, res) => {
  const firebase_uid = req.params.firebase_uid;

  db.query(
    "SELECT id FROM users WHERE firebase_uid=?",
    [firebase_uid],

    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result[0]);
    },
  );
});
router.get("/posts/user/:uid", (req, res) => {
  const uid = req.params.uid;

  const sql = `

SELECT posts.*,users.email

FROM posts

JOIN users

ON posts.user_id=users.id

WHERE users.firebase_uid=?

`;

  db.query(sql, [uid], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
});
// Save user after Firebase registration

router.post("/users", (req, res) => {
  const { email, firebase_uid } = req.body;

  const sql = `
    INSERT INTO users(email, firebase_uid)
    VALUES(?,?)
    `;

  db.query(
    sql,
    [email, firebase_uid],

    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json({
        message: "User saved",
      });
    },
  );
});

// Create post

router.post("/posts", (req, res) => {
  const { title, content, user_id } = req.body;

  const sql = `
    INSERT INTO posts
    (title,content,user_id)

    VALUES(?,?,?)
    `;

  db.query(
    sql,
    [title, content, user_id],

    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json({
        message: "Post created",
      });
    },
  );
});
router.post("/comments", (req, res) => {
  const { post_id, user_id, comment } = req.body;

  const sql = `

INSERT INTO comments
(post_id,user_id,comment)

VALUES(?,?,?)

`;

  db.query(
    sql,

    [post_id, user_id, comment],

    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json(err);
      }

      res.json({
        message: "Comment added",
      });
    },
  );
});
router.get("/users/:email", (req, res) => {
  const email = req.params.email;

  const sql = "SELECT id FROM users WHERE email = ?";

  db.query(sql, [email], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result[0]);
  });
});
router.get("/comments/:post_id", (req, res) => {
  const post_id = req.params.post_id;

  const sql = `

SELECT

comments.comment,

users.email


FROM comments


JOIN users

ON comments.user_id = users.id


WHERE comments.post_id = ?


ORDER BY comments.id DESC

`;

  db.query(
    sql,

    [post_id],

    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json(err);
      }

      res.json(result);
    },
  );
});
router.put("/posts/:id", (req, res) => {
  const id = req.params.id;

  const { title, content } = req.body;

  const sql = `
    UPDATE posts
    SET title=?, content=?
    WHERE id=?
    `;

  db.query(
    sql,
    [title, content, id],

    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Post updated",
      });
    },
  );
});
router.delete("/posts/:id", (req, res) => {
  const id = req.params.id;

  const sql = `
    DELETE FROM posts
    WHERE id=?
    `;

  db.query(
    sql,
    [id],

    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Post deleted",
      });
    },
  );
});
module.exports = router;
