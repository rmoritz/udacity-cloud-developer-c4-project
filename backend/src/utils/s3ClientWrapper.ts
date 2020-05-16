import 'source-map-support/register'
import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const options = {
    signatureVersion: 'v4'
}

const offlineOptions = {
    s3ForcePathStyle: true,
    ...options
}

function isOffline(): boolean {
    return !!process.env.IS_OFFLINE
}

const XAWS = isOffline() ? AWS : AWSXRay.captureAWS(AWS)

export const s3ClientWrapper = 
    isOffline() ? new XAWS.S3(offlineOptions) : new XAWS.S3(options)
