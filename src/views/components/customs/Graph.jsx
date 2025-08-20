import Card from '../Card';
import { useData } from '../../../contexts/data';
import { BarChart, XAxis, YAxis, Bar, Tooltip, Cell } from 'recharts';
import { useEffect, useState } from 'react';

export default function Graph({ title, bars }) {
    const { analytics } = useData();
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(
            bars.map((bar) => ({
                name: bar.name.charAt(0).toUpperCase() + bar.name.slice(1),
                value: analytics[bar.field || bar.name],
                fill: bar.fill ?? '#b5b4b1',
            }))
        );
    }, [analytics]);
    return (
        <Card title={title}>
            <BarChart width={500} height={100} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value">
                    {data.map((bar, index) => (
                        <Cell key={index} fill={bar.fill} />
                    ))}
                </Bar>
            </BarChart>
        </Card>
    );
}
