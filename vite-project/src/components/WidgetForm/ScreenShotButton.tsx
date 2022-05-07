import { useState } from 'react';
import { Camera, Trash } from 'phosphor-react';
import html2canvas from 'html2canvas';
import Loading from '../Loading';

interface ScreenShotButtonProps {
    screenshot: string | null;
    onScreenshotTook: (screenshot: string | null) => void
}

export default function ScreenShotButton({ screenshot, onScreenshotTook }: ScreenShotButtonProps) {
    const [isTakingScreenshot, setIsTakingScreenshot] = useState<boolean>(false);
  async function handleTakeScreenShot() {
      setIsTakingScreenshot(true);
      const canvas = await html2canvas(document.querySelector("html")!);
      const base64image = canvas.toDataURL("image/png");
      onScreenshotTook(base64image);
      setIsTakingScreenshot(false);
  }

  if(screenshot) {
    return (
        <button
        type="button"
        className="p-1 w-10 h-10 rounded-[4px] border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
        onClick={() => onScreenshotTook(null)}
        style={{
            backgroundImage: `url(${screenshot})`,
        }}
        >
        <Trash weight="fill"/>
        </button>
    )
    }
    return (
        <button
        type="button"
        className="p-2 bg-zinc-800 rounded-[4px] border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
        onClick={handleTakeScreenShot}
        >
            {isTakingScreenshot ? <Loading /> : <Camera weight="bold" className="h-6 w-6" />}
        </button>
  )
}
