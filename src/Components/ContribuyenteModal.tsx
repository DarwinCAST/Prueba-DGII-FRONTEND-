import { useState } from "react";
import api from "../Api/Api";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export default function ContribuyenteModal({
  open,
  onClose,
  onCreated,
}: Props) {
  const [form, setForm] = useState({
    rncCedula: "",
    nombre: "",
    tipo: "",
    estatus: "activo",
  });

  if (!open) return null;

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const crear = async () => {
    try {
      await api.post("/contribuyentes", form);

      onCreated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error creando contribuyente");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-400px p-6">
        <h2 className="text-xl font-bold mb-4">Crear Contribuyente</h2>

        <div className="space-y-3">
          <input
            name="rncCedula"
            placeholder="RNC/Cédula"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />

          <input
            name="nombre"
            placeholder="Nombre"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />

          <input
            name="tipo"
            placeholder="Tipo (PERSONA FISICA)"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />

          <select
            name="estatus"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>

        <div className="flex justify-end gap-2 mt-5">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancelar
          </button>

          <button
            onClick={crear}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  );
}
