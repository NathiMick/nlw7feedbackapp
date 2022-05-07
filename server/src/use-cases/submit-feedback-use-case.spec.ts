import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const mockedCreatFeedback = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: mockedCreatFeedback }
)

describe("Submit feedback", () => {
    it("should be able to submit a feedback", async () => {

        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "This is a bug",
            screenshot: "data:image/png;base64,kkkkkkkkkkkkk"
        })).resolves.not.toThrow()

        expect(mockedCreatFeedback).toHaveBeenCalledTimes(1);
    })

    it("should not be able to submit a feedback without type", async () => {

        await expect(submitFeedback.execute({
            type: "",
            comment: "This is a bug",
            screenshot: "data:image/png;base64,kkkkkkkkkkkkk"
        })).rejects.toThrow()
    })

    it("should not be able to submit a feedback without a comment", async () => {

        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "",
            screenshot: "data:image/png;base64,kkkkkkkkkkkkk"
        })).rejects.toThrow()
    })

    it("should not be able to submit a feedback with a invalid screenshot format", async () => {

        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "this is a bug",
            screenshot: "screenshot.png"
        })).rejects.toThrow()
    })
});