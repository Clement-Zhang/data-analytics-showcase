import './assets/css/App.css';
import Main from './views/pages/Main';
import { ModalProvider } from './contexts/modal';

export default function App() {
    return (
        <ModalProvider>
            <Main />
        </ModalProvider>
    );
}
