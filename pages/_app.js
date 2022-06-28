import '../styles/globals.css';
import 'animate.css';
import { QuioscoProvider } from '../context/QuioscoProvider';

function MyApp({ Component, pageProps }) {
    return (
        <QuioscoProvider>
            <Component {...pageProps} />
        </QuioscoProvider>
    );
}

export default MyApp;
