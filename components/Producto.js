import React from 'react';
import Image from 'next/image';
import { formatearDinero } from '../helpers';
import useQuiosco from '../hooks/useQuiosco';

const Producto = ({ producto }) => {
    const { nombre, precio, imagen } = producto;
    const { handleSetProducto, handleChangeModal } = useQuiosco();

    return (
        <div className='border p-3 rounded'>
            <Image
                priority='true'
                layout='responsive'
                className='animate__animated animate__fadeIn rounded'
                width={400}
                height={500}
                src={`/assets/img/${imagen}.jpg`}
                alt={`Imagen platillo ${nombre}`}
            />

            <div className='p-3'>
                <h3 className='text-xl font-bold'>{nombre}</h3>
                <p className='mt-3 font-black text-4xl text-amber-500'>
                    {formatearDinero(precio)}
                </p>

                <button
                    type='button'
                    className='bg-indigo-600 hover:bg-indigo-700 text-white mt-3 py-2 px-3 font-bold w-full rounded
                    transition uppercase'
                    onClick={() => {
                        handleSetProducto(producto);
                        handleChangeModal();
                    }}
                >
                    Agregar
                </button>
            </div>
        </div>
    );
};

export default Producto;
