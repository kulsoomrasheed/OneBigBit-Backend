const express = require("express");
const { TaskModel } = require("../model/task.model");
const taskRouter = express.Router();

taskRouter.get("/", async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.status(200).json({ msg: "Success", tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "An error occurred while fetching tasks" });
  }
});

taskRouter.post("/", async (req, res) => {
  const { title, status, desc } = req.body;
  try {
    const tasks = new TaskModel({ title, desc, status });
    await tasks.save();
    res.status(200).json({ msg: "A new todo has been added", tasks });
  } catch {
    res.status(500).json({ msg: "Error saving todo" });
  }
});
taskRouter.delete("/delete/:id", async (req, res) => {
  let ID = req.params.id;
  let data = await TaskModel.findOne({ _id: ID });

  try {
    if (data) {
      await TaskModel.findByIdAndDelete({
        _id: ID,
      });
      res.status(200).send(`task with ${ID} is deleted`);
    } else {
      res.status(404).send(`No data available with ${ID}`)
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

taskRouter.patch("/edit/:id", async (req, res) => {
  let ID = req.params.id;
  let payload = req.body;
  let data = await TaskModel.findOne({ _id: ID });
  try {
    if (data) {
      await TaskModel.findByIdAndUpdate(
        {
          _id: ID,
        },
        payload
      );
      res.send(`data with ${ID} is updated`);
    } else {
      res.send(`No data available with ${ID}`);
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = {
  taskRouter,
};
