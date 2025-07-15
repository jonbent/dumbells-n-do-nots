import prodKeys from './keys_prod.js';
import devKeys from './keys_dev.js';
const keys = process.env.NODE_ENV === 'production' ? prodKeys : devKeys;

export const mongoURI = keys.mongoURI;
export const secretOrKey = keys.secretOrKey;
export const awsBucketAccessId = keys.awsBucketAccessId;
export const awsBucketToken = keys.awsBucketToken;
export const awsRegion = keys.awsRegion;
export const UploadFileUrlLink = keys.UploadFileUrlLink;
export const awsBucketName = keys.awsBucketName;
export const SPOONACULAR_API_KEY = keys.SPOONACULAR_API_KEY;
