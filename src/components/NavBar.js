import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const NavBar = () =>{
    const navigate = useNavigate()
    const handleLogoutHere = useCallback((e) =>{
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        if(!!navigate){
            Cookies.remove("pump_auth")
            navigate("../login")
        }
    },[navigate])

    const [showNav, setShowNav] = useState(false)

    const toggleHandler = useCallback(() =>{
        setShowNav(!showNav)
    },[showNav])

    return (
        <nav className="site-content navbar navbar-animated navbar-scrolled-up navbar-expand-md sticky-top nav-background" >
            <div className="d-flex flex-row" >
                <div className="navbar-brand mr-3">
                    <a rel="noopener noreferrer"target="_blank" href="/" >
                        <img alt='Nandan Petroleum Logo' className="navbar-logo" src={require('../assets/np_logo.png')}/>
                        {/* hmm yes */}
                    </a>
                </div>
                <div>
                    <button id="navbarToggler"type="button" className="navbar-toggler navbar-light collapsed" onClick={toggleHandler}>
                        <div className="bar top-bar"></div>
                        <div className="bar middle-bar"></div>
                        <div className="bar bottom-bar"></div>
                    </button>
                    <div style={{...showNav?{right:"0.4vw"}:{}}} className={`${showNav? 'show position-absolute':''} collapse navbar-collapse justify-content-center`} id="navbarCollapse">
                        {/* <?php include 'navmenu.php';?> */}
                        <div className="navbar-nav align-self-stretch align-items-stretch">
                            {
                                !!Cookies.get("pump_auth")?
                                <button style={{marginRight:"5px"}} className='nav-item btn btn-light' onClick={()=>{navigate("/employee/internal-list")}}>Internal Order List</button>
                                :<></>
                            }
                            {
                                !!Cookies.get("pump_auth")?
                                <button style={{marginRight:"5px"}} className='nav-item btn btn-light' onClick={()=>{navigate("/employee/external-list")}}>External Order List</button>
                                :<></>
                            }
                            {
                                !!Cookies.get("pump_auth")?
                                <button className='nav-item btn btn-danger' onClick={handleLogoutHere}>Logout</button>
                                :<></>
                            }
                            
                        </div>
                    </div>
                </div>
                {/* <div className="navbar-brand mr-3" id="BBLogo" style={{marginLeft:"auto"}}>
                    <a rel="noopener noreferrer" target="_blank" href="https://www.biswabangla.in/" >
                        <img src={require('../assets/biswa-bangla-logo.png')} className="navbar-image-BB"/>
                    </a>
                </div> */}
            </div>    
        </nav>
    )
}

export default NavBar