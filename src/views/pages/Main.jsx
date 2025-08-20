import ControlPanel from '../components/ControlPanel';
import Graph from '../components/customs/Graph';
import Grid from '../components/Grid';
import '../../assets/css/Main.css';

export default function Main() {
    return (
        <div className="p-6 space-y-8">
            <Grid>
                <Graph
                    title="Gender Distribution"
                    bars={[
                        { name: 'Male', fill: '#3b82f6' },
                        { name: 'Female', fill: '#ef4444' },
                    ]}
                />
                <Graph
                    title="Age Groups"
                    bars={[
                        { name: '0-14', field: '0' },
                        { name: '15-24', field: '15' },
                        { name: '25-54', field: '25' },
                        { name: '55-64', field: '55' },
                        { name: '65+', field: '65' },
                    ]}
                />
            </Grid>
            <ControlPanel />
        </div>
    );
}
