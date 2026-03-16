import { useEffect, useState } from "react";
import api from "../Api/Api";
import { Contribuyente, ContribuyenteDetalle } from "../Types/Contribuyente";
import { Comprobante } from "../Types/Comprobante";

export default function Dashboard() {
  const [contribuyentes, setContribuyentes] = useState<Contribuyente[]>([]);
  const [comprobantes, setComprobantes] = useState<Comprobante[]>([]);
  const [selected, setSelected] = useState<Contribuyente | null>(null);
  const [totalITBIS, setTotalITBIS] = useState<number>(0);

  useEffect(() => {
    cargarContribuyentes();
  }, []);

  const cargarContribuyentes = async () => {
    try {
      const res = await api.get<Contribuyente[]>("/contribuyentes");

      setContribuyentes(res.data);
    } catch (err) {
      console.error("Error cargando contribuyentes", err);
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
      console.error("Error cargando comprobantes", err);
      setComprobantes([]);
      setTotalITBIS(0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-8">DGII Prueba</h1>

      <div className="grid grid-cols-2 gap-8">
        {/* CONTRIBUYENTES */}

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Contribuyentes</h2>

          <ul className="space-y-3">
            {contribuyentes.map((c) => (
              <li
                key={c.id}
                onClick={() => seleccionarContribuyente(c)}
                className="p-4 border rounded-lg cursor-pointer hover:bg-blue-50 transition"
              >
                <div className="font-semibold">{c.nombre}</div>

                <div className="text-sm text-gray-500">
                  RNC/Cédula: {c.rncCedula}
                </div>

                <div className="text-xs text-gray-400">
                  Comprobantes: {c.cantidadComprobantes}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* COMPROBANTES */}

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Comprobantes</h2>

          {selected == null && (
            <p className="text-gray-500">Seleccione un contribuyente</p>
          )}

          {selected && (
            <>
              <p className="mb-4 text-gray-600">
                <strong>{selected.nombre}</strong>
                <br />
                RNC/Cédula: {selected.rncCedula}
              </p>

              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-2">NCF</th>
                    <th className="text-right pb-2">Monto</th>
                    <th className="text-right pb-2">ITBIS</th>
                  </tr>
                </thead>

                <tbody>
                  {comprobantes.map((c, i) => (
                    <tr key={i} className="border-b">
                      <td>{c.ncf}</td>

                      <td className="text-right">${c.monto.toFixed(2)}</td>

                      <td className="text-right">${c.itbis18.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-6 text-right text-lg font-bold text-blue-700">
                Total ITBIS: ${totalITBIS.toFixed(2)}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
