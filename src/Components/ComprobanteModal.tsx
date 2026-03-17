import { useState } from "react";
import api from "../Api/Api";
import { Contribuyente } from "../Types/Contribuyente";

interface Props {
  open: boolean;
  onClose: () => void;
  contribuyente: Contribuyente | null;
  onCreated: () => void;
}

export default function ComprobanteModal({
  open,
  onClose,
  contribuyente,
  onCreated,
}: Props) {
  const [form, setForm] = useState({
    ncf: "",
    monto: 0,
  });

  if (!open || !contribuyente) return null;

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const crear = async () => {
    try {
      await api.post("/comprobantes", {
        rncCedula: contribuyente.rncCedula,
        ncf: form.ncf,
        monto: Number(form.monto),
      });

      onCreated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error creando comprobante, asegurese de colocar un NCF distinto");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-400px p-6">
        <h2 className="text-xl font-bold mb-4">Nuevo Comprobante</h2>

        <p className="text-sm mb-3 text-gray-600">
          Contribuyente: {contribuyente.nombre}
        </p>

        <div className="space-y-3">
          <input
            name="ncf"
            placeholder="NCF"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />

          <input
            name="monto"
            type="number"
            placeholder="Monto"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end gap-2 mt-5">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancelar
          </button>

          <button
            onClick={crear}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  );
}
