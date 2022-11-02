import React ,{ useState }  from "react";
import styles from './style.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';


const Form = props => {

    const [state, setState] = useState({
            tempreature:'',
            city:'',
            country:'',
            humidity:'',
            description:'',
            error: ''
        });


    const getWeather= async (e)=> {
        e.preventDefault()
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        const API_key= "0d93d0b2b6ac933d1145c37151869fda"
        // console.log(city+country)
        // http://api.openweathermap.org/data/2.5/weather?q=,&appid=${API_key}
        // const api= await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${city},${country}&appid=${API_key}`)
        const api= await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`)
        const data = await api.json();
        console.log(data)
        if(city&&country){
            setState({
                    tempreature:data.main.temp,
                    city:data.name,
                    country:data.sys.country,
                    humidity:data.main.humidity,
                    description:data.weather[0].description,
                    error: ''
                })
        }else{
            setState({
            tempreature:'',
            city:'',
            country:'',
            humidity:'',
            description:'',
            error: 'Please Enter Data'
            })
        }
    }

        
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <form onSubmit={getWeather} >
                    <input className="form-control m-2 p-2 shadow-sm  bg-body rounded" type="text" name="city" id="" placeholder="City" />
                    <input className="form-control m-2 p-2 shadow-sm bg-body rounded"  type="text" name="country" id="" placeholder="Country" />
                    <button className="btn btn-outline-light m-4">Get Weather</button>
                </form>
            <div >
                {
                        state.tempreature && 
                    <p className="fs-6">Tempreature :
                    <span >  {state.tempreature} </span>
                    </p>
                }
                    {
                        state.city && 
                        <p className=" fs-6">City :
                            <span >  {state.city}  </span>
                            </p>
                    }
                    {
                        state.country && 
                        <p className=" fs-6">Country :  
                            <span > {state.country} </span>
                            </p>
                    }
                    {
                        state.humidity && 
                        <p className=" fs-6">Humidity : 
                            <span > {state.humidity} </span> %
                        </p>
                    }
                    {
                        state.description&& 
                        <p className="  fs-6">Description :
                            <span > {state.description} </span>
                        </p>
                    }
                    {
                        state.error &&  
                        <p className="alert alert-danger">
                            <span  >{state.error} </span> 
                        </p>
                    }
                    
            </div>
            </div>
        </div>
    

);
}


export default Form;
