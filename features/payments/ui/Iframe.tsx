"use client";

import { Ref } from "react";

import clsx from "clsx";

import styles from "./styles/Iframe.module.css";

interface IframeProps {
  ref: Ref<HTMLIFrameElement>;
  src: string;
  isReady: boolean;
}

export default function Iframe({ ref, src, isReady }: IframeProps) {
  return (
    <iframe
      ref={ref}
      className={clsx(styles.iframe, !isReady && "hidden")}
      src={src}
    />
  );
}
