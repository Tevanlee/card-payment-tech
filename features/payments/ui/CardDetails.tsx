"use client";

import { Ref } from "react";

import { Loader2 } from "lucide-react";

import dynamic from "next/dynamic";

const DynamicIframe = dynamic(() => import("./Iframe"), {
  ssr: false,
});

interface IframeProps {
  iframeRef: Ref<HTMLIFrameElement>;
  title?: string;
  src: string;
  isReady: boolean;
}

export default function CardDetails({
  iframeRef,
  title,
  src,
  isReady = false,
}: IframeProps) {
  return (
    <div className="iframeWrap h-48 sm:h-auto">
      <div className="title">
        {title && <h2 className="mb-4 font-semibold text-2xl">{title}</h2>}
      </div>
      <div className="iframe">
        {!isReady && <Loader2 className="animate-spin m-auto" size={18} />}
        <DynamicIframe src={src} ref={iframeRef} isReady={isReady} />
      </div>
    </div>
  );
}
