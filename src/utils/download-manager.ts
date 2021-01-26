export interface IDownloadManager {
  load(quantity? : number) : number,
  upload(quantity? : number) : number,
}

export default IDownloadManager;
