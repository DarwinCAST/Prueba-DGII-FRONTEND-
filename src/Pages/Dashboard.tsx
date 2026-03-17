import { useEffect, useState } from "react";
import api from "../Api/Api";
import { Contribuyente, ContribuyenteDetalle } from "../Types/Contribuyente";
import { Comprobante } from "../Types/Comprobante";

import ContribuyenteModal from "../Components/ContribuyenteModal";
import ComprobanteModal from "../Components/ComprobanteModal";

export default function Dashboard() {
  const [contribuyentes, setContribuyentes] = useState<Contribuyente[]>([]);
  const [comprobantes, setComprobantes] = useState<Comprobante[]>([]);
  const [selected, setSelected] = useState<Contribuyente | null>(null);
  const [totalITBIS, setTotalITBIS] = useState<number>(0);

  const [openContribuyente, setOpenContribuyente] = useState(false);
  const [openComprobante, setOpenComprobante] = useState(false);

  useEffect(() => {
    cargarContribuyentes();
  }, []);

  const cargarContribuyentes = async () => {
    try {
      const res = await api.get<Contribuyente[]>("/contribuyentes");

      setContribuyentes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const seleccionarContribuyente = async (c: Contribuyente) => {
    setSelected(c);

    try {
      const res = await api.get<ContribuyenteDetalle>(
        `/contribuyentes/${c.rncCedula}/comprobantes`,
      );

      setComprobantes(res.data.comprobantes);
      setTotalITBIS(res.data.totalITBIS);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-8">DGII Prueba</h1>

      <div className="grid grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Contribuyentes</h2>

          <ul className="space-y-3">
            {contribuyentes.map((c) => (
              <li
                key={c.id}
                onClick={() => seleccionarContribuyente(c)}
                className="p-4 border rounded-lg cursor-pointer hover:bg-blue-50"
              >
                <div className="font-semibold">{c.nombre}</div>

                <div className="text-sm text-gray-500">{c.rncCedula}</div>
              </li>
            ))}
          </ul>

          <div className="flex gap-2 mt-6">
            <button
              onClick={() => setOpenContribuyente(true)}
              className="flex-1 bg-blue-600 text-white py-2 rounded"
            >
              Crear Contribuyente
            </button>

            <button
              onClick={() => {
                if (!selected) {
                  alert("Seleccione un contribuyente");
                  return;
                }

                setOpenComprobante(true);
              }}
              className="flex-1 bg-green-600 text-white py-2 rounded"
            >
              Crear Comprobante
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Comprobantes</h2>

          {selected && (
            <>
              <p className="mb-4 text-gray-700">
                <strong>{selected.nombre}</strong>
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-gray-600">
                      <th className="text-left pb-2">NCF</th>
                      <th className="text-right pb-2">Monto</th>
                      <th className="text-right pb-2">ITBIS</th>
                    </tr>
                  </thead>

                  <tbody>
                    {comprobantes.map((c, i) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="py-2">{c.ncf}</td>

                        <td className="text-right py-2">
                          ${c.monto.toFixed(2)}
                        </td>

                        <td className="text-right py-2 text-blue-700 font-semibold">
                          ${c.itbis18.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 text-right text-lg font-bold text-blue-700">
                Total ITBIS: ${totalITBIS.toFixed(2)}
              </div>
            </>
          )}
        </div>
      </div>

      <ContribuyenteModal
        open={openContribuyente}
        onClose={() => setOpenContribuyente(false)}
        onCreated={cargarContribuyentes}
      />

      <ComprobanteModal
        open={openComprobante}
        onClose={() => setOpenComprobante(false)}
        contribuyente={selected}
        onCreated={() => {
          if (selected) seleccionarContribuyente(selected);
        }}
      />
    </div>
  );
}
