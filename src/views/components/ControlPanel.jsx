import Table from './customs/Table';
import Card from './Card';
import Button from './customs/Button';
import Form from './customs/Form';
import { userObj } from '../../utils/general';
import { addData } from '../../configs/form/data';
import { addError } from '../../configs/form/error';
import { controlPanel } from '../../configs/table';
import { useModal } from '../../globals/modal';
import { add, wipe } from '../../globals/users';
import { useDispatch } from 'react-redux';

export default function ControlPanel() {
    const dispatch = useDispatch();
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
                                submit={(data) => dispatch(add(userObj(data)))}
                            />
                        )
                    }
                    width="w-20"
                >
                    Add User
                </Button>
                <Button onClick={() => dispatch(wipe())}>Reset</Button>
            </div>
            <Table description={controlPanel} />
        </Card>
    );
}
