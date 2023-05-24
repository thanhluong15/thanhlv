import fs from "fs"; 
import Jimp = require("jimp"); 
import fetch from "node-fetch"; 
// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
// inputURL: string - a publicly accessible url to an image file
// RETURNS
// an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string> 
{ 
  return new Promise(async (resolve, reject) => { 
    try { 
      const res = await fetch(inputURL); 
// I turn the image to a buffer and then to a Jimp image, otherwise some images are not processed 
const data = await res.buffer(); 
const photo = await Jimp.read(data); 
const outpath = "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg"; 
await photo 
.resize(256, 256) // resize 
.quality(60) // set JPEG quality 
.greyscale() // set greyscale 
.write(__dirname + outpath, (img) => { 
  resolve(__dirname + outpath); 
}); 
} catch (error) { 
  reject(error); 
} }); 
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files: Array<string>) {
  for (let file of files) {
    fs.unlinkSync(file);
  }
}
