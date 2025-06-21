export interface MunicipiosPorDepartamento {
    id: number,
    municipio: string,
    departamento: {
      id: number,
      departamento: string
    }
}
