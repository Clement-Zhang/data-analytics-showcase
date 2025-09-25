import ControlPanel from '../components/ControlPanel';
import Graph from '../components/customs/Graph';
import Grid from '../components/Grid';
import { gender, age } from '../../configs/graph';
import '../../assets/css/Main.css';

export default function Main() {
    return (
        <div className="p-6 space-y-8">
            <Grid>
                <Graph title="Gender Distribution" bars={gender} />
                <Graph title="Age Groups" bars={age} />
            </Grid>
            <ControlPanel />
        </div>
    );
}
