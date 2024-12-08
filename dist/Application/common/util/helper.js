"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildHierarchy = buildHierarchy;
exports.chunkArray = chunkArray;
const uuid_1 = require("uuid");
function buildHierarchy(data) {
    const level1Map = new Map();
    const level2Map = new Map();
    const level3Map = new Map();
    const level4Map = new Map();
    const listPhoto = [];
    const startTime = new Date().getTime();
    data.forEach((item) => {
        item = item.photo;
        const photo = {
            id: item.photoKey,
            url: item.displays[2].s3Key,
            width: item.displays[2].size.width,
            height: item.displays[2].size.height,
            description: item.textLines,
            modifiedAt: item.modifiedAt,
            nodeId: '',
        };
        const levelCount = item.treeViewHierarchy.length;
        const [level1, level2, level3, level4] = item.treeViewHierarchy;
        const level1Key = `${level1.title}:${level1.value}`;
        let level1Node = level1Map.get(level1Key);
        if (!level1Node) {
            level1Node = {
                id: level1Key,
                nodeId: (0, uuid_1.v4)(),
                title: level1.title,
                value: level1.value,
                childrens: [],
            };
            level1Map.set(level1Key, level1Node);
        }
        if (levelCount === 1) {
            photo.nodeId = level1Node.nodeId;
            listPhoto.push(photo);
            return;
        }
        const level2Key = `${level1Key}|${level2.title}:${level2.value}`;
        let level2Node = level2Map.get(level2Key);
        if (!level2Node) {
            level2Node = {
                id: level2Key,
                nodeId: (0, uuid_1.v4)(),
                title: level2.title,
                value: level2.value,
                childrens: [],
            };
            level1Node.childrens.push(level2Node);
            level2Map.set(level2Key, level2Node);
        }
        if (levelCount === 2) {
            photo.nodeId = level2Node.nodeId;
            listPhoto.push(photo);
            return;
        }
        const level3Key = `${level2Key}|${level3.title}:${level3.value}`;
        let level3Node = level3Map.get(level3Key);
        if (!level3Node) {
            level3Node = {
                id: level3Key,
                nodeId: (0, uuid_1.v4)(),
                title: level3.title,
                value: level3.value,
                childrens: [],
            };
            level2Node.childrens.push(level3Node);
            level3Map.set(level3Key, level3Node);
        }
        if (levelCount === 3) {
            photo.nodeId = level3Node.nodeId;
            listPhoto.push(photo);
            return;
        }
        const level4Key = `${level3Key}|${level4.title}:${level4.value}`;
        let level4Node = level4Map.get(level4Key);
        if (!level4Node) {
            level4Node = {
                id: level4Key,
                nodeId: (0, uuid_1.v4)(),
                title: level4.title,
                value: level4.value,
                childrens: [],
            };
            level3Node.childrens.push(level4Node);
            level4Map.set(level4Key, level4Node);
        }
        if (levelCount === 4) {
            photo.nodeId = level4Node.nodeId;
            listPhoto.push(photo);
            return;
        }
    });
    const endTime = new Date().getTime();
    console.log('Build tree time:', endTime - startTime, 'ms');
    const result = {
        treeNode: Array.from(level1Map.values()),
        photos: listPhoto,
    };
    return result;
}
function chunkArray(array, size) {
    if (size <= 0)
        throw new Error('Size must be greater than 0');
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}
//# sourceMappingURL=helper.js.map