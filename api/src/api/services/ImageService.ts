/*
 * SpurtCommerce API
 * version 4.4
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import * as path from 'path';
import * as fs from 'fs';
import extract = require('extract-zip');

@Service()
export class ImageService {
    // Bucket list
    public async listFolders(limit: number = 0, marker: string = '', folderName: string = ''): Promise<any> {
        const directoryPath = path.join(process.cwd(), 'uploads' + '/' + folderName);
        const files = await this.readDir(directoryPath);
        const contents = [];
        const commonPrefix = [];
        let filess;
        let val;
        if (marker) {
            const index = files.indexOf(marker);
            filess = files.slice(index).slice(0, limit);
            val = files.splice(index);
        } else {
            filess = files.slice(marker).slice(0, limit);
            val = files.splice(marker);
        }
        const vl = JSON.stringify(val);
        const parse = JSON.parse(vl);
        const markerValue = parse[limit];
        for (const file of filess) {
            const pathfile = path.resolve(directoryPath, file);
            const isDir = await this.isDirCheck(pathfile);
            if (isDir) {
                commonPrefix.push({
                    Prefix: folderName ? folderName + file + '/' : file + '/',
                });
            } else {
                contents.push({
                    Key: folderName ? folderName + file : file,
                });
            }
        }
        return new Promise((resolve, reject) => {
            // passsing directoryPath and callback function
            const outputResponse: any = {};
            outputResponse.Name = 'uploads';
            outputResponse.Prefix = folderName;
            outputResponse.Delimiter = 100;
            outputResponse.Marker = '';
            if (markerValue) {
                outputResponse.NextMarker = markerValue;
                outputResponse.IsTruncated = true;
            } else {
                outputResponse.NextMarker = '';
                outputResponse.IsTruncated = false;
            }
            outputResponse.Contents = contents;
            outputResponse.CommonPrefixes = commonPrefix;
            resolve(outputResponse);
        });
    }

    // create folder
    public createFolder(folderName: string = ''): Promise<any> {
        const directoryPath = path.join(process.cwd(), 'uploads' + '/' + folderName);
        return new Promise((resolve, reject) => {
            if (fs.existsSync(directoryPath)) {
                resolve({ ETAG: new Date() });
            }
            fs.mkdir(directoryPath, { recursive: true }, (err) => {
                if (err) {
                    reject(err);
                }
                resolve({ ETAG: new Date() });
            });
        });
    }

    // upload image
    public imageUpload(folderName: string = '', base64Image: any): Promise<any> {
        const directoryPath = path.join(process.cwd(), 'uploads' + '/' + folderName);
        return new Promise((resolve, reject) => {
            fs.writeFile(directoryPath, base64Image, 'base64', (err) => {
                if (err) {
                    reject(err);
                }
                const locationArray = directoryPath.split('/');
                locationArray.pop();
                const locationPath = locationArray.join('/');
                resolve({ success: true, path: locationPath });
            });
        });
    }

    // Image resize
    public async resizeImage(imgName: string = '', imgPath: string = '', widthString: string = '', heightString: string = ''): Promise<any> {
        const directoryPath = path.join(process.cwd(), 'uploads' + '/' + imgPath + imgName);
        return new Promise((resolve, reject) => {
            const gm = require('gm').subClass({ imageMagick: true });
            return gm(directoryPath)
                .resize(widthString, heightString)
                .toBuffer((error: any, buffer: any) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(buffer);
                    }
                });
        });
    }

    // Image resize
    public async resizeImageBase64(imgName: string = '', imgPath: string = '', widthString: string = '', heightString: string = ''): Promise<any> {
        const directoryPath = path.join(process.cwd(), 'uploads' + '/' + imgPath + imgName);
        const ext = imgName.split('.');
        const imagePrefix = 'data:image/' + ext[1] + ';base64,';
        return new Promise((resolve, reject) => {
            const gm = require('gm').subClass({ imageMagick: true });
            return gm(directoryPath)
                .resize(widthString, heightString)
                .toBuffer((error: any, buffer: any) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(imagePrefix + buffer.toString('base64'));
                    }
                });
        });
    }

    public async isDirCheck(pathfile: string): Promise<boolean> {
        return new Promise<boolean>((subresolve, subreject) => {
            fs.stat(pathfile, (error, stat) => {
                if (stat && stat.isDirectory()) {
                    subresolve(true);
                } else {
                    subresolve(false);
                }
            });
        });
    }

    public async readDir(pathfile: string): Promise<any> {
        return new Promise<any>((subresolve, subreject) => {
            fs.readdir(pathfile, (error, files) => {
                if (error) {
                    subreject(error);
                }
                subresolve(files);
            });
        });
    }

    public deleteFile(fileName: string = ''): Promise<any> {
        // Create the parameters for calling createBucket
        const directoryPath = path.join(process.cwd(), 'uploads' + '/' + fileName);
        return new Promise((resolve, reject) => {

            fs.unlink(directoryPath, (err) => {
                if (err) {
                    reject(err);
                }
                resolve({ success: true, message: 'successfully deleted file' });
            });
        });
    }

    public writeFile(fileName: string = '', buffer: any = ''): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.writeFile(fileName, buffer, ((err) => {
                if (err) {
                    reject(err);
                }
                resolve({ success: true, message: 'successfully write file' });
            }));
        });
    }

    public convertXlToJson(dirpath: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const xlsxj = require('xlsx-to-json');
            xlsxj({
                input: dirpath,
                // tslint:disable-next-line:no-null-keyword
                output: null,
                sheet: 'productData',
            }, ((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }));
        });
    }

    public extractZip(fileName: string = '', distPath: any = ''): Promise<any> {
        return new Promise((resolve, reject) => {
            extract(fileName, { dir: distPath }, ((er) => {
                if (er) {
                    reject(er);
                }
                resolve({ success: true, message: 'Successfully Extract Zip' });
            }));
        });
    }

    // search folders
    public async getFolder(folderName: string = ''): Promise<any> {

        return new Promise(async (resolve, reject) => {
            const pathName = path.join(process.cwd(), 'uploads');
            const files = await this.readDir(pathName);
            const contents = [];
            const commonPrefix = [];
            if (folderName !== '') {
                files.forEach(async file => {
                    if (file.includes(folderName) === true) {
                        commonPrefix.push({ Prefix: file + '/' });
                    }
                });
            } else {
                for (const file of files) {
                    const pathfile = path.resolve(path.join(process.cwd(), 'uploads' + '/' + file));
                    const isDir = await this.isDirCheck(pathfile);
                    if (isDir) {
                        commonPrefix.push({
                            Prefix: file + '/',
                        });
                    } else {
                        contents.push({
                            Key: file,
                        });
                    }

                }
            }

            const outputResponse: any = {};
            outputResponse.IsTruncated = false;
            outputResponse.Name = 'uploads';
            outputResponse.Content = contents;
            outputResponse.Prefix = folderName;
            outputResponse.CommonPrefixes = commonPrefix;
            resolve(outputResponse);
        });
    }

    public fileUpload(folderName: string = '', base64: any): Promise<any> {
        // Create the parameters for calling createBucket
        const directoryPath = path.join(process.cwd(), 'uploads' + '/' + folderName);
        return new Promise((resolve, reject) => {
            fs.writeFile(directoryPath, base64, 'base64', (err) => {
                if (err) {
                    reject(err);
                }
                const locationArray = directoryPath.split('/');
                locationArray.pop();
                const locationPath = locationArray.join('/');
                resolve({ success: true, path: locationPath });
            });
        });
    }

    public fileDownload(folderName: string = '', dataFile: any): Promise<any> {
        // Create the parameters for calling createBucket
        const directoryPath = path.join(process.cwd(), 'uploads' + '/' + folderName + '/' + dataFile);
        return new Promise((resolve, reject) => {
            resolve(directoryPath);
        });
    }
}
