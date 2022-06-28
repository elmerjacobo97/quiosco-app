import Image from 'next/image';
import { formatearDinero } from '../helpers';
import useQuiosco from '../hooks/useQuiosco';

const ResumenPedido = ({ producto }) => {
    const { nombre, precio, cantidad, imagen } = producto;
    const { handleEditarCantidad, handleEliminarProducto } = useQuiosco();

    return (
        <div className='shadow p-5 mb-3 flex gap-10 items-center'>
            <div className='md:w-1/6'>
                <Image
                    className='animate__animated animate__fadeIn rounded'
                    width={300}
                    height={400}
                    src={`/assets/img/${imagen}.jpg`}
                    alt={`Imagen producto ${nombre}`}
                />
            </div>

            <div className='md:w-4/6'>
                <p className='text-2xl font-bold'>{nombre}</p>
                <p className='text-xl font-bold mt-2'>Cantidad: {cantidad}</p>
                <p className='text-xl font-bold mt-2 text-amber-500'>
                    Precio: {formatearDinero(precio)}
                </p>
                <p className='mt-2 text-gray-700'>
                    Subtotal: {formatearDinero(precio * cantidad)}
                </p>
            </div>

            <div>
                <button
                    type='button'
                    className='bg-indigo-600 hover:bg-indigo-700 px-5 py-2 text-white rounded-md font-bold
                    uppercase shadow-md w-full text-center transition flex gap-1 items-center'
                    onClick={() => handleEditarCantidad(producto.id)}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                    >
                        <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
                    </svg>
                    Editar
                </button>

                <button
                    type='button'
                    className='bg-red-600 hover:bg-red-700 px-5 py-2 text-white rounded-md font-bold
                    uppercase shadow-md w-full text-center transition flex gap-1 items-center mt-2'
                    onClick={() => handleEliminarProducto(producto.id)}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                    >
                        <path
                            fillRule='evenodd'
                            d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                            clipRule='evenodd'
                        />
                    </svg>
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default ResumenPedido;
