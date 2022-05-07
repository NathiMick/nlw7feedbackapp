import { useState } from "react";
import CloseButton from "../CloseButton";
import bugImage from "../../assets/bug.svg";
import thoughtImage from "../../assets/thought.svg";
import ideaImage from "../../assets/idea.svg";
import FeedbackTypeStep from "./Steps/FeedbackTypeStep";
import FeedbackContentStep from "./Steps/FeedbackContentStep";
import FeedbackSuccessStep from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
    BUG: {
        title: "Problema",
        image: {
            src: bugImage,
            alt: "Imagem de um inseto"
        },
    },
    IDEA: {
        title: "Idéia",
        image: {
            src: ideaImage,
            alt: "Imagem de uma lâmpada"
        },
    },
    OTHER: {
        title: "Outro",
        image: {
            src: thoughtImage,
            alt: "Imagem de um balão de pensamento"
    },
}
}

export type FeedbackType = keyof typeof feedbackTypes;

export default function WigetForm() {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
    const [feedbackSent, setFeedbackSent] = useState<boolean>(false);
    function handleRestartFeedback() {
        setFeedbackSent(false);
        setFeedbackType(null);
    }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
        {feedbackSent ? (
            <FeedbackSuccessStep onFeedbackRestartChanged={handleRestartFeedback} />
        ) : (
            <>
            {!feedbackType ? (
                <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
              ) : (
                  <FeedbackContentStep 
                  feedbackType={feedbackType}
                  onFeedbackRestartChanged={handleRestartFeedback}
                  onFeedbackSent={() => setFeedbackSent(true)}
                  />
                 )}
            </>
        )}
        <footer className="text-xs text-neutral-400">
        Feito com ♥
        </footer>
    </div>
  )
}