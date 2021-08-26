import React, { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../reduxs/store'
import {  fetchAllOrganitation} from '../../reduxs/actions';
import './_index.scss';
import { Loader } from '../../assets/img/Images';
import { NavLink } from 'react-router-dom'
import { Img } from '../../material/components/card/box'



function Home() {
    
    const org = useSelector((state: RootState) => state.github.organitation)
    const dispatch = useDispatch()


    const selectedSort = {
        type: 'organitation',
        name: "Filter By organitation Name"
    }

    const choiseSort = [
        {
            type: 'organitation',
            name: "Filter By organitation Name"
        },
        {
            type: 'user',
            name: "Filter By User Name"
        }
    ]
    const [dataList, setData] = React.useState<any | null>(null);
    const [loading, setloading] = React.useState(false)
    const [sortlist, setsort] = React.useState(selectedSort)
    const [showFilter, setshowFilter] = React.useState(false)
    const isMount = React.useRef(false);


    React.useEffect(() => {
        isMount.current = true
        if (isMount.current) {
            setloading(true)
            setTimeout(() => {
                if (isMount.current) {
                    dispatch(fetchAllOrganitation())
                    //dispatch(fetchAllRepos({org : 'errfree'}))
                    // dispatch(fetchAllPhotos())
                }
            }, 1000);
        }
    }, [])
    React.useEffect(() => {
        isMount.current = true
        if (isMount.current) {
            setData(org.all)
            setloading(false)
        }
    }, [org])
    return (
        <Fragment>
            <div className="content-wrapper">

                {loading ?
                    <div className="loader-page">
                        <div className="content-loader">
                            <Loader />
                        </div>
                    </div>
                    : ''}

                {!loading ? (<>

                    <div className="wrap-organitation row">  {
                        dataList ? dataList.map((e: any, i: number) => (
                            <div key={i} className="grid-card col-xs-12 col-sm-6 col-md-3">
                                <div className="box-organitation">
                                    <NavLink to={`/repos/${e.login}`} >
                                        <Img className="avatar" src={e.avatar_url} />
                                        <span className="users">
                                            {e.login}
                                        </span>
                                    </NavLink>

                                </div>
                            </div>
                        )) : ''} </div></>)
                    : ''}

            </div>

        </Fragment>
    )
}


export default Home
