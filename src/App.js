import './assets/css/App.css';
import Main from './views/pages/Main';
import { ModalProvider } from './global/modal';
import { DataProvider } from './contexts/data';

export default function App() {
    return (
        <DataProvider>
            <ModalProvider>
                <Main />
            </ModalProvider>
        </DataProvider>
    );
}
