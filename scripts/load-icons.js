import fs from 'fs';
import path from 'path';

// Fill these
// 1.
const ICONS_FOLDER_LOCATION = "./assets/icons";
// 2.
const INDEX_EXPORT_LOCATION = "./assets/icons/index.ts";

function installIcons() {
    const fileNames = getFileNames(ICONS_FOLDER_LOCATION);
    const exportStatements = [];
    for (let i = 0; i < fileNames.length; i++) {
        if (fileNames[i] === "index.ts") continue;
        const iconExport = `export { default as ${fileNames[i].split(".")[0]} } from "./${fileNames[i]}"`;
        exportStatements.push(iconExport);
    }
    
    fs.writeFileSync(INDEX_EXPORT_LOCATION, exportStatements.join('\n'), 'utf8');
    console.log("\n ✔ Successfully installed icons", "\n\n", fileNames);
}

function getFileNames(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getFileNames(filePath, fileList);
        } else {
            fileList.push(file);
        }
    });
    
    return fileList;
}

installIcons();