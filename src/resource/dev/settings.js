export default {
  "meta": {
    profile: "test",
    "service": {
      "web": "http://localhost:9530/web",
      "file": "http://localhost:9530/chapter"
    }
  },

  "background": {
    "duration": 1000,
    "img": require("../../assets/我的影片2.mp4")
  },

  "user": {
    "name": "XyParaCrim",
    "organization": "Excellent Cancer",
    "avatar": require("../../assets/21330518.jpeg"),
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
        to: "note"
      },
      {
        id: "blogs",
        cover: require("@/assets/博客.png"),
        title: '博客',
        to: "blog"
      },
      {
        id: "works",
        cover: require("@/assets/works.png"),
        title: '代码仓库',
        to: "works"
      },
      {
        cover: require("@/assets/集锦.png"),
        title: '集锦',
        to: "blog"
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