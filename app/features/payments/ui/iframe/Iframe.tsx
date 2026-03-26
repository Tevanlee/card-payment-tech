"use client";

import { Ref } from "react";

import clsx from "clsx";

import styles from "./styles/Iframe.module.css";

import { Loader2 } from "lucide-react";

interface IframeProps {
  iframeRef: Ref<HTMLIFrameElement>;
  src: string;
  isReady: boolean;
}

export default function Iframe({
  iframeRef,
  src,
  isReady = false,
}: IframeProps) {
  return (
    <div className="iframeWrap flex items-center justify-center h-48 sm:h-auto">
      {!isReady && <Loader2 className="animate-spin m-auto" size={18} />}
      <iframe
        ref={iframeRef}
        className={clsx(styles.iframe, !isReady && "hidden")}
        src={src}
      />
    </div>
  );
}
