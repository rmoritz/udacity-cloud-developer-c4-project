import 'source-map-support/register'
import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const options = {
    region: "localhost",
    endpoint: "http://localhost:8000"
}

function isOffline(): boolean {
    return !!process.env.IS_OFFLINE
}

const XAWS = isOffline() ? AWS : AWSXRay.captureAWS(AWS)

export const dynamoDbWrapper = {
    doc: isOffline() ? new XAWS.DynamoDB.DocumentClient(options) : new XAWS.DynamoDB.DocumentClient(),
    raw: isOffline() ? new XAWS.DynamoDB(options) : new XAWS.DynamoDB()
}
