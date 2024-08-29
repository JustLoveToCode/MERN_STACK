import {useState} from 'react';
import BarChart from './BarChart';
import AreaChartComponent from './AreaChart';
import Wrapper from '../assets/wrappers/ChartsContainer';

const ChartsContainer =({data})=>{
    // By Default, I will display the barChart
    // since it is set to true
    // By default, I will display the barChart
    const [barChart, setBarChart] = useState(true)
    return(
    <Wrapper>
        <h4>Monthly Applications</h4>
        {/* Using the button to Change the Ternary Conditional Operator
        from true to false or false to true */}
        <button type="button" onClick={()=>setBarChart(!barChart)}>
        {/* If it is true for barChart, it will show Bar Chart
        and hence the text Area Chart will be shown */}
        {barChart? 'Area Chart':'Bar Chart'}
        </button>
        {/* The BarChart Component that is imported */}
        {barChart ? <BarChart data={data}/>:<AreaChartComponent data={data}/>}

    </Wrapper>
    )
}

export default ChartsContainer;