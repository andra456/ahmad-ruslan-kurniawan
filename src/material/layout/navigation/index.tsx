import React, { Fragment, useState, useEffect, useRef } from 'react';
import _ from 'lodash'

import { Logo, Logo2, Menu } from "../../../assets/img/Images";
import { IoSearchOutline} from 'react-icons/io5'
type Props = {
  active: boolean,
  onShowPushMenu: (text: boolean) => void;
}

const Nav: React.FC<Props> = ({ onShowPushMenu, active }) => {

  
  const isMount = useRef(false);
  const [searchValue, setsearchValue] = useState('')
  const [inpSearch, setInputSearch] = useState('')
  
  
  const delayedSearch = React.useCallback(_.debounce(value => {
          setInputSearch(value)
      }, 1000), []);

  const handleSearch = (e:any) => {
        let value = e.target.value
        if (e.key === 'Enter')  { setInputSearch(value) }
        else { delayedSearch(value) }
        setsearchValue(value)
  }

  useEffect(() => {
    isMount.current = true;
    if (isMount.current) {
    }
    return function cleanup() {
   
    }
  }, [])




  return (
    <Fragment>

      <div className={`top-head-menu`}>
        <div className="wrap-container flex-menu">
          <div className="side-one">
            <div className="logo"><a href="/"><Logo className="wide" />  <Logo2 className="mobile" /></a></div>
          </div>
          <div className="side-two spare-menu">
          <div className="ui action fluid input">
                  <IoSearchOutline/><input type="text" onChange={(e)=> handleSearch(e)} onKeyPress={(e)=> handleSearch(e)} placeholder="Search..."/>
          </div>
            

            <button className="menu-mobile" onClick={() => onShowPushMenu(!active)}>
              <Menu />
            </button>
          </div>

        </div>
      </div>
    </Fragment>


  )
}

export default Nav;
