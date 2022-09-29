
const express = require("express")
const {PrismaClient} = require("@prisma/client")

const app = express()
const PORT = 3000

const prisma = new PrismaClient()
app.use(express.json())

// taskデータ一覧の取得
app.get("/", async (req, res) => {
  const tasks = await prisma.tasks.findMany()
  return res.json(tasks)
})

// taskデータ一件の取得
app.get("/:id", async (req, res) => {
  const id = req.params.id
  const task = await prisma.tasks.findUnique(
    {
      where: {
        id: Number(id),
      }
    }
  )
  return res.json(task)
})

// 新規taskデータの登録
app.post("/create", async (req, res) => {
  const { name, description } = req.body
  const tasks = await prisma.tasks.create({
    data: {
      name: name,
      description: description,
    }
  })
  return res.json(tasks)
})

// 既存taskデータの更新
app.put("/:id", async (req, res) => {
  const id = req.params.id
  const { description } = req.body
  const task = await prisma.tasks.update({
    where: {
      id: Number(id),
    },
    data: {
      description: description,
    },
  })
  return res.json(task)
})

// taskデータ一覧の取得
app.get("/", async (req, res) => {
  const tasks = await prisma.tasks.findMany()
  return res.json(tasks)
})

// taskデータ一件の削除
app.delete("/:id", async (req, res) => {
  const id = req.params.id
  const task = await prisma.tasks.delete(
    {
      where: {
        id: Number(id),
      }
    }
  )
  return res.json(task)
})

app.listen(PORT, () => {
  console.log("start server!")
})
