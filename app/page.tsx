"use client";

import { useCards } from "../features/payments/hooks/useCards";
import { useIframeEvents } from "../features/payments/hooks/useIframeEvents";

import Cards from "../features/payments/ui/methods/saved-cards/Cards";
import Toggler from "../ui/base/Toggler";
import Button from "../ui/base/Button";
import CardDetails from "@/features/payments/ui/CardDetails";
import ToastNotification from "../ui/toast/ToastNotification";

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
    amountToPay,
    sendCardDetailsForTokenization,
  } = useIframeEvents();

  return (
    <div className="homepage h-full">
      <div className="wrapper max-w-4xl px-4 m-auto h-full">
        <div className="relative h-full w-full max-w-md m-auto flex flex-col gap-5 justify-center">
          {/* Payment methods */}
          <Cards
            cards={savedCards}
            selected={selectedCardToken}
            toggleSelected={selectACard}
            onDelete={onDelete}
          />

          {/* HPP card details iframe */}
          <CardDetails
            iframeRef={iframe}
            src={TARGET_URL}
            isReady={isReady}
            title="Card details"
          />

          {/* Toggle to save a card if card details are valid */}
          <Toggler
            checked={saveCard && !selectedCardToken}
            label="Save card"
            onChange={setToggle}
          />

          {/* Submit card for tokenization or use a saved card to make a payment  */}
          <Button
            type="submit"
            loading={loading}
            onClick={sendCardDetailsForTokenization}
          >
            {`Pay ${amountToPay} EUR(Fee included)`}
          </Button>

          {/* Toast popup to relay feedback */}
          {toast && (
            <ToastNotification message={toast.message} type={toast.status} />
          )}
        </div>
      </div>
    </div>
  );
}
