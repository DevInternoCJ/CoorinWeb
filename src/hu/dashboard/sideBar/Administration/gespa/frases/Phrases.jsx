import React, { useState, useRef } from "react";
import ModalHeader from "../ModalHeader";
import ModalBase from "../../../../board/ModalBase";
import { IconScreens } from "../IconsTemplates";
import { useWalletProducts } from "../../../../../login/WalletProduct";
import IconCircular from "../../../../../../components/iconos/IconCircular";
import { InputPhrases } from "./InputPhrases";
import SavePhrases from "./SavePhrases";

const Phrases = ({ onClose }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [verifyResult, setVerifyResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const modalRef = useRef(null);
  const { bounce } = ModalBase.useModalLogic();
  const { walletProducts } = useWalletProducts();
  const idProducto = walletProducts?.[0]?.idProducto;
  const idCartera = walletProducts?.[0]?.idCartera;

  return (
    <div className="modal-blur-bg overflow-hidden fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className={`${
          bounce ? " animate-bounce-modal" : ""
        } bg-white rounded-lg shadow-2xl w-2xl max-w-6xl max-h-[90vh] overflow-hidden border border-gray-300`}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader
          icon={
            <IconCircular size="size-10">
              <IconScreens className="size-6" />
            </IconCircular>
          }
          title="Frases"
          onClose={onClose}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          verifyResult={verifyResult}
          setVerifyResult={setVerifyResult}
          loading={loading}
          setLoading={setLoading}
        />
        <div className=" flex items-center mt-3 gap-3 px-6 pb-6 overflow-y-auto max-h-[calc(90vh-120px)] bg-gray-50 space-y-4">
          <div className="flex mb-0">
            <input
              type="checkbox"
              className="shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
              id="hs-default-checkbox"
            />
            <label
              for="hs-default-checkbox"
              className="text-sm text-gray-500 ms-3 dark:text-neutral-400"
            >
              Agregar
            </label>
          </div>
          <div className="flex">
            <input
              type="checkbox"
              className="shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
              id="hs-default-checkbox"
            />
            <label
              for="hs-default-checkbox"
              className="text-sm text-gray-500 ms-3 dark:text-neutral-400"
            >
              Activar
            </label>
          </div>
        </div>
        <InputPhrases />
        <SavePhrases/>
      </div>
    </div>
  );
};

export default Phrases;
