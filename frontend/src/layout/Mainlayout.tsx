
import { Outlet } from "react-router";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
export default function (){
    return(
        <div className="flex flex-col min-h-screen">
            <Navbar></Navbar>
            <main className="flex-1">
            <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </div>
    )
}