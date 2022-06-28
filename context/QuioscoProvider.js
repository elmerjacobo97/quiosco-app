import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [producto, setProducto] = useState({});
    const [modal, setModal] = useState(false);
    const [pedido, setPedido] = useState([]);
    const [nombre, setNombre] = useState('');
    const [total, setTotal] = useState(0);

    const router = useRouter();

    const obtenerCategorias = async () => {
        const { data } = await axios('/api/categorias');
        setCategorias(data);
    };

    useEffect(() => {
        obtenerCategorias()
            .then((r) => r)
            .catch((e) => console.error(e));
    }, []);

    // Calcular el total
    useEffect(() => {
        const nuevoTotal = pedido.reduce(
            (total, producto) => producto.precio * producto.cantidad + total,
            0
        );
        setTotal(nuevoTotal);
    }, [pedido]);

    // Resaltar por default una categoría
    useEffect(() => {
        setCategoriaActual(categorias[0]);
    }, [categorias]);

    const handleClickCategoria = (id) => {
        const categoria = categorias.filter((cat) => cat.id === id);
        setCategoriaActual(categoria[0]);
        router
            .push('/')
            .then((r) => r)
            .catch((e) => console.log(e));
    };

    const handleSetProducto = (producto) => {
        setProducto(producto);
    };

    const handleChangeModal = () => {
        setModal(!modal);
    };

    // Sacar categoriaId del objeto producto
    const handleAgregarPedido = ({ categoriaId, ...producto }) => {
        // Detectar si el producto ya existe...
        if (pedido.some((productoState) => productoState.id === producto.id)) {
            // Si ya existe, actualizar la cantidad
            const pedidoActualizado = pedido.map((productoState) =>
                productoState.id === producto.id ? producto : productoState
            );
            setPedido(pedidoActualizado);
            toast.success('Guardado correctamente');
        } else {
            // El producto no existe... Agregarlo
            setPedido([...pedido, producto]);
            toast.success('Agregado al Pedido');
        }

        // Cerrar el modal
        setModal(false);
    };

    // Actualizar cantidad
    const handleEditarCantidad = (id) => {
        const productoActualizar = pedido.filter(
            (producto) => producto.id === id
        );
        setProducto(productoActualizar[0]);
        setModal(!modal);
    };

    // Eliminar un producto
    const handleEliminarProducto = (id) => {
        const pedidoActualizado = pedido.filter(
            (producto) => producto.id !== id
        );
        setPedido(pedidoActualizado);
    };

    const colocarOrden = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/api/ordenes', {
                pedido,
                nombre,
                total,
                fecha: Date.now().toString(),
            });

            // Resetear la APP
            setCategoriaActual(categorias[0]);
            setPedido([]);
            setNombre('');
            setTotal(0);

            toast.success('Pedido Realizado Correctamente');

            setTimeout(() => {
                router.push('/');
            }, 5000);
        } catch (e) {
            console.log(e);
        }

        // console.log(pedido);
        // console.log(nombre);
        // console.log(total);
    };

    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                producto,
                handleSetProducto,
                modal,
                handleChangeModal,
                handleAgregarPedido,
                pedido,
                handleEditarCantidad,
                handleEliminarProducto,
                nombre,
                setNombre,
                colocarOrden,
                total,
            }}
        >
            {children}
        </QuioscoContext.Provider>
    );
};

export { QuioscoProvider };
export default QuioscoContext;
