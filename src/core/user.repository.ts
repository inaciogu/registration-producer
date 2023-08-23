import { MongoClient } from "mongodb";
import { User } from "./user";

export class UserRepository {
  private readonly mongoClient: MongoClient

  constructor() {
    this.mongoClient = new MongoClient(process.env.MONGO_DB_URI as string)
  }

  async create(user: User): Promise<Omit<User, 'password'>> {
    await this.mongoClient.connect()
    const db = this.mongoClient.db(process.env.MONGO_DB_NAME)
    const collection = db.collection('users')
    const { insertedId } = await collection.insertOne(user)
    await this.mongoClient.close()
    return {
      id: insertedId.toString(),
      name: user.name,
      email: user.email,
      position: user.position,
    }
  }
}