import {useState} from 'react';
import './App.scss';
import {Link, Outlet} from "react-router-dom"
import avatarPng from 'assets/avatar.png'
import avatarJpeg from 'assets/avatar.jpg';
import AvatarSvgJpeg from 'assets/calendar.svg';

function TODO() {
    TODO2();
}

function TODO2() {
    throw new Error();
}

const App = () => {

    const [count, setCount] = useState<number>(0);

    const onClick = () => TODO();

    return (
        <>
            <Link to={'/about'}>about</Link><br/>
            <Link to={'/shop'}>shop</Link>
            <div>{__PLATFORM__}</div>
            <div data-testid={'App.DataTestId'}>
                <img width="100" height="100" src={avatarJpeg} alt="avatar"/>
                <img width="100" height="100" src={avatarPng} alt="avatar"/>

                <AvatarSvgJpeg width={100} height={100} fill={'green'}/>

            </div>
            <div>
                Hello world
            </div>
            <div>{count}</div>
            <button onClick={onClick}>count</button>
            <Outlet/>
        </>

    );
};

export default App;