import axios from 'axios'
import Cookies from 'js-cookie'

export const loginUser = (email,password)=>async(dispatch)=>{
    try {
        dispatch({
            type:"LoginRequest"
        })
        const {data} = await axios.post('http://localhost:4000/api/v1/login',{email,password},{
            headers:{
                "Content-Type":"application/json"
            },
        })
        Cookies.set("token", data.token, { expires: 90 });
        dispatch({
          type: "LoginSuccess",
          payload: data.user,
        });

    } catch (error) {
        dispatch({
          type: "LoginFailure",
          payload: {
            message: error.message,
            code: error.code,
          },
        });
    }
}

export const loadUser = ()=>async(dispatch)=>{
    try {
        dispatch({
            type:"LoadUserRequest"
        })
        const { data } = await axios.get("http://localhost:4000/api/v1/me", {
          withCredentials: true,
        });
        console.log(data)
        dispatch({
          type: "LoadUserSuccess",
          payload: data.user,
        });

    } catch (error) {
        dispatch({
          type: "LoadUserFailure",
          payload: {
            message: error.message,
            code: error.code,
          },
        });
    }
}