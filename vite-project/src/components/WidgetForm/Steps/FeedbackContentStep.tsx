import { FormEvent, useState } from "react";
import { ArrowLeft } from "phosphor-react";
import { FeedbackType, feedbackTypes } from ".."
import CloseButton from "../../CloseButton"
import ScreenShotButton from "../ScreenShotButton";
import { api } from "../../../lib/api";
import Loading from "../../Loading";

interface FeedbackContentStepProps {
    feedbackType: FeedbackType
    onFeedbackRestartChanged: () => void
    onFeedbackSent: () => void;
}


export default function FeedbackContentStep({feedbackType, onFeedbackRestartChanged, onFeedbackSent}: FeedbackContentStepProps) {
  const [screenshot, setScreenShot] = useState<string | null>(null);
  const [comment, setComment] = useState<string>("");
  const [isSendingFeedback, setIsSendingFeedback] = useState<boolean>(false);
  const feedbackTypeInfo = feedbackTypes[feedbackType];

  const handleSubmitFeedback = async (e: FormEvent) => {
    e.preventDefault();
    setIsSendingFeedback(true);
    await api.post("/feedbacks", {
      type: feedbackType,
      comment,
      screenshot,
    })
    setIsSendingFeedback(false);    
    onFeedbackSent();
  }

  return (
    <>
      <header>
        <button 
        type="button"
        className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
        onClick={onFeedbackRestartChanged}
        >
          <ArrowLeft weight="bold" className="h-4 w-4" />
        </button>
          <span className="text-xl leading-6 flex items-center gap-2">
            <img src={feedbackTypeInfo.image.src} alt={feedbackTypeInfo.image.alt} className="h-6 w-6"/>
            {feedbackTypeInfo.title}
          </span>
          <CloseButton />
      </header>
      <form 
      onSubmit={handleSubmitFeedback}
      className="my-4 w-full"
      >
        <textarea
        className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none"
        placeholder="Conte com detalhes o que está acontecendo..."
        onChange={(e) => setComment(e.target.value)}
        >  
        </textarea>
        <footer className="flex gap-2 mt-2">
          <ScreenShotButton
          screenshot={screenshot}
          onScreenshotTook={setScreenShot}/>
          <button
          type="submit"
          disabled={comment.length === 0 || isSendingFeedback}  
          className="p-2 bg-brand-500 rounded-[4px] border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            {isSendingFeedback ? <Loading /> : "Enviar feedback"}
          </button>
        </footer>
      </form>
      
  </>
)
}
