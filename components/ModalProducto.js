import { useEffect, useState } from 'react';
import Image from 'next/image';
import useQuiosco from '../hooks/useQuiosco';
import { formatearDinero } from '../helpers';

const ModalProducto = () => {
    const [edition, setEdition] = useState(false);

    const { producto, handleChangeModal, handleAgregarPedido, pedido } =
        useQuiosco();
    const [cantidad, setCantidad] = useState(1);

    useEffect(() => {
        // Comprobar si el Modal Actual está en el pedido
        if (pedido.some((pedidoState) => pedidoState.id === producto.id)) {
            const productoEdition = pedido.find(
                (pedidoState) => pedidoState.id === producto.id
            );
            setEdition(true);
            setCantidad(productoEdition.cantidad);
        }
    }, []);

    return (
        <div className='md:flex gap-10'>
            <div className='md:w-1/3'>
                <Image
                    className='animate__animated animate__fadeIn'
                    width={300}
                    height={400}
                    src={`/assets/img/${producto.imagen}.jpg`}
                    alt={`Imagen producto ${producto.nombre}`}
                />
            </div>

            <div className='md:w-2/3'>
                <div className='flex justify-end'>
                    <button type='button' onClick={handleChangeModal}>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-7 w-7'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M6 18L18 6M6 6l12 12'
                            />
                        </svg>
                    </button>
                </div>
                <h2 className='text-3xl font-bold mt-5'>{producto.nombre}</h2>
                <p className='mt-5 font-black text-5xl text-amber-500'>
                    {formatearDinero(producto.precio)}
                </p>

                <div className='flex gap-4 items-center mt-5'>
                    <button
                        type='button'
                        onClick={() => {
                            if (cantidad <= 1) return;
                            setCantidad(cantidad - 1);
                        }}
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-7 w-7'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                        </svg>
                    </button>

                    <p className='text-3xl'>{cantidad}</p>

                    <button
                        type='button'
                        onClick={() => {
                            if (cantidad >= 5) return;
                            setCantidad(cantidad + 1);
                        }}
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-7 w-7'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                        </svg>
                    </button>
                </div>

                <button
                    type='button'
                    className='bg-indigo-600 hover:bg-indigo-700 text-white mt-5 py-2 px-5 font-bold rounded
                    transition uppercase'
                    onClick={() =>
                        handleAgregarPedido({ ...producto, cantidad })
                    }
                >
                    {edition ? 'Guardar Cambios' : 'Añadir al Pedido'}
                </button>
            </div>
        </div>
    );
};

export default ModalProducto;
