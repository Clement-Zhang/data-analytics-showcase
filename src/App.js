import './assets/css/App.css';
import Main from './views/pages/Main';
import { ModalProvider } from './globals/modal';
import DataProvider from './globals/store';

export default function App() {
    return (
        <DataProvider>
            <ModalProvider>
                <Main />
            </ModalProvider>
        </DataProvider>
    );
}
