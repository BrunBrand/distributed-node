import {dirname as __dirname} from 'path';
import { fileURLToPath } from 'url';


const dirname = __dirname(fileURLToPath(import.meta.url));

export default dirname;