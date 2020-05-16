import 'source-map-support/register'
import { createS3Client } from '../utils/s3'

const s3 = createS3Client()
const attachmentsBucket = process.env.ATTACHMENTS_BUCKET
const expiry = process.env.SIGNED_URL_EXPIRY

export async function getUploadUrl(todoId: string) : Promise<string> {
    return s3.getSignedUrl('putObject', {
        Bucket: attachmentsBucket,
        Key: todoId,
        Expires: expiry
    })
}