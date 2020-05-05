export default {
  "meta": {
    profile: "dev"
  },

  "background": {
    "duration": 1000,
    "img": require("../../assets/31585071810_.pic_hd.jpg")
  },

  "user": {
    "name": "XyParaCrim",
    "organization": "Excellent Cancer",
    "avatar": "https://avatars3.githubusercontent.com/u/21330518?s=60&u=13697a46d7d432b5eedb5cefb1d7ec57c8806f5e&v=4",
    "copyright": "Copyright (c) 2019 excellent-cancer"
  },

  "nav": {
    "width": 100,
    "duration": 5000,
    "items": [
      {
        id: "note",
        cover: require("@/assets/笔记.png"),
        title: '笔记',
        to: "user",
        disable: true
      },
      {
        id: "blogs",
        cover: require("@/assets/博客.png"),
        title: '博客',
        to: "user",
        disable: true
      },
      {
        id: "document",
        cover: require("@/assets/文档库.png"),
        title: '文档库',
        to: "docs-repo"
      },
      {
        cover: require("@/assets/集锦.png"),
        title: '集锦',
        to: "user",
        disable: true
      },
      {
        cover: require("@/assets/编辑器-更多.png"),
        title: '更多',
        to: "user",
        disable: true
      }
    ]
  },

  "document-repository": {
    loadPerLoad: 5
  }
}