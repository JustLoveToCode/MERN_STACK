import Wrapper from "../assets/wrappers/StatItem";




// Creating the StatItem Component
const StatItem = ({count, title, icon, color, bcg})=>{
    return(
    <Wrapper color={color} bcg={bcg}>
        <header>
            {/* Using the count props */}
            <span className="count">{count}</span>
            {/* Using the icon props */}
            <span className="icon">{icon}</span>
        </header>
        {/* Using the title props */}
        <h5 className="title">{title}</h5>
    </Wrapper>
    )
}

export default StatItem