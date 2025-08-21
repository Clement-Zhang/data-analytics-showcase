import Table from './customs/Table';
import Card from './Card';
import Button from './customs/Button';
import Form from './customs/Form';
import { addData } from '../../configs/form/data';
import { addError } from '../../configs/form/error';
import { useData } from '../../contexts/data';
import { useModal } from '../../contexts/modal';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
countries.registerLocale(enLocale);

export default function ControlPanel() {
    const { add, wipe } = useData();
    const { openModal } = useModal();
    return (
        <Card title="User Details" styling="overflow-auto">
            <div className="absolute top-0 right-0">
                <Button
                    onClick={() =>
                        openModal(
                            <Form
                                dataConfig={addData}
                                errorConfig={addError}
                                submit={async (data) => {
                                    await add({
                                        fname: data['fname'],
                                        lname: data['lname'],
                                        gender: data['gender'],
                                        country: data['country'],
                                        dob: new Date(
                                            data['dob']
                                        ).toISOString(),
                                    });
                                }}
                            />
                        )
                    }
                    width="w-20"
                >
                    Add User
                </Button>
                <Button onClick={wipe}>Reset</Button>
            </div>
            <Table
                description={[
                    { name: 'ID', key: 'id', sortable: false, width: 'w-64' },
                    { name: 'First Name', key: 'fname', sortable: true },
                    { name: 'Last Name', key: 'lname', sortable: true },
                    { name: 'Gender', key: 'gender', sortable: true },
                    { name: 'Country', key: 'country', sortable: true },
                    { name: 'DOB', key: 'dob', sortable: true },
                    { name: 'Age', key: 'age', sortable: true },
                ]}
            />
        </Card>
    );
}
