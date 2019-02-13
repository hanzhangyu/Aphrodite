import fs from 'fs';
import yml from 'js-yaml';
import pkgConfig from '../../package.json';

const envConfig = yml.safeLoad(fs.readFileSync('env.yml', 'utf8'));
const isDev = process.env.NODE_ENV !== 'production';
const env = isDev ? 'development' : 'production';
const CURRENT_CONFIG = envConfig[env];

export default Object.assign({}, CURRENT_CONFIG, {
    name: pkgConfig.name,
    version: pkgConfig.version,
    isDev,
});
