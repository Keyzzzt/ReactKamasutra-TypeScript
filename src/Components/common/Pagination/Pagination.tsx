import React, {useState} from "react";
import styles from "./Pagination.module.css";

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    setCurrentPageHandler: (pageNumber: number) => void
    portionSize?: number

}

const Pagination: React.FC<PropsType> = ({totalItemsCount, pageSize, currentPage, setCurrentPageHandler, portionSize = 10}) => {
    let totalUserPages = Math.ceil(totalItemsCount / pageSize)
    let pages: Array<number> = []
    for (let i = 1; i <= totalUserPages; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(totalUserPages / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    return (

        <div>
            {portionNumber > 1 && <button onClick={() => setPortionNumber(portionNumber - 1)}>prev</button>}
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(pageNumber => <span
                    key={pageNumber}
                    onClick={(e) => setCurrentPageHandler(pageNumber)}
                    // FIXME: className={currentPage === pageNumber && styles.selected}
                >{pageNumber}
                </span>)}
            {portionCount > portionNumber && <button onClick={() => setPortionNumber(portionNumber + 1)}>next</button>}
        </div>

    )
}

export default Pagination