import React, { useRef} from 'react';
import { GrNext, GrPrevious} from 'react-icons/gr';
import './_index.scss';
type Props = {
    pageSize : number,
    totalPage : number,
    seq : number,
    callback :(text: number) => void;
}

export const Pagination: React.FC<Props> =({ pageSize, totalPage, seq, callback } ) => {
    const initPage = {
        seq : seq?seq:1,
        pageSize : pageSize?pageSize:10,
        totalPage :totalPage ?totalPage :0
    }
    const [page, setpage] = React.useState(initPage)
    const isMount = useRef(false)

    React.useEffect(() => {
        if (isMount.current) {
            setpage({...page, totalPage : totalPage })         
        }
    }, [totalPage])

    function handlerPage(num:number) {
        setpage({...page, seq : num});
        callback(num)
    }

    let arr =[];
    let endPage = page.totalPage;
    let  limit = (page.seq + 3 > endPage) ? (endPage) : (page.seq < 5) ? 6 : (page.seq + 2);
    let start = ((page.seq - 3) < 1) ? (1) : (page.seq - 2) 
   
    for(let  i = start; i <= limit; i++){
        arr.push(i)
    }
    const list = Number((page.seq+1>endPage)?(endPage):(page.seq+1));

    return (<div className="pagination">
            <button className="page-list" disabled={page.seq === 1}  
                onClick={()=> setpage({...page, seq : page.seq-1 < 1?1:page.seq-1})} > <GrPrevious/> </button>

                {arr.map((x,i)=> <button key={i} className={`page-list ${x === page.seq?'selected':''}`} onClick={()=> handlerPage(x)}> {x}</button>  )} 
                <button className="page-list" disabled={page.seq === page.totalPage}  
                onClick={()=> setpage({...page, seq :  list })}> <GrNext/> </button>        
            </div>)
}



