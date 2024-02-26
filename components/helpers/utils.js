import fs from 'fs';
import util from 'util';

export const updateConfig = (newConfig) => {
    const newConfigObject = "export default " + util.inspect(newConfig, {showHidden: false, compact: false, depth: null});
    fs.writeFileSync('./config.js', newConfigObject, 'utf-8');
}
