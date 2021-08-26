import React, { Fragment } from 'react'
import {
  BrowserRouter as
    Link,
  useRouteMatch,
} from 'react-router-dom';
import { Img } from '../../material/components/card/box'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reduxs/store';
import {  fetchAllRepos, fetchOrgDetail, fetchRepoDetail, fetchSearch } from '../../reduxs/actions';
import { Loader } from '../../assets/img/Images';
import { GoLocation } from 'react-icons/go';
import { BiLink } from 'react-icons/bi';
import { RiUserFollowLine } from 'react-icons/ri';
import { FaRegFileAlt } from 'react-icons/fa';
import { GoRepoForked, GoEye } from 'react-icons/go';
import { BsCodeSlash } from 'react-icons/bs';
import { FiStar } from 'react-icons/fi';

import './_index.scss'

export interface MatchParams {
  Id: string;
  UserId: string;
}
const Listrepos = () => {
  const routepath = useRouteMatch<MatchParams>('/repos/:Id');
  const Id = routepath?.params.Id;

  const org = useSelector((state: RootState) => state.github.organitation)
  const repos = useSelector((state: RootState) => state.github.repos)

  const dispatch = useDispatch()


  const initdata = {
    org: null,
    owner: {},
    list: []
  }
  const [dataList, setData] = React.useState<any | null>(initdata);
  const [loading, setloading] = React.useState(false)
  const isMount = React.useRef(false);

  React.useEffect(() => {
    isMount.current = true
    if (isMount.current) {
      setloading(true)
      setTimeout(() => {
        if (isMount.current) {
          dispatch(fetchOrgDetail({ org: Id }))
          dispatch(fetchAllRepos({ org: Id }))
        }
      }, 1000);
    }
  }, [])

  React.useEffect(() => {
    if (isMount.current) {
      if (repos && org) {
        console.log(org)
        setData({ ...dataList, org: org.detail, list: repos.all })
      }

    }
  }, [repos, org])


  return (
    <Fragment>

      <div className="content-wrapper">

        <div className="board">
          {dataList.org ?
            <div className="owner">

              <div className="profile">
                <a href={dataList.org.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Img className="img" src={dataList.org.avatar_url} />
                </a>
                <div className="bio">{dataList.org.name}
                  <p>{dataList.org.description}</p>

                  <p>
                    {dataList.org.location && (<span><GoLocation /> {dataList.org.location} </span>)}
                    {dataList.org.blog && <span> <BiLink /> {dataList.org.blog} </span>}
                  </p>
                  <div className="sub">

                    <span><RiUserFollowLine /> {dataList.org.followers} followers </span>
                    <span><RiUserFollowLine /> {dataList.org.following} following</span>
                  </div>
                </div>


              </div>
              <div className="repoInfo">
                <span>
                  Repositories <b>{dataList.org.public_repos}</b>
                </span>


              </div>
            </div> : ''}


          <div className="list-repo">

            {dataList.list ? dataList.list.map((e: any, i: number) => (
              <div className="repositories" key={i}>
                <div className="bio">
                  <a href={e.html_url} >{e.name}</a>
                  <p>{e.description}</p>

                </div>
                <ul className="codetype">
                  <li><BsCodeSlash /> {e.language} </li>
                  {e.license && (
                    <li>
                      <FaRegFileAlt /> {e.license.name}
                    </li>
                  )}
                  {e.stargazers_count !== 0 && (
                    <li>
                      <FiStar />
                      {`${Number(e.stargazers_count).toLocaleString(undefined, {
                        minimumIntegerDigits: 1,
                      })} ${e.stargazers_count === 1 ? 'star' : 'stars'}`}
                    </li>
                  )}
                  {e.forks !== 0 && (
                    <li>
                      <GoRepoForked />
                      {`${Number(e.forks_count).toLocaleString()} ${e.forks_count === 1 ? 'fork' : 'forks'
                        }`}
                    </li>
                  )}
                  <li> <GoEye /> {e.watchers} </li>
                </ul>

                <div className="repo-owner"></div>
              </div>
            )
            ) : ''}
          </div>


        </div>

      </div>


    </Fragment >
  );
}

export default Listrepos