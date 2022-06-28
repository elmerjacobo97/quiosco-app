import { Layout } from '../layout/Layout';
import useQuiosco from '../hooks/useQuiosco';
import { useCallback, useEffect } from 'react';
import {formatearDinero} from "../helpers";

export default function Total() {
    const { pedido, nombre, setNombre, colocarOrden, total } = useQuiosco();

    // Comprobar si el pedido está vacío
    const comprobarPedido = useCallback(() => {
        return pedido.length === 0 || nombre === '' || nombre.length < 3; // true o false
    }, [pedido, nombre]);

    useEffect(() => {
        comprobarPedido();
    }, [pedido, comprobarPedido]);

    return (
        <Layout page='Total y Confirmar Pedido'>
            <h1 className='text-4xl font-black'>Total y Confirmar Pedido</h1>
            <p className='text-2xl my-10'>Confirma tu pedido a continuación</p>

            <form onSubmit={colocarOrden}>
                <div>
                    <label
                        htmlFor='nombre'
                        className='block uppercase text-gray-700 font-bold text-lg'
                    >
                        Nombre
                    </label>
                    <input
                        id='nombre'
                        type='text'
                        className='bg-gray-200 w-full lg:w-1/3 p-2 rounded-md
                        focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500 transition'
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className='mt-5'>
                    <p className='text-2xl'>
                        Total a Pagar: {''}{' '}
                        <span className='font-bold'>{formatearDinero(total)}</span>{' '}
                    </p>
                </div>

                <div className='mt-5'>
                    <button
                        type='submit'
                        className={`${
                            comprobarPedido()
                                ? 'bg-indigo-100 '
                                : 'bg-indigo-600 hover:bg-indigo-700'
                        } px-5 py-2 text-white rounded-md font-bold
                        uppercase shadow-md w-full lg:w-auto text-center transition`}
                        disabled={comprobarPedido()}
                    >
                        Confirmar Pedido
                    </button>
                </div>
            </form>
        </Layout>
    );
}
