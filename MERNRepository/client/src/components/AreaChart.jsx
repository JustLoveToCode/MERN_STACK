import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AreaChartComponent = ({data}) => {
  
  console.log('Data received:', data);
  return (
    // Setup the ResponsiveContainer
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart data={data} margin={{top:50}}>
        <CartesianGrid strokeDasharray='3 3'/>
        <XAxis dataKey='date'/>
        <YAxis allowDecimals={false}/>
        <Tooltip/>
        <Area type="monotone" dataKey='count' stroke='#ff0a0a'
        fill='#ff001e'/>
      </AreaChart>
    </ResponsiveContainer>

  )
}

export default AreaChartComponent;
