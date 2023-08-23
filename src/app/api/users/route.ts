import { SNSProducer } from "@/core/sns-producer";
import { UserRepository } from "@/core/user.repository";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, password, position } = await req.json();

  const userRepository = new UserRepository()

  const user = await userRepository.create({
    name,
    email,
    password,
    position,
  })

  const snsProducer = new SNSProducer()

  await snsProducer.publish({
    message: {
      name,
      email,
      position,
    },
    topicArn: process.env.SNS_TOPIC_ARN as string,
  })

  return NextResponse.json({
    user
  })
}