/**
 *
 *                ..................................
 *                      佛祖保佑       永无BUG
 *
 * Created by peng.xue on 2018/4/24.
 */

export const formatFilesString = (string) => {
    let files = string.split(",");
    let newFiles = [];
    if(files.indexOf("PDF")>-1){
        newFiles.push("PDF")
    }
    if(files.indexOf("SLDDRW")>-1){
        newFiles.push("SLDDRW")
    }
    if(files.indexOf("SLDPRT")>-1){
        newFiles.push("SLDPRT")
    }
    newFiles = newFiles.concat(files);
    newFiles = [...new Set(newFiles)];
    return newFiles.join();
};