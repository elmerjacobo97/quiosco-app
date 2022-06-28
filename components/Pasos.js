import { useRouter } from 'next/router';

const pasos = [
    { paso: 1, nombre: 'Menú', url: '/' },
    { paso: 2, nombre: 'Resumen', url: '/resumen' },
    { paso: 3, nombre: 'Datos y Total', url: '/total' },
];

const Pasos = () => {
    const router = useRouter();

    const calcularProgreso = () => {
        let valor;
        if (router.pathname === '/') {
            valor = 5;
        } else if (router.pathname === '/resumen') {
            valor = 50;
        } else {
            valor = 100;
        }
        return valor;
    };

    return (
        <>
            <div className='flex flex-row justify-between mb-5'>
                {pasos.map((paso) => (
                    <button
                        key={paso.paso}
                        type='button'
                        className='text-2xl font-bold hover:text-amber-500 transition'
                        onClick={() => {
                            router
                                .push(paso.url)
                                .then((r) => r)
                                .catch((e) => console.log(e));
                        }}
                    >
                        {paso.nombre}
                    </button>
                ))}
            </div>

            {/* Barra de progreso */}
            <div className='bg-gray-100 mb-10 rounded-full'>
                <div
                    className='rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white w-10'
                    style={{ width: `${calcularProgreso()}%` }}
                ></div>
            </div>
        </>
    );
};

export default Pasos;
