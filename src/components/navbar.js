import React from "react";
import App from "../App";
// import './App.css';
import Info from "./info";
class Navbar extends React.Component{
    constructor() {
        super()
        this.state = {
            tempe:null,
            feels:null,
            humi:null,
            tmax:null,
            temp_min:null,
            deg:null,
            gus:null
        };

    }
    Loadcon() {
        // http://api.openweathermap.org/geo/1.0/direct?q=dubai,&limit=5&appid=9413103f25a00a0e82d52d9040e82435
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=New york,&limit=5&appid=9413103f25a00a0e82d52d9040e82435`)
            .then(response => response.json())
            .then(data => {
                const lati = data[0].lat;
                const long = data[0].lon;
                console.log(lati);
                console.log(long);
                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lati}&lon=${long}&appid=9413103f25a00a0e82d52d9040e82435&units=imperial`)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        // const temp1 = data.list[0].main.temp;
                        // const feels = data.list[0].main.feels_like;
                        // const humi = data.list[0].main.humidity;
                        // const tmax = data.list[0].main.temp_max;
                        // const temp_min = data.list[0].main.temp_min;
                        // const deg = data.list[0].wind.deg;
                        // const gus = data.list[0].wind.gust;
                        this.setState ({
                                tempe : data.list[0].main.temp,
                                feels : data.list[0].main.feels_like,
                                humi : data.list[0].main.humidity,
                                tmax : data.list[0].main.temp_max,
                                temp_min : data.list[0].main.temp_min,
                                winds : data.list[0].wind.speed,
                                deg : data.list[0].wind.deg,
                                gus : data.list[0].wind.gust,
                                coun : data.city.country,
                                city : data.city.name

                            })

                })
            })
        }
    render(){
        return( 
            <nav className="navbar">
                <div className="container-fluid">
                    <p className="navbar-brand" ><b>Weather Now</b></p>
                    <input className="ipbx" placeholder="Search City" aria-label="Search" id="sbar"></input>
                    <button  onClick = { () => this.Loadcon() && this.changeData()} className="ipbt">Search</button>
                    <Info tempe1={this.state.tempe} feels1 ={this.state.feels} winds1 = {this.state.winds}
                        gus1 = {this.state.gus} country1 = {this.state.coun}  city1 = {this.state.city}/>
                </div>
            </nav>
        )
    }
}
// export {temp1,feels,humi,tmax,temp_min,deg,gus}
export default Navbar 