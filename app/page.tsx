"use client";

import { useCards } from "./features/payments/hooks/useCards";
import { useIframeEvents } from "./features/payments/hooks/useIframeEvents";

import Cards from "./features/payments/ui/cards/Cards";
import Form from "./ui/base/Form";
import Toggler from "./ui/base/Toggler";
import Button from "./ui/base/Button";
import Iframe from "./features/payments/ui/iframe/Iframe";
import ToastNotification from "./ui/toast/ToastNotification";

export default function Home() {
  const {
    savedCards,
    onDelete,
    selectedCardToken,
    selectACard,
    saveCard,
    setToggle,
  } = useCards();

  const {
    iframe,
    TARGET_URL,
    isReady,
    loading,
    toast,
    submitCardForTokenization,
  } = useIframeEvents();

  return (
    <div className="homepage h-full">
      <div className="wrapper max-w-4xl px-4 m-auto h-full">
        <div className="payments relative h-full w-full max-w-md m-auto flex flex-col gap-5 justify-center">
          <Cards
            cards={savedCards}
            selected={selectedCardToken}
            toggleSelected={selectACard}
            onDelete={onDelete}
          />

          <Form onSubmit={submitCardForTokenization}>
            <h2 className="mb-4 font-semibold text-2xl">Card details</h2>
            <Iframe iframeRef={iframe} src={TARGET_URL} isReady={isReady} />
            <Toggler
              checked={saveCard}
              label="Save card"
              onChange={setToggle}
            />
            <Button type="submit" loading={loading}>
              {"Pay 100.00 EUR(Fee included)"}
            </Button>
          </Form>
          {toast && (
            <ToastNotification message={toast.message} type={toast.status} />
          )}
        </div>
      </div>
    </div>
  );
}
