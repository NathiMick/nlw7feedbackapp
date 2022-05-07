import { FeedbacksRepository } from "../repositories/feedbacks-repositories";

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {
    constructor(private feedbacksRepository: FeedbacksRepository) {}
    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request;

        if(!type || !comment) {
            throw new Error("Type and comment are required");
        }
        
        if(screenshot && !screenshot.startsWith("data:image/png;base64")) {
            throw new Error("Invalid screenshot");
        }
        await this.feedbacksRepository.create({ type, comment, screenshot });
    }
}