const express = require("express");
const router = express.Router();
const Idea = require("../models/IdeaSchema.js");

// GET ALL IDEAS
router.get("/", async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json({ success: true, data: ideas });
  } catch (error) {
    res.status(500).json({ success: false, error: "Something went wrong!" });
  }
});

//GET SINGLE IDEA
router.get("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      res.status(500).json({ success: false, error: "Resource not found!" });
      return;
    }

    res.json({ success: true, data: idea });
  } catch (error) {
    res.status(500).json({ success: false, error: "Something went wrong!" });
  }
});

//POST AN IDEA
router.post("/", async (req, res) => {
  const newIdea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    author: req.body.author,
  });

  try {
    const savedIdea = await newIdea.save();

    res.json({ success: true, data: savedIdea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong!" });
  }
});

//UPDATE IDEA
router.put("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (idea.author === req.body.author) {
      const updatedIdea = await Idea.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            text: req.body.text,
            tag: req.body.tag,
          },
        },
        { new: true }
      );

      res.json({ success: true, data: updatedIdea });
    } else {
      res.status(403).json({
        success: false,
        error: "You are not authorize to update this idea",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong!" });
  }
});

//DELETE IDEA
router.delete("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (idea.author === req.body.author) {
      await Idea.findByIdAndDelete(req.params.id);
      res.json({ success: true, data: {} });
    } else {
      res.status(403).json({
        success: false,
        error: "You are not authorize to delete this idea",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Something went wrong!" });
  }
});

module.exports = router;
