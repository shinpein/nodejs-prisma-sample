# prisma sample

## 環境設定

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
    "start": "nodemon index.js" // 追加
  },
```
