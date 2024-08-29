import {HiChevronDoubleLeft, HiChevronDoubleRight} from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
// Getting the useLocation, Link and useNavigate from react-router-dom
import {useLocation, Link, useNavigate} from 'react-router-dom';
// Usig the useAllJobsContext here
import { useAllJobsContext } from '../pages/AllJobs';
 

export const PageBtnContainer = () => {
  const {data:{numOfPages, currentPage}} = useAllJobsContext();

  // Creating an Array of the Different Pages
 const pages = Array.from({length:numOfPages}, (_,index)=>{
    return index + 1});
// Using the useLocation Hook
 const {search, pathname} = useLocation();
// Using the useNavigate() to be equal to the Variable navigate
 const navigate = useNavigate();
//  Handle the Page Changes using handlePageChanges
 const handlePageChange = (pageNumber)=>{
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);

    navigate(`${pathname}?${searchParams.toString()}`);
}
// Using the return keyword here
  return (
    <Wrapper>
      {/* Placing the onClick on the button Component itself */}
        <button className='btn prev-btn' onClick={()=>{
        // prevPage = currentPage - 1;
        let prevPage = currentPage - 1;
        // If the prevPage is less than 1, the prevPage 
        // will be equal to the numOfPages
        if(prevPage < 1) prevPage = numOfPages
        handlePageChange(prevPage)
        }}
        >
        <HiChevronDoubleLeft/>
        Prev
        </button>

        <div className='btn-container'>
        {/* Using the map method to Iterate through the pages */}
        {pages.map((pageNumber)=>{
            // If the pageNumber is strictly equal to the currentPage, the
            // active class will be shown
            return <button className={`btn page-btn ${pageNumber === currentPage && 'active'}`}
            key={pageNumber}
            onClick={()=>handlePageChange(pageNumber)}
            >
            {pageNumber}
            </button>
        })}
        </div>

        <button className='btn next-btn' onClick={()=>{
            // nextPage is equal to the currentPage + 1
            let nextPage = currentPage + 1;
            // If the nextPage > numOfPages, nextPage will go back to 1
            // which is number 1
            if(nextPage > numOfPages) nextPage = 1;
            handlePageChange(nextPage);
        }}>
            <HiChevronDoubleRight/>
            Next
        </button>

      


    </Wrapper>
  )
}

export default PageBtnContainer;
