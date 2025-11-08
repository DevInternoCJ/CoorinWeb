import React from "react";

const InputsMetas = ({
    inputValues,
    setInputValues,
    validationState,
    validateAndSetField,
    WarningIcon
}) => {
    // Handler genérico para cambios en los inputs
    const handleInputChange = (field) => (e) => {
        const value = e.target.value;
        setInputValues((prev) => ({ ...prev, [field]: value }));
        validateAndSetField(field, value);
    };

    // Handler para blur (validación requerida)
    const handleInputBlur = (field) => (e) => {
        validateAndSetField(field, e.target.value, undefined, true, "blur");
    };

    return (
    <div className="flex flex-col gap-2 w-full p-4 bg-white rounded-lg shadow-md border border-gray-200">
            {/* Primera fila: 5 campos */}
            <div className="grid grid-cols-5 gap-2 mb-2">
                {/* Cuentas */}
                <div className="flex flex-col">
                    <label className="font-semibold text-sm mb-1">Cuentas</label>
                    <input
                        type="number"
                        className={`input input-bordered ${validationState.cuentas.requiredError ? "border-yellow-400" : ""}`}
                        value={inputValues.cuentas}
                        onChange={handleInputChange("cuentas")}
                        onBlur={handleInputBlur("cuentas")}
                        min={0}
                        max={999999999}
                        placeholder="Cuentas"
                    />
                    {validationState.cuentas.showIcon && <span>{WarningIcon}</span>}
                </div>
                {/* Titulares */}
                <div className="flex flex-col">
                    <label className="font-semibold text-sm mb-1">Titulares</label>
                    <input
                        type="number"
                        className={`input input-bordered ${validationState.titulares.requiredError ? "border-yellow-400" : ""}`}
                        value={inputValues.titulares}
                        onChange={handleInputChange("titulares")}
                        onBlur={handleInputBlur("titulares")}
                        min={0}
                        max={999999999}
                        placeholder="Titulares"
                    />
                    {validationState.titulares.showIcon && <span>{WarningIcon}</span>}
                </div>
                {/* Negociaciones */}
                <div className="flex flex-col">
                    <label className="font-semibold text-sm mb-1">Negociaciones</label>
                    <input
                        type="number"
                        className={`input input-bordered ${validationState.negociaciones.requiredError ? "border-yellow-400" : ""}`}
                        value={inputValues.negociaciones}
                        onChange={handleInputChange("negociaciones")}
                        onBlur={handleInputBlur("negociaciones")}
                        min={0}
                        max={255}
                        placeholder="Negociaciones"
                    />
                    {validationState.negociaciones.showIcon && <span>{WarningIcon}</span>}
                </div>
                {/* Cumplimientos */}
                <div className="flex flex-col">
                    <label className="font-semibold text-sm mb-1">Cumplimientos</label>
                    <input
                        type="number"
                        className={`input input-bordered ${validationState.cumplimientos.requiredError ? "border-yellow-400" : ""}`}
                        value={inputValues.cumplimientos}
                        onChange={handleInputChange("cumplimientos")}
                        onBlur={handleInputBlur("cumplimientos")}
                        min={0}
                        max={255}
                        placeholder="Cumplimientos"
                    />
                    {validationState.cumplimientos.showIcon && <span>{WarningIcon}</span>}
                </div>
                {/* Monto Cumplido */}
                <div className="flex flex-col">
                    <label className="font-semibold text-sm mb-1">Monto Cumplido</label>
                    <input
                        type="text"
                        className={`input input-bordered ${validationState.montoCumplido.requiredError ? "border-yellow-400" : ""}`}
                        value={inputValues.montoCumplido}
                        onChange={handleInputChange("montoCumplido")}
                        onBlur={handleInputBlur("montoCumplido")}
                        placeholder="$0.00"
                    />
                    {validationState.montoCumplido.showIcon && <span>{WarningIcon}</span>}
                </div>
            </div>
            {/* Segunda fila: 4 campos */}
            <div className="grid grid-cols-4 gap-2">
                {/* Saldo Solucionado */}
                <div className="flex flex-col">
                    <label className="font-semibold text-sm mb-1">Saldo Solucionado</label>
                    <input
                        type="text"
                        className={`input input-bordered ${validationState.saldoSolucionado.requiredError ? "border-yellow-400" : ""}`}
                        value={inputValues.saldoSolucionado}
                        onChange={handleInputChange("saldoSolucionado")}
                        onBlur={handleInputBlur("saldoSolucionado")}
                        placeholder="$0.00"
                    />
                    {validationState.saldoSolucionado.showIcon && <span>{WarningIcon}</span>}
                </div>
                {/* Segmento */}
                <div className="flex flex-col">
                    <label className="font-semibold text-sm mb-1">Segmento</label>
                    <input
                        type="text"
                        className="input input-bordered"
                        value={inputValues.segmento}
                        onChange={handleInputChange("segmento")}
                        placeholder="Segmento"
                    />
                </div>
                {/* Hora Entrada */}
                <div className="flex flex-col">
                    <label className="font-semibold text-sm mb-1">H. Entrada</label>
                    <input
                        type="time"
                        className={`input input-bordered ${validationState.horaEntrada.requiredError ? "border-yellow-400" : ""}`}
                        value={inputValues.horaEntrada}
                        onChange={handleInputChange("horaEntrada")}
                        onBlur={handleInputBlur("horaEntrada")}
                        min="07:00"
                        max="12:00"
                        placeholder="HH:MM"
                    />
                    {validationState.horaEntrada.showIcon && <span>{WarningIcon}</span>}
                </div>
                {/* Hora Salida */}
                <div className="flex flex-col">
                    <label className="font-semibold text-sm mb-1">H. Salida</label>
                    <input
                        type="time"
                        className={`input input-bordered ${validationState.horaSalida.requiredError ? "border-yellow-400" : ""}`}
                        value={inputValues.horaSalida}
                        onChange={handleInputChange("horaSalida")}
                        onBlur={handleInputBlur("horaSalida")}
                        min="16:00"
                        max="22:00"
                        placeholder="HH:MM"
                    />
                    {validationState.horaSalida.showIcon && <span>{WarningIcon}</span>}
                </div>
            </div>
        </div>
    );
};

export default InputsMetas;
