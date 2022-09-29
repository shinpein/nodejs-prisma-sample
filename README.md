# prisma sample
### 公式：https://www.prisma.io/

## 1.環境設定

### プロジェクトディレクトリの作成
```bash
$ mkdir prisma sample
$ cd prisma sample
$ code .
```

### prisma, express, nodemon, @prisma/client インストール
```bash
$ npm init -y
$ npm i prisma express nodemon @prisma/client
```

### package.json の修正
```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon index.js" //追加
  },
```

### サーバー起動
```bash
$ npm start
```

## 2.prisma のスキーマ定義
```bash
$ npx prisma init
```

### ファイル構成
```text
root/
 ┣━ node_modules/
 ┣━ prisma/
 ┃   └schema.prisma //スキーマ定義ファイル
 ┣━ .env //環境変数設定ファイル
 ┣━ index.js
 ┣━ packege.json
 ┗━ packege-lock.json
```

### .env に接続DBの情報を記載(各環境に併せて編集)
```text
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

### modelの作成
#### schema.prisma ファイルの編集(以下を追加)
```prisma
model Tasks {
  id          Int      @id @default(autoincrement())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  name        String
  description String
}
```

### modelの反映
```bash
$ npx prisma migrate dev

# エラーの場合以下でも可
# npx prisma db push
```

### ブラウザでDBの確認
```bash
$ npx prisma studio
```

## 3.メソッドの作成

### createメソッドの作成(tasksデータの登録)
```javascript
const {PrismaClient} = require("@prisma/client")

～略～

const prisma = new PrismaClient()
app.use(express.json())

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
```

### getメソッドの作成(tasks一覧の取得)
```javascript
// taskデータ一覧の取得
app.get("/", async (req, res) => {
  const tasks = await prisma.tasks.findMany()
  return res.json(tasks)
})
```

### getメソッドの作成(tasks1件の取得)
```javascript
// taskデータ一覧の取得
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
```

### putメソッドの作成(tasks1件の更新)
```javascript
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
```

### deleteメソッドの作成(tasks1件の削除)
```javascript
// taskデータ一覧の削除
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
```
