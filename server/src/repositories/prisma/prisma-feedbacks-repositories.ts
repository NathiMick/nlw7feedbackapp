import { prisma } from "../../prisma";
import { FeedbackCreateDate, FeedbacksRepository } from "../feedbacks-repositories";

export class PrismaFeedbacksRepositories implements FeedbacksRepository {
    async create({type, comment, screenshot}: FeedbackCreateDate) {
        await prisma.feedback.create({
            data: {
                type,
                comment,
                screenshot,
            }
        })
    }
}