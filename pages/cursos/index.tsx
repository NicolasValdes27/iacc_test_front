import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { useRouter } from 'next/navigation';
import { Table, ConfigProvider } from 'antd';
import { cursosColumns } from '../helpers/tableData';
import { iaccColor } from '../helpers/defaultColor';

interface Curso {
    id: number,
    nombre: string,
    codigo: string,
    anyo: string,
    semestre: string,
    sede: string,
}


export const getServerSideProps: GetServerSideProps<{
  cursos: Curso[]
}> = async () => {
    try {
      const res = await fetch('http://localhost:3050/cursos')
      const repo = await res.json()
      return { props: { cursos: repo.cursos } }
    } catch (error) {
      console.log('Error al obtener los datos');
      return { props: { cursos: [] }}
    }

}

  
export default function Cursos({ cursos }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  if(!cursos.length) {
    return <h1>No existen cursos</h1>
  }

  return (
    <div>
        <div style={{margin: '100px'}}>
            <ConfigProvider theme={iaccColor}>
            <Table 
                dataSource={cursos} 
                columns={cursosColumns} 
                onRow={(report, _) => ({
                    onClick: (e) => 
                    router.push(`/cursos/${report.id}`)
                })}
                rowKey={(record) => record.id}
            />
            </ConfigProvider>
        </div>
    </div>
  )
}
