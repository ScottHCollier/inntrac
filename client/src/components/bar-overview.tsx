import { Pie, PieChart, ResponsiveContainer } from 'recharts';
import { cssVar } from '../lib/utils';

const data = [
  { name: 'Group A', value: 400, fill: '#fb5607' },
  { name: 'Group B', value: 300, fill: '#ff006e' },
  { name: 'Group C', value: 300, fill: '#ffbe0b' },
  { name: 'Group D', value: 200, fill: '#3a86ff' },
];

const BarOverview = () => {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <PieChart>
        <Pie
          className='border-none'
          data={data}
          innerRadius={80}
          outerRadius={160}
          fill='#000000'
          stroke={cssVar('--background')}
          paddingAngle={0}
          dataKey='value'
          animationBegin={0}
          animationDuration={700}
        ></Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default BarOverview;
