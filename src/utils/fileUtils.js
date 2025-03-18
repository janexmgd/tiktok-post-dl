import fs from 'fs';
export const checkIsExist = (filePath) => fs.existsSync(filePath);
