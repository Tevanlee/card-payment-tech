import { renderHook, act } from "@testing-library/react";
import { useIframeEvents } from "../hooks/useIframeEvents";

import { DOMAIN, SOURCE, MESSAGES, TARGET_URL } from "../constants";

describe("useIframeEvents tests", () => {
  it("Set isReady when stylesAdded event message is received", async () => {
    const { result } = renderHook(() => useIframeEvents());
    await act(async () => {});

    act(() => {
      window.dispatchEvent(
        new MessageEvent("message", {
          origin: DOMAIN,
          data: {
            source: SOURCE,
            type: MESSAGES.stylesAdded,
          },
        }),
      );
    });

    expect(result.current.isReady).toBe(true);
  });

  it("Set a toast and stop loading on validation error event message", async () => {
    const { result } = renderHook(() => useIframeEvents());
    await act(async () => {});

    act(() => {
      window.dispatchEvent(
        new MessageEvent("message", {
          origin: DOMAIN,
          data: {
            source: SOURCE,
            type: MESSAGES.validationError,
            payload: { message: "Invalid card details" },
          },
        }),
      );
    });

    expect(result.current.toast).toEqual({ message: "Invalid card details" });
    expect(result.current.loading).toBe(false);
  });

  it("Send a tokenizeCard message when no saved card is being used", async () => {
    const { result } = renderHook(() => useIframeEvents());
    await act(async () => {});

    const postMessageMock = jest.fn();

    act(() => {
      result.current.iframe.current = {
        contentWindow: {
          postMessage: postMessageMock,
        },
      } as any;
    });

    await act(async () => {
      result.current.submitCardForTokenization();
    });

    expect(postMessageMock).toHaveBeenCalledWith(
      {
        type: MESSAGES.tokenizeCard,
        payload: {},
      },
      TARGET_URL,
    );
  });
});

// The above are the only tests we have for purposes of this test
