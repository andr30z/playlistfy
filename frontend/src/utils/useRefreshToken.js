import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import auth from "../services/api";
import { setToken } from "../redux/TokenActions";

export default async function useRefreshToken() {
    const [isRefreshed, setIsRefreshed] = useState(false);
    const { createdAt, refresh_token } = useSelector(state => state.to);
    const dispatch = useDispatch();
    useEffect(() => {


        if (createdAt === -1) {
            return;
        }

        const dateNow = new Date();
        console.log('date now    ', dateNow)
        const dateBefore = new Date(parseInt(createdAt))
        console.log(createdAt, "\nantes  " + dateBefore)
        const resultInMinutes = Math.round((dateNow.getTime() - dateBefore.getTime()) / 60000);
        console.log('resultado ', resultInMinutes)
        if (resultInMinutes >= 60) {
            console.log('RESULTADO AQUI DENTRO ', resultInMinutes)
            auth.get('auth',
                {
                    headers: {
                        refresh: refresh_token
                    }
                })
                .then(res => {
                    dispatch(setToken('SET_TOKEN', { ...res.data, createdAt: new Date().getTime() }));
                })
                .catch(error => {
                    console.log(error)
                })
        }
        // eslint-disable-next-line
    }, [])
}