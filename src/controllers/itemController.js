import pool from "../config/db.js";

export const getItems = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query("SELECT * FROM items WHERE user_id = $1", [
      userId,
    ]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Error getting items" });
  }
};

export const createItem = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "INSERT INTO items (title, description, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, description, userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Error creating item" });
  }
};

export const updateItem = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "UPDATE items SET title = $1, description = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
      [title, description, id, userId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Error updating item" });
  }
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    await pool.query("DELETE FROM items WHERE id = $1 AND user_id = $2", [
      id,
      userId,
    ]);
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting item" });
  }
};
