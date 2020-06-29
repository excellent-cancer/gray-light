/**
 * 模拟服务器回复
 */

import $ from 'jquery'
import Requests from "@/utils/requests";
import ResourceUtils from '@/utils/resource-utils'

export default class DevRequests extends Requests {

  constructor(settings, tokens) {
    super(settings, tokens)
    this.webService = settings.service.web
    this.fileService = settings.service.file
  }

  fetchWorks() {
    return this.getFromWebService(`owner/works`, { ownerId: this.tokens.getUserId() })
  }

  fetchWorksPage(pages, count) {
    return this.getFromWebService(`owner/works`, { ownerId: this.tokens.getUserId(), pages, count })
  }

  fetchDocumentByWorks(worksId) {
    return this.getFromWebService("owner/works/docs", { worksId })
  }

  fetchDocumentPageByWorks(worksId, pages, count) {
    return this.getFromWebService("owner/works/docs", { worksId, pages, count })
  }

  fetchDocumentTree(id) {
    return this.getFromWebService("owner/works/docs/tree", { id })
  }

  fetchNote() {
    return this.getFromWebService("owner/note", { ownerId: this.tokens.getUserId() })
  }

  fetchNotePage(pages, count) {
    return this.getFromWebService("owner/note", { ownerId: this.tokens.getUserId(), pages, count })
  }

  fetchNoteTree(id) {
    return this.getFromWebService("owner/note/tree", { id })
  }

  loadContent(link) {
    return this.downloadFromFileService(link)
  }

  /**
   * 随机返回指定数目的仓库
   *
   * @param tokens
   * @param pages
   * @param count
   * @returns {Promise<[]>}
   */
  documentRepositoriesSet(tokens, pages, count) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `http://localhost:8080/owner/docs?pages=${pages}&count=${count}`,
        type: 'get',
        dataType: 'json',
        contentType: "application/json",
        success: response => this.$extractData(response, resolve, reject),
        error(xhr, errorType, error) {
          reject('Ajax request error, errorType: ' + errorType + ', error: ' + error)
        }
      })
    })
  }

  /**
   * 返回文档具体章节与题目数
   *
   * @param tokens
   * @param id
   */
  documentRepository(tokens, id) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `http://localhost:8080/owner/docs/tree?id=${id}`,
        type: 'get',
        dataType: 'json',
        contentType: "application/json",
        success: response => this.$extractData(response, resolve, reject),
        error(xhr, errorType, error) {
          reject('Ajax request error, errorType: ' + errorType + ', error: ' + error)
        }
      })
    })
  }

  /**
   * 根据文章ID，返回文章内容
   *
   * @param tokens
   * @param chapterData
   * @returns {Promise<unknown>}
   */
  documentChapterContent(tokens, chapterData) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();

      console.log(chapterData.downloadLink)

      xhr.open('GET', `${window.location.origin}/chapter/${chapterData.downloadLink}`, true);//get请求，请求地址，是否异步
      xhr.withCredentials = true;
      xhr.responseType = "blob";    // 返回类型blob
      xhr.onload = function () {// 请求完成处理函数
        if (this.status === 200) {
          let reader = new FileReader()
          reader.onload = function() {
            resolve(reader.result)
          }
          reader.onerror = reject

          reader.readAsText(this.response)
        } else {
          reject()
        }
      }

      xhr.send();
    })
  }



  // 帮助方法

  getFromWebService(uri, params) {
    return new Promise((resolve, reject) => {
      const webService = this.webService
      $.ajax({
        url: `${webService}/${uri}?${ResourceUtils.paramsToString(params)}`,
        type: 'get',
        dataType: 'json',
        contentType: "application/json",
        success: response => this.$extractData(response, resolve, reject),
        error(xhr, errorType, error) {
          reject('Ajax request error, errorType: ' + errorType + ', error: ' + error)
        }
      })
    })
  }

  downloadFromFileService(link) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      let fileService = this.fileService

      xhr.open('GET', `${fileService}/${link}`, true);//get请求，请求地址，是否异步
      xhr.withCredentials = true;
      xhr.responseType = "blob";    // 返回类型blob
      xhr.onload = function () {// 请求完成处理函数
        if (this.status === 200) {
          let reader = new FileReader()
          reader.onload = function() {
            resolve(reader.result)
          }
          reader.onerror = reject

          reader.readAsText(this.response)
        } else {
          reject()
        }
      }

      xhr.send();
    })
  }
}

