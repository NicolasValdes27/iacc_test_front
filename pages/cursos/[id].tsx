import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { Button, ConfigProvider, Space, Table } from "antd";
import { estudiantesColumns } from "../helpers/tableData";
import { iaccColor } from "../helpers/defaultColor";

interface Alumno {
  id: number,
  nombre: string,
  apellido: string,
  email: string,
  edad: number,
  direccion: string,
}

export const getServerSideProps: GetServerSideProps<{
  alumnos: Alumno[]
}> = async ({params}: any) => {
  try {
    const res = await fetch(`http://localhost:3050/cursos/${params.id}/alumnos`)
    const repo = await res.json()
    return { props: {alumnos: repo.alumnos} }
  } catch (error) {
    console.error('Error al obtener los datos');
    return { props: {alumnos: [] }}
  }
}

export default function CursoEspecifico({ alumnos }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>ID curso seleccionado: {router.query.id}</h1>
            <div style={{margin: '100px'}}>
              <ConfigProvider theme={iaccColor}>
                <Table
                    dataSource={alumnos} 
                    columns={estudiantesColumns} 
                    onRow={(report, _) => ({
                        onClick: (e) => console.log({report})
                    })}
                    rowKey={(record) => record.id}
                />
                <Space direction="horizontal" style={{width: '100%',justifyContent: 'center'}}>
                  <Button type="primary" onClick={() => router.push(`/cursos`)}>Volver</Button>
                </Space>
              </ConfigProvider>
            </div>
        </div>
    )
}