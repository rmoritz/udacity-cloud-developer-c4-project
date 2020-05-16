import 'source-map-support/register'
import { s3ClientWrapper } from '../utils/s3ClientWrapper'

const attachmentsBucket = process.env.ATTACHMENTS_BUCKET
const expiry = process.env.SIGNED_URL_EXPIRY

export async function getUploadUrl(todoId: string) : Promise<string> {
    return s3ClientWrapper.getSignedUrl('putObject', {
        Bucket: attachmentsBucket,
        Key: todoId,
        Expires: expiry
    })
}