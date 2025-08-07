import { BarChart, XAxis, YAxis, Bar, Tooltip, Cell } from 'recharts';

export default function Graph({ data, defaultColour = true }) {
    return (
        <BarChart width={500} height={100} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value">
                {data.map((bar, index) => (
                    <Cell
                        key={index}
                        fill={defaultColour ? '#b5b4b1' : bar.fill}
                    />
                ))}
            </Bar>
        </BarChart>
    );
}
