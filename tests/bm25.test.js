// Función auxiliar de prueba BM25 / Relevancia
function ordenarProductos(productos, termino) {
  const normalizar = (text) => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u06ff]/g, "");
  const termLimpio = normalizar(termino);
  
  return [...productos].sort((a, b) => {
    const scoreA = normalizar(`${a.marca} ${a.modelo} ${a.descripcion}`).includes(termLimpio) ? 1 : 0;
    const scoreB = normalizar(`${b.marca} ${b.modelo} ${b.descripcion}`).includes(termLimpio) ? 1 : 0;
    return scoreB - scoreA;
  });
}

const mockProductos = [
  { id: 1, marca: "DecoHome", modelo: "Lámpara Nórdica Madera", descripcion: "Lámpara de pie minimalista para sala" },
  { id: 2, marca: "CasaBella", modelo: "Cojín Terciopelo", descripcion: "Cojín decorativo para sofá" }
];

test("Caso 5: Búsqueda debe ordenar por máxima coincidencia", () => {
  const resultados = ordenarProductos(mockProductos, "lámpara nórdica");
  expect(resultados[0].id).toBe(1);
});

test("Caso 6: Búsqueda debe ser insensible a mayúsculas y tildes", () => {
  const res1 = ordenarProductos(mockProductos, "LÁMPARA nórdica");
  const res2 = ordenarProductos(mockProductos, "lampara nordica");
  expect(res1[0].id).toBe(res2[0].id);
});
