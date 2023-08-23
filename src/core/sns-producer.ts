import { SNSHandler } from "@coaktion/aws";

export class SNSProducer extends SNSHandler {
  constructor() {
    super({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      },
    })
  }
}