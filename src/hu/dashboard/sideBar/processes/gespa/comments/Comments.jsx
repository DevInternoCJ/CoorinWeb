import React, { useRef, useState } from "react";
import ModalBase from "../../../../board/ModalBase";
import ModalHeader from "../../../../sideBar/Administration/gespa/ModalHeader";
import IconCircular from "../../../../../../components/iconos/IconCircular";
import { IconPhrases } from "../../../../sideBar/Administration/gespa/IconsTemplates";

const Comments = ({ onClose }) => {
  const modalRef = useRef(null);
  const { bounce } = ModalBase.useModalLogic();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [verifyResult, setVerifyResult] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="modal-blur-bg overflow-hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className={`${
          bounce ? "animate-bounce-modal" : ""
        } bg-white rounded-lg shadow-2xl w-full max-w-4xl overflow-hidden border border-gray-300 flex flex-col max-h-[90vh]`}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader
          icon={
            <IconCircular size="size-10">
              <IconPhrases className="size-6" />
            </IconCircular>
          }
          title="Frases"
          onClose={onClose}
          selectedProduct={selectedProduct}
          verifyResult={verifyResult}
          setVerifyResult={setVerifyResult}
          loading={loading}
          setLoading={setLoading}
        />
        <div>
          <h1 className=" text-2xl"> Comments</h1>
        </div>
      </div>
    </div>
  );
};

export default Comments;
