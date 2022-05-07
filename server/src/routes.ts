import express from 'express';
import { PrismaFeedbacksRepositories } from './repositories/prisma/prisma-feedbacks-repositories';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router();

routes.post("/feedbacks", async (req, res) => {
    const { type, comment, screenshot } = req.body;
    try {
        const prismaFeedbacksRepositories = new PrismaFeedbacksRepositories();
        const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepositories);
        await submitFeedbackUseCase.execute({ type, comment, screenshot });
        return res.status(201).send();
    } catch (error) {
        res.status(500).send({ error: error });
    }
});
