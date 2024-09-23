const express = require("express");
const { Task } = require("../models");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar tarefas" });
  }
});

router.post("/", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar tarefa" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      await task.destroy();
      res.json({ message: "Tarefa removida com sucesso" });
    } else {
      res.status(404).json({ error: "Tarefa não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover tarefa" });
  }
});

module.exports = router;
